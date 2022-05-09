require('dotenv').config()
const{CONNECTION_STRING, CLIENT_ID, CLIENT_SECRET} = process.env
const Sequelize = require("sequelize")
const request = require('request');


const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    login: (req, res) => {
        sequelize.query(`
        SELECT first_name AS firstName, user_id AS userid, password, email
        FROM users
        WHERE email = '${req.body.email}';
        `).then(dbRes => {
                if (dbRes[1].rows.length < 1) {
                    res.status(400).send("Error: Email not found")
                    return
                } else if ((req.body.password == dbRes[1].rows[0].password)) {
                    delete dbRes[1].rows[0].password
                    delete dbRes[1].rows[0].email
                    res.status(200).send(dbRes[1].rows[0])
                    return
                } else {
                    res.status(400).send("Error: Incorrect password")
                }
            })
    },

    createAcc: (req, res) => {
        sequelize.query(`
        SELECT email
        FROM users
        WHERE email = '${req.body.email}';
        `).then(dbRes => {
                if (dbRes[1].rows.length >= 1) {
                    res.status(400).send("Error: Email already exists")
                    return
                } else {
                    sequelize.query(`
                    INSERT INTO users (email, password, first_name, last_name)
                    VALUES ('${req.body.email}', '${req.body.password}', '${req.body.first}', '${req.body.last}');

                    SELECT user_id AS userID 
                    FROM users
                    WHERE email = '${req.body.email}';
                    `)
                    .then((dbRes2 => {
                        userID = dbRes2[0][0]

                        sequelize.query(`
                        INSERT INTO playlists (user_id)
                        VALUES ('${userID.userid}')
                        `)
                        res.status(200).send(userID)
                    }))
                  
                    
                }
            })
    },

    getSongs : (req, res) => {
        let genreList = (req.query.genre)


        genreList = genreList.split(",")
        genreListCustom = ""
        genreList.forEach(genre => {
            genreListCustom = genreListCustom + "s.genre = '" + genre + "' OR "
        })

        genreListCustom = genreListCustom.slice(0,genreListCustom.length-4)
        
        genreList = genreList.join()


        let userid = req.query.userID
        let resSongs = []
        let genresAdded = []

        sequelize.query(`
            SELECT a.artist_name, s.song_name, s.song_id, s.genre
            FROM songs AS s
            JOIN artists AS a ON s.artist_id = a.artist_id
            WHERE ${genreListCustom};

            
            `)
            .then(dbRes => {
                sequelize.query(`SELECT song_id
                FROM playlistsong AS ps
                JOIN playlists as p ON ps.playlist_id = p.playlist_id
                WHERE p.user_id = '${userid}';`)
                .then(dbRes2 => {

                    resSongs.push(dbRes[0])
                    res.status(200).send([resSongs[0],dbRes2[0]])
                })
                
            })
    },

    deleteSong: (req,res) => {
        sequelize.query(`
        DELETE
        FROM playlistsong
        WHERE playlist_id = '${req.query.userID}' AND song_id = '${req.query.song}'
        `).then(dbRes => {res.sendStatus(200)})
    },

    addSong: (req,res) => {
        sequelize.query(`
       INSERT INTO playlistsong (playlist_id, song_id)
       VALUES (${req.query.userID}, ${req.query.song})
        `).then(dbRes => {res.sendStatus(200)})
    },

    getPlaylist: (req,res) => {
        userid = req.query.userID
        sequelize.query(`SELECT ps.song_id, s.song_name, s.genre, a.artist_name
                FROM playlistsong AS ps
                JOIN playlists AS p ON ps.playlist_id = p.playlist_id
                JOIN songs AS s ON ps.song_id = s.song_id
                JOIN artists AS a ON s.artist_id = a.artist_id
                WHERE p.user_id = '${userid}'
                ORDER BY s.genre;` )
                .then(dbRes => {
                    sequelize.query(`
                    SELECT playlist_name
                    FROM playlists
                    WHERE ${userid} = playlist_id;
                    `)
                    .then( dbRes2 => {
                    res.status(200).send([dbRes[0], dbRes2[0]])
                    })
                })
    },

    createPlaylist: (req,res) => {
        let {userid, playlistName} = req.body

        sequelize.query(`
            UPDATE playlists
            SET playlist_name = '${playlistName}'
            WHERE playlist_id = ${userid}
        `).then(dbRes => {
            res.sendStatus(200)
        }).catch(err=> {res.status(200).send("You must only use letters in your playlist name!")})
    },

    spotifyAuth: (req, res) => {

            // your application requests authorization
            let authOptions = {
              url: 'https://accounts.spotify.com/api/token',
              headers: {
                'Authorization': 'Basic ' + (new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
              },
              form: {
                grant_type: 'client_credentials'
              },
              json: true
            };

            request.post(authOptions, function(error, response, body) {
              

                if (!error && response.statusCode === 200) {
                let token = body.access_token;
                res.status(200).send(token)
              }
        
              
            });
        
    }, 
    
    artistInfo: (req,res) => {
        let artist = req.query.artist
        let token = req.query.token

        const options = {
              url: `https://api.spotify.com/v1/search?type=artist&q=${artist}&limit=1`,
              headers: {
                'Authorization': 'Bearer ' + token
              },
              json: true
            };
            request.get(options, function(error, response, body) {
              let artistData = {
                  popularity: body.artists.items[0].popularity,
                  genres: body.artists.items[0].genres,
                  followers: body.artists.items[0].followers.total,
                  image: body.artists.items[0].images[0].url
              }
              res.status(200).send(artistData)
            });
    }
}
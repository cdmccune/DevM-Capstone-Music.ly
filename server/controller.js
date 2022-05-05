require('dotenv').config()
const{CONNECTION_STRING} = process.env
const Sequelize = require("sequelize")

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
                if (dbRes[1].rows.length > 1) {
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
        console.log(req.body)
        let genres = req.body.genres
        let resSongs = []
        genres.forEach(genre => {
            sequelize.query(`
            SELECT a.artist_name, s.song_name, s.song_id
            FROM songs AS s
            JOIN artists AS a ON s.artist_id = a.artist_id
            WHERE s.genre = '${genre}';

            
            `)
            .then(dbRes => {
                sequelize.query(`SELECT song_id
                FROM playlistsong AS ps
                JOIN playlists as p ON ps.playlist_id = p.playlist_id
                WHERE p.user_id = '${req.body.userid}';`)
                .then(dbRes2 => {
                    // console.log(dbRes2[0])
                    // resSongs.push(1)
                    resSongs.push(dbRes[0])
    
                    //Why do I need to do this within the .then and not outside. If I do it outside any changes I make to resSongs get deleted.
                    if (resSongs.length == genres.length) {
                        res.status(200).send([resSongs[0],dbRes2[0]])
                    } 
                })
                
            })
        })
    },

    deleteSong: (req,res) => {
       console.log(req.query)
        sequelize.query(`
        DELETE
        FROM playlistsong
        WHERE playlist_id = '${req.query.userID}' AND song_id = '${req.query.song}'
        `).then(dbRes => {res.sendStatus(200)})
    }

    // usersSongs: (req,res) => {
    //     sequelize.query(`
    //     SELECT song_id
    //     FROM playlistsong AS ps
    //     JOIN playlists as p ON ps.playlist_id = p.playlist_id
    //     WHERE p.user_id = '${req.body.userid}';
    //     `)
    //     .then(dbRes => {
    //         res.status(200).send(dbRes[0])
    //     })

    // }
}
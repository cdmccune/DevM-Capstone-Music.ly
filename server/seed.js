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
module.exports ={

// Destroys all tables that are currently there and creates them fresh. Also repopulates the artists 
seed: (req, res) => {
    sequelize.query(`
        DROP TABLE IF EXISTS playlistsong;
        DROP TABLE IF EXISTS playlists;
        DROP TABLE IF EXISTS songs;
        DROP TABLE IF EXISTS artists;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            email VARCHAR(50),
            password VARCHAR(25),
            first_name VARCHAR(25),
            last_name VARCHAR(25)
        );
        
        CREATE TABLE artists (
            artist_id SERIAL PRIMARY KEY,
            artist_name VARCHAR(25),
            spotify_code VARCHAR (16),
            artist_bio VARCHAR (200)
        );

        CREATE TABLE songs (
            song_id SERIAL PRIMARY KEY,
            song_name VARCHAR(25),
            artist_id INTEGER NOT NULL REFERENCES artists(artist_id)
        );

        CREATE TABLE playlists (
            playlist_id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(user_id)
        );

        CREATE TABLE playlistsong (
            playlistsong_id SERIAL PRIMARY KEY,
            playlist_id INTEGER NOT NULL REFERENCES playlists(playlist_id),
            song_id INTEGER NOT NULL REFERENCES songs(song_id)
        );

        INSERT INTO users (email, password, first_name, last_name)
        VALUES ('curtmccune@comcast.net', 12345678, 'Curt', 'McCune');
        
    `).then(()=>{
        console.log('DB seeded!')
        res.sendStatus(200)
    }).catch(err => {console.log(`error seedind DB`, err)})
}
}

// curtmccune@comcast.net
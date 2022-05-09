require('dotenv').config()
const{CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

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
            last_name VARCHAR(25),
            UNIQUE(email)
        );
        
        CREATE TABLE artists (
            artist_id SERIAL PRIMARY KEY,
            artist_name VARCHAR(25),
            spotify_code VARCHAR (16),
            artist_bio VARCHAR (200)
        );

        CREATE TABLE songs (
            song_id SERIAL PRIMARY KEY,
            song_name VARCHAR(75),
            artist_id INTEGER NOT NULL REFERENCES artists(artist_id),
            genre VARCHAR(15)
        );

        CREATE TABLE playlists (
            playlist_id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(user_id),
            playlist_name VARCHAR(30)
        );

        CREATE TABLE playlistsong (
            playlistsong_id SERIAL PRIMARY KEY,
            playlist_id INTEGER NOT NULL REFERENCES playlists(playlist_id),
            song_id INTEGER NOT NULL REFERENCES songs(song_id)
        );

        INSERT INTO users (email, password, first_name, last_name)
        VALUES ('curtmccune@comcast.net', 12345678, 'Curt', 'McCune');
        
        INSERT INTO playlists (user_id, playlist_name)
        VALUES (1, 'The Best Playlist');

        INSERT INTO artists (artist_name)
        VALUES ('The Lumineers'),
        ('Bon Iver'),
        ('James Blake'),
        ('Queen'),
        ('Billy Joel'),
        ('The Beatles'),
        ('The Beachboys'),
        ('Taylor Swift'),
        ('Olivia Rodrigo'),
        ('BROCKHAMPTON'),
        ('Twenty One Pilots'),
        ('Frank Ocean'),
        ('UMI'),
        ('Orion Sun'),
        ('Adele'),
        ('Kanye'),
        ('Chance the Rapper'),
        ('J Cole'),
        ('Kendrick Lamar'),
        ('Drake'),
        ('Sylvan Esso'),
        ('RY X'),
        ('Joji'),
        ('Daughter'),
        ('Bruno Major');

        INSERT INTO songs (song_name, artist_id, genre)
        VALUES ('Ophelia', 1, 'Alternative'),
        ('Sleep On The Floor', 1, 'Alternative'),
        ('Flowers In Your Hair', 1, 'Alternative'),
        ('Leader Of The Landslide', 1, 'Alternative'),
        ('White Lie', 1, 'Alternative'),
        ('Holocene', 2, 'Alternative'),
        ('22 (OVER SOON)', 2, 'Alternative'),
        ('715 - CREEKS', 2, 'Alternative'),
        ('Skinny Love', 2, 'Alternative'),
        ('Faith', 2, 'Alternative'),
        ('Retrograde', 3, 'Alternative'),
        ('I Need A Forest Fire', 3, 'Alternative'),
        ('Life Round Here', 3, 'Alternative'),
        ('The Colour In Anything', 3, 'Alternative'),
        ('Waves Know Shores', 3, 'Alternative'),
        ('Bohemian Rhapsody', 4, 'Classic'),
        ('Don\'\'t Stop Me Now', 4, 'Classic'),
        ('Love Of My Life', 4, 'Classic'),
        ('We Are The Champions', 4, 'Classic'),
        ('Another One Bites The Dust', 4, 'Classic'),
        ('Vienna', 5, 'Classic'),
        ('Piano Man', 5, 'Classic'),
        ('She\'\'s Always A Woman', 5, 'Classic'),
        ('The Longest Time', 5, 'Classic'),
        ('New York State Of Mind', 5, 'Classic'),
        ('Here Comes The Sun', 6, 'Classic'),
        ('Come Together', 6, 'Classic'),
        ('Let It Be', 6, 'Classic'),
        ('Yesterday', 6, 'Classic'),
        ('Hey Jude', 6, 'Classic'),
        ('Kokomo', 7, 'Classic'),
        ('Wouldn\'\'t It Be Nice', 7, 'Classic'),
        ('Good Vibrations', 7, 'Classic'),
        ('Barbara Ann', 7, 'Classic'),
        ('Surfin\'\' USA', 7, 'Classic'),
        ('Enchanted', 8, 'Pop'),
        ('Dear John', 8, 'Pop'),
        ('All Too Well', 8, 'Pop'),
        ('Sparks Fly', 8, 'Pop'),
        ('Love Story', 8, 'Pop'),
        ('happier', 9, 'Pop'),
        ('drivers license', 9, 'Pop'),
        ('deja vu', 9, 'Pop'),
        ('1 step forward, 3 steps back', 9, 'Pop'),
        ('enough for you', 9, 'Pop'),
        ('SUMMER', 10, 'Pop'),
        ('BLEACH', 10, 'Pop'),
        ('SUGAR', 10, 'Pop'),
        ('SWEET', 10, 'Pop'),
        ('NO HALO', 10, 'Pop'),
        ('Smithereens', 11, 'Pop'),
        ('Car Radio', 11, 'Pop'),
        ('Chlorine', 11, 'Pop'),
        ('Migraine', 11, 'Pop'),
        ('Addict With A Pen', 11, 'Pop'),
        ('Lost', 12, 'R&B'),
        ('Pink + White', 12, 'RnB'),
        ('White Ferrari', 12, 'RnB'),
        ('Forrest Gump', 12, 'RnB'),
        ('Pink Matter', 12, 'RnB'),
        ('Remember Me', 13, 'RnB'),
        ('Lullaby', 13, 'RnB'),
        ('Runnin\'\'', 13, 'RnB'),
        ('Down to Earth', 13, 'RnB'),
        ('This Universe', 13, 'RnB'),
        ('Concrete', 14, 'RnB'),
        ('dirty dancer', 14, 'RnB'),
        ('Ne Me Quitte Pas', 14, 'RnB'),
        ('Antidote', 14, 'RnB'),
        ('Space Jam', 14, 'RnB'),
        ('Easy On Me', 15, 'RnB'),
        ('Set Fire To The Rain', 15, 'RnB'),
        ('River Lea', 15, 'RnB'),
        ('Water Under The Bridge', 15, 'RnB'),
        ('Sweetest Devotion', 15, 'RnB'),
        ('Heartless', 16, 'Rap'),
        ('Stronger', 16, 'Rap'),
        ('All of the Lights', 16, 'Rap'),
        ('POWER', 16, 'Rap'),
        ('Ultralight Beams', 16, 'Rap'),
        ('Cocoa Butter Kisses', 17, 'Rap'),
        ('Juke Jam', 17, 'Rap'),
        ('Favorite Song', 17, 'Rap'),
        ('Snowed In', 17, 'Rap'),
        ('Same Drugs', 17, 'Rap'),
        ('Pusha Man', 18, 'Rap'),
        ('Kevin\'\'s Heart', 18, 'Rap'),
        ('Power Trip', 18, 'Rap'),
        ('Work Out ', 18, 'Rap'),
        ('MIDDLECHILD', 18, 'Rap'),
        ('Money Trees', 19, 'Rap'),
        ('Poetic Justice', 19, 'Rap'),
        ('u', 19, 'Rap'),
        ('The Ways', 19, 'Rap'),
        ('ELEMENT', 19, 'Rap'),
        ('All Me', 20, 'Rap'),
        ('Passionfruit', 20, 'Rap'),
        ('Laugh Now Cry Later', 20, 'Rap'),
        ('Controlla', 20, 'Rap'),
        ('Chicago Freestyle', 20, 'Rap'),
        ('Funeral Singers', 21, 'Chill'),
        ('Hey Mami', 21, 'Chill'),
        ('Rooftop Dancing', 21, 'Chill'),
        ('Slack Jaw', 21, 'Chill'),
        ('Uncatena', 21, 'Chill'),
        ('Only', 22, 'Chill'),
        ('Berlin', 22, 'Chill'),
        ('Howling', 22, 'Chill'),
        ('Bound', 22, 'Chill'),
        ('YaYaYa', 22, 'Chill'),
        ('SLOW DANCING IN THE DARK', 23, 'Chill'),
        ('YEAH RIGHT', 23, 'Chill'),
        ('Sanctuary', 23, 'Chill'),
        ('Your Man', 23, 'Chill'),
        ('Afterthought', 23, 'Chill'),
        ('Youth', 25, 'Chill'),
        ('Medicine', 25, 'Chill'),
        ('Smother', 25, 'Chill'),
        ('Candles', 25, 'Chill'),
        ('Landfill', 25, 'Chill'),
        ('Easily', 24, 'Chill'),
        ('Places We Won\'\'t Walk', 24, 'Chill'),
        ('Old Fashioned', 24, 'Chill'),
        ('Nothing', 24, 'Chill'),
        ('Just The Same', 24, 'Chill');

        INSERT INTO playlistsong (playlist_id, song_id)
        VALUES (1,1),
        (1,4),
        (1,7),
        (1,12),
        (1,18),
        (1,21),
        (1,36),
        (1,41),
        (1,47),
        (1,54),
        (1,59),
        (1,64),
        (1,67),
        (1,68),
        (1,78),
        (1,81),
        (1,89),
        (1,92),
        (1,100);
        
    `).then(()=>{
        console.log('DB seeded!')
        res.sendStatus(200)
    }).catch(err => {console.log(`error seedind DB`, err)})
}
}

// curtmccune@comcast.net
import { connectDB, getDB } from "../db/connection";
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();
const dbInit = async () => {
    try {
        await connectDB();
        const db = getDB();

        console.log('Initialisation de la base de données...', db.databaseName);
        //Retire tout les documents existants dans les collections
        await db.collection('users').deleteMany({});
        await db.collection('movies').deleteMany({});
        await db.collection('series').deleteMany({});


        const hashedAdminPassword = await bcrypt.hash('adminpass', 10);
        const hashedUserPassword = await bcrypt.hash('userpass', 10);

        const adminUser = await db.collection('users').insertOne({
            username: 'admin',
            email: 'admin@test.com',
            password: hashedAdminPassword,
            role: 'admin',
            favorites: []
        });

        const userUser = await db.collection('users').insertOne({
            username: 'user',
            email: 'user@test.com',
            password: hashedUserPassword,
            role: 'user',
            favorites: []
        });

        const movies = await db.collection('movies').insertMany([
            {
                title: 'Inception',
                genres: ['Sci-Fi', 'Action'],
                synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                releaseDate: new Date('2010-07-16'),
                duration: 148
            },
            {
                title: 'The Dark Knight',
                genres: ['Action', 'Crime', 'Drama'],
                synopsis: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                releaseDate: new Date('2008-07-18'),
                duration: 152
            }
        ]);

        const series = await db.collection('series').insertMany([
            {
                title: 'Breaking Bad',
                genres: ['Crime', 'Drama', 'Thriller'],
                status: 'ended'
            },
            {
                title: 'Stranger Things',
                genres: ['Drama', 'Fantasy', 'Horror'],
                status: 'ongoing'
            }
        ]);

        const ratings = await db.collection('ratings').insertMany([
            {
                userId: adminUser.insertedId,
                target: 'movie',
                targetId: movies.insertedIds[0],
                score: 9,
                review: 'Amazing movie with a mind-bending plot!'
            },
            {
                userId: userUser.insertedId,
                target: 'movie',
                targetId: movies.insertedIds[1],
                score: 10,
                review: 'One of the best TV series ever made!'
            }
        ]);
    } catch (error) {
        console.error('Erreur Intialisation de db:', error);
    } finally {
        await getDB().client.close();
        process.exit();
    }
    
};
dbInit()


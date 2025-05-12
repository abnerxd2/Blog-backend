import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import subjectsRoutes from "../crc/subjects/subjects.routes.js"
import commentsRoutes from "../crc/comments/comments.routes.js"


const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
        app.use(morgan("dev"))
    }

const routes = (app) => {
    app.use("/blog/v1/subjects", subjectsRoutes)
    app.use("/blog/v1/comments", commentsRoutes)
}

const conectarDB = async () => {
    try {
        await dbConnection()
    } catch (err) {
        console.log(`Database conection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try {
        conectarDB()
        middlewares(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on part: ${process.env.PORT}`)
    } catch (err) {
        console.log(`Server init failed: ${err}`)
    }
}
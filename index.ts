import express, { Express } from "express";
import * as database from './config/database';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from "./typeDefs/index.typeDefs";
import { resolvers } from "./resolvers/index.resolvers";

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

const startServer = async () => {
    // Load environment variables
    dotenv.config();

    // Kết nối database
    await database.connect();

    // Khởi tạo Apollo Server
    const apolloServer = new ApolloServer({
        typeDefs:typeDefs,
        resolvers: resolvers,
    });

    // Khởi động Apollo Server
    await apolloServer.start();

    // Middleware - Ép kiểu qua unknown trước khi sang express.RequestHandler
    app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware(apolloServer) as unknown as express.RequestHandler
    );

    // Khởi động server
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
        console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
};

// Xử lý lỗi
process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
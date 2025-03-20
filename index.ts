import express,{Express} from "express"
import * as database from './config/database'
import dotenv from 'dotenv'
import {  ApolloServer } from "apollo-server-express"
import { typeDefs } from "./typeDefs"
import { resolvers } from "./resolvers"
const app: Express=express()
const startServer = async()=>{
    dotenv.config()

    database.connect()
    
    
    
    const port: number =3000
    
    // parse application/x-www-form-urlencoded
    //app.use(bodyParser.urlencoded({ extended: false }))
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({
        app:app,
        path: "/graphql"
    })
    app.listen(port,()=>{
        console.log("App listening at localhost:3000")
    })
    
}

startServer()
const { ApolloServer }= require('apollo-server');

require('dotenv').config('variable.env');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const conectardb = require('./config/db');

const jwt = require('jsonwebtoken');

conectardb();


const server = new ApolloServer({typeDefs, resolvers,
    context:({req})=>{
        const token = req.headers['authorization']||'';
        if(token){
            try {
                const user = jwt.verify(token, process.env.SECRETA);
                return{
                    user
                }
            } catch (error) {
                
            }
        }
    }
});

server.listen({port: process.env.PORT || 4000}).then(({url})=>{
    console.log(`Servidor listo en la url gaa ${url}`)
})
//{ port:process.env.PORT || 4000}
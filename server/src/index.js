const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');

const Query = require('./resolvers/Query');

const resolvers = {
    Query,
}

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: ({ req }) => {
        return {
            ...req,
        };
    }
})

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer().then(() => {
    app.listen({ port: 4000 }, () =>
        console.log(`Server is running on http://localhost:4000${server.graphqlPath}`)
        );
});
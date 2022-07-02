// Dependency Imports
const { ApolloServer } = require('apollo-server'); 
const gql = require('graphql-tag'); 
const mongoose = require('mongoose');

// Relative Imports
const Post = require
const { MONGODB } = require('./config.js');

const typeDefs = gql`
        type Post{
            id: ID!
            body: String!
            createdAt: String!
            username: String!
        }
    type Query{
        getPosts: [Post]
    }
`;

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 3001 });
    }) 
    .then(res => {
        console.log(`Server running at ${res.url}`)
    });
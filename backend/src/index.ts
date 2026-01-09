import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server (async)
async function startServer() {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`Server ready at ${url}`);
}

startServer();

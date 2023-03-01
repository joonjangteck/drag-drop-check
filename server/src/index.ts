import 'reflect-metadata'
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CosmosClient, Database } from "@azure/cosmos";
import { Container } from "inversify";
import { BINDINGS } from "./bindings";
import { Dependencies } from './domain';
import typeDefs from './graphql/defs';
import resolvers from './graphql/resolvers';
import { AccessCosmosService, CosmosDbService } from './services';
import { CONFIG } from './config';

const { COSMOS_ENDPOINT, COSMOS_KEY, COSMOS_TABLE_ID } = CONFIG;

(async () => {
  const database = new CosmosClient({
    endpoint: COSMOS_ENDPOINT,
    key: COSMOS_KEY,
  }).database(COSMOS_TABLE_ID);

  const container = new Container();

  container.bind<Database>(BINDINGS.Database).toConstantValue(database);
  container.bind<CosmosDbService>(BINDINGS.CosmosDbService).to(CosmosDbService);
  container.bind<AccessCosmosService>(BINDINGS.AccessCosmosService).to(AccessCosmosService);

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

const status = await startStandaloneServer(apolloServer, {
    context: async ({ req }): Promise<Dependencies> => {
      return new Dependencies(container);
    },
  });

  console.log(`🚀 Server listening at: ${status.url}`);
})();

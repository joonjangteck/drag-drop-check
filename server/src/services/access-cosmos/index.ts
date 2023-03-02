import { provide } from 'inversify-binding-decorators';
import { Database } from '@azure/cosmos';
import { CosmosDbService } from '../cosmos-db-service';
import { inject } from 'inversify';
import { BINDINGS } from '../../bindings';


interface IncomingArguement{
  cosmosContainer: string;
  queryCommand: string;
}

@provide(BINDINGS.AccessCosmosService)
export class AccessCosmosService {
  private cosmosDb: Database;

  constructor(@inject(BINDINGS.CosmosDbService) private cosmosDbService: CosmosDbService) {
    this.cosmosDb = this.cosmosDbService.database;
  }
  
  public async retrieve(arg: IncomingArguement){
    try {
      const cosmosDbContainer = this.cosmosDb.container(arg.cosmosContainer);
      const {resources: items } = await cosmosDbContainer.items.query({query: arg.queryCommand}).fetchAll();

      if (!items){
        return "No response";
      }
      // console.log(items);
      console.log("SUCCESS");
      return JSON.stringify(items);
    } catch(e) {
      return "ERROR: " + e;
    }
  }
}

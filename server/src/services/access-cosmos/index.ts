import { provide } from 'inversify-binding-decorators';
import { Container as CosmosDbContainer } from '@azure/cosmos';
import { CosmosDbService } from '../cosmos-db-service';
import { inject } from 'inversify';
import { BINDINGS } from '../../bindings';

@provide(BINDINGS.AccessCosmosService)
export class AccessCosmosService {
  private cosmosDbContainer: CosmosDbContainer;

  constructor(@inject(BINDINGS.CosmosDbService) private cosmosDbService: CosmosDbService) {
    this.cosmosDbContainer = this.cosmosDbService.database.container("container-pro-hvc-bo-hour-utilization");
  }
  
  async retrieve(){

    const QUERY = "SELECT * FROM c ORDER BY c._ts DESC OFFSET 0 LIMIT 6";
    try {
      const {resources: items } = await this.cosmosDbContainer.items.query({query: QUERY}).fetchAll();

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

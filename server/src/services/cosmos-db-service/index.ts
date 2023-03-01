import { Database } from '@azure/cosmos';
import { inject } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { BINDINGS } from '../../bindings';

@fluentProvide(BINDINGS.CosmosDbService).inSingletonScope().done()
export class CosmosDbService {
  constructor(@inject(BINDINGS.Database) public database: Database) {}
}

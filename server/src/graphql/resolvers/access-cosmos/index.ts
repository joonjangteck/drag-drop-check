import { Dependencies } from '../../../domain';
import { BINDINGS } from '../../../bindings';
import { AccessCosmosService } from '../../../services';

export default (p: undefined, d: undefined, dependencies: Dependencies) => {
  const service = dependencies.container.get<AccessCosmosService>(BINDINGS.AccessCosmosService);
  return service.retrieve(d);
};

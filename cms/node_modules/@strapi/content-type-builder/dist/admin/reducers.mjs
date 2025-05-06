import { reducer as reducer$1 } from './components/DataManagerProvider/reducer.mjs';
import { reducer } from './components/FormModal/reducer.mjs';
import { pluginId } from './pluginId.mjs';

const reducers = {
    [`${pluginId}_formModal`]: reducer,
    [`${pluginId}_dataManagerProvider`]: reducer$1
};

export { reducers };
//# sourceMappingURL=reducers.mjs.map

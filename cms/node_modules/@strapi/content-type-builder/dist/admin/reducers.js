'use strict';

var reducer$1 = require('./components/DataManagerProvider/reducer.js');
var reducer = require('./components/FormModal/reducer.js');
var pluginId = require('./pluginId.js');

const reducers = {
    [`${pluginId.pluginId}_formModal`]: reducer.reducer,
    [`${pluginId.pluginId}_dataManagerProvider`]: reducer$1.reducer
};

exports.reducers = reducers;
//# sourceMappingURL=reducers.js.map

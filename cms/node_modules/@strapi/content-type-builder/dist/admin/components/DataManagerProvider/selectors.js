'use strict';

var toolkit = require('@reduxjs/toolkit');
var pluginId = require('../../pluginId.js');
var reducer = require('./reducer.js');

/**
 * Direct selector to the dataManagerProvider state domain
 */ const dataManagerProviderDomain = ()=>(state)=>state[`${pluginId.pluginId}_dataManagerProvider`] || reducer.initialState;
/**
 * Other specific selectors
 */ /**
 * Default selector used by dataManagerProvider
 */ const makeSelectDataManagerProvider = ()=>toolkit.createSelector(dataManagerProviderDomain(), (substate)=>{
        return substate;
    });

exports.dataManagerProviderDomain = dataManagerProviderDomain;
exports.makeSelectDataManagerProvider = makeSelectDataManagerProvider;
//# sourceMappingURL=selectors.js.map

import { createSelector } from '@reduxjs/toolkit';
import { pluginId } from '../../pluginId.mjs';
import { initialState } from './reducer.mjs';

/**
 * Direct selector to the dataManagerProvider state domain
 */ const dataManagerProviderDomain = ()=>(state)=>state[`${pluginId}_dataManagerProvider`] || initialState;
/**
 * Other specific selectors
 */ /**
 * Default selector used by dataManagerProvider
 */ const makeSelectDataManagerProvider = ()=>createSelector(dataManagerProviderDomain(), (substate)=>{
        return substate;
    });

export { dataManagerProviderDomain, makeSelectDataManagerProvider };
//# sourceMappingURL=selectors.mjs.map

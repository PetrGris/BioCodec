import { createSelector } from '@reduxjs/toolkit';
import { pluginId } from '../../pluginId.mjs';
import { initialState } from './reducer.mjs';

/**
 * Direct selector to the formModal state domain
 */ const formModalDomain = ()=>(state)=>state[`${pluginId}_formModal`] || initialState;
/**
 * Other specific selectors
 */ /**
 * Default selector used by formModal
 */ const makeSelectFormModal = ()=>createSelector(formModalDomain(), (substate)=>{
        return substate;
    });

export { formModalDomain, makeSelectFormModal };
//# sourceMappingURL=selectors.mjs.map

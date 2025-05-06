'use strict';

var toolkit = require('@reduxjs/toolkit');
var pluginId = require('../../pluginId.js');
var reducer = require('./reducer.js');

/**
 * Direct selector to the formModal state domain
 */ const formModalDomain = ()=>(state)=>state[`${pluginId.pluginId}_formModal`] || reducer.initialState;
/**
 * Other specific selectors
 */ /**
 * Default selector used by formModal
 */ const makeSelectFormModal = ()=>toolkit.createSelector(formModalDomain(), (substate)=>{
        return substate;
    });

exports.formModalDomain = formModalDomain;
exports.makeSelectFormModal = makeSelectFormModal;
//# sourceMappingURL=selectors.js.map

'use strict';

const createDataObject = (arr)=>arr.reduce((acc, current)=>{
        acc[current.uid] = current;
        return acc;
    }, {});

exports.createDataObject = createDataObject;
//# sourceMappingURL=createDataObject.js.map

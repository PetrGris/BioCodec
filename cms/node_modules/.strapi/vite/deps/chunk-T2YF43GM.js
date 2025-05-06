import {
  require_baseEach
} from "./chunk-NE3KAGU6.js";
import {
  require_isArrayLike
} from "./chunk-CE4VABH2.js";
import {
  __commonJS
} from "./chunk-PLDDJCW6.js";

// node_modules/lodash/_baseMap.js
var require_baseMap = __commonJS({
  "node_modules/lodash/_baseMap.js"(exports, module) {
    var baseEach = require_baseEach();
    var isArrayLike = require_isArrayLike();
    function baseMap(collection, iteratee) {
      var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection2) {
        result[++index] = iteratee(value, key, collection2);
      });
      return result;
    }
    module.exports = baseMap;
  }
});

export {
  require_baseMap
};
//# sourceMappingURL=chunk-T2YF43GM.js.map

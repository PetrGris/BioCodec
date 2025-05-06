import {
  require_eq,
  require_isArrayLike,
  require_isIndex,
  require_isObject
} from "./chunk-CE4VABH2.js";
import {
  __commonJS
} from "./chunk-PLDDJCW6.js";

// node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  "node_modules/lodash/_isIterateeCall.js"(exports, module) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
        return eq(object[index], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  }
});

export {
  require_isIterateeCall
};
//# sourceMappingURL=chunk-K65KIEAL.js.map

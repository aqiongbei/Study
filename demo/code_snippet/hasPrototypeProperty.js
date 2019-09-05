/**
 * adjust one property is in prototype
 * @param  {[Object]}  object [object]
 * @param  {[String]}  name   [property]
 * @return {Boolean}        [description]
 */
function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && name in object;
}
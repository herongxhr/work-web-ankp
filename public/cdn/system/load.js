(function(name, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory();
  else if(typeof define === 'function' && define.amd)
    define([], factory);
  else if(typeof exports === 'object')
    exports[name] = factory();
  else
    this[name] = factory();
}('LoadJs', function (url) {
  var load = function (url) {
    return System.import(url)
  };
  return load
}));

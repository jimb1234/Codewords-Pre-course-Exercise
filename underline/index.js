
var _ = {};

// ARRAYS

// _.first(array, [n])
// Returns an array with the first n elements of an array.
// If n is not provided it returns an array with just the first element.
_.first = function (array, n) {
  if (Object.prototype.toString.call(array) === '[object Arguments]') {
    array = Array.from(array);
  }
if (!Array.isArray(array)) {
    return [];
}
if (typeof n !== 'number' || isNaN(n) || n<= 0) {
  return array.slice(0 ,1);
}
if (n > array.length) {
  return array;
}
return array.slice(0, n);
}


// // _.last(array, [n])
// // Returns an array with the last n elements of an array.
// // If n is not provided it returns an array with just the last element.
_.last = function (array, n) {
  if (Object.prototype.toString.call(array) === '[object Arguments]') {
    array = Array.from(array);
  }
if (!Array.isArray(array)) {
  array = Array.prototype.slice.call[array];
  return [];
}
if (typeof n === 'undefined' || typeof n !== 'number' || isNaN(n) || n <= 0) {
return [array[array.length - 1]];
}
if (n > array.length) {
return array;
}
return array.slice(-n); 
};


// // _.uniq(array)
// // Produces a duplicate-free version of the array, using === to test equality.
// // In particular only the first occurrence of each value is kept.
_.uniq = function (array) {
if (!Array.isArray(array)) {
return [];
} else { 
return [...new Set(array)];
};
}


// // OBJECTS

// // _.extend(destination, source)
// // Copies all the own enumerable properties in the source object over
// // to the destination object, and returns it (without using `Object.assign`).
_.extend = function (destination, source) {
for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      destination[key] = source[key]; 
    }    
  }
  return destination; 
};

// // _.defaults(destination, source)
// // Fills in undefined properties in the destination object
// // with own enumerable properties present in the source object,
// // and returns the destination object.
_.defaults = function (destination, source) {
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key) && destination[key] === undefined) {
      destination[key] = source[key];
    }
}
return destination
};


// // COLLECTIONS

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
  if (context) {
    iteratee = iteratee.bind(context)
  }
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      iteratee(collection[i], i, collection)
    }
  } else {
    for (let key in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, key)){
        iteratee(collection[key], key, collection)
      }
    }
}
return collection;
};


// // _.contains(collection, value)
// // Returns an array of indexes / keys where value can be found in the collection.
// // TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  var res = [];
  _.each(collection, function (el, key) {
    el === value && res.push(key);
  });
  return res;
};

// // _.map(collection, iteratee, [context])
// // Returns a new array of values by mapping each value in collection through iteratee.
// // Each invocation of iteratee is called with three arguments:
// // (element, index|key, collection), and bound to the context if one is passed.

_.map = function(collection, iteratee, context) {
  const result = [];

  if (context) {
    iteratee = iteratee.bind(context);
  }

  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      result.push(iteratee(collection[i], i, collection));
    }
  } else {
    for (const key in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, key)) {
        result.push(iteratee(collection[key], key, collection));
      }
    }
  }

  return result;
};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {
  let initialising = true;
  let memo = accumulator;

if (context) {
  iteratee = iteratee.bind(context)
}

if (Array.isArray(collection)) {
  for (let i = 0; i < collection.length; i++) {
if (initialising && typeof memo === 'undefined') {                           // if initialising is true (ie. no memo provided) -> the accumualator begins with first value of collection
  memo = collection [i] 
  initialising = false; 
} else {
  memo = iteratee(memo, collection[i], i, collection)
      }
    }
} else {
  for (const key in collection) {
    if (Object.prototype.hasOwnProperty.call(collection, key))
      if (initialising && typeof memo === 'undefined') {
        memo = collection[key]
      } else {
        memo = iteratee(memo, collection[key], key, collection);
      }
    }
  }
return memo;
};

// // _.filter(collection, predicate, [context])
// // Looks through each value in the collection, returning an array of all the values
// // that pass a truth test (predicate). Predicate is called with three arguments:
// // (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
let truthList = [];

if (context) {
  predicate = predicate.bind(context) 
}; 
if (Array.isArray(collection)) {
  for (let i = 0; i < collection.length; i++){
if (predicate(collection[i], i, collection)){
  truthList.push(collection[i])
      }
    } 
  } else {
      for (const key in collection) {
        if (Object.prototype.hasOwnProperty.call(collection, key)) {
         if (predicate(collection[key], key, collection)) {
          truthList.push(collection[key])
         } 
        }
      }
    }
    return truthList;
};


// // _.reject(collection, predicate, [context])
// // Looks through each value in the collection, returning an array of all the values
// // that don't pass a truth test (predicate). Predicate is called with three arguments:
// // (element, index|key, collection), and bound to the context if one is passed.
// // TIP: can you reuse _.filter()?

_.reject = function (collection, predicate, context) {
const falseList = []; 

if (context) {
  predicate = predicate.bind(context)
};

if (Array.isArray(collection)){
  for (let i = 0; i < collection.length; i++) {
  if (!predicate(collection[i], i, collection)) {
    falseList.push(collection[i]);
  }
  }
} else { 
  for (const key in collection) {
    if (Object.prototype.hasOwnProperty.call(collection, key)) {
      if (!predicate(collection[key], key, collection)) {
        falseList.push(collection[key])
      }
    }
  }
}
return falseList;
};


// // _.every(collection, [predicate], [context])
// // Returns true if all values in the collection pass the predicate truth test.
// // Predicate is called with three arguments:
// // (element, index|key, collection), and bound to the context if one is passed.
// // Short-circuits and stops traversing the list if a false element is found.
// // TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// // Because of the short-circuiting though, you need to implement it in a similar way as you did at _.each.
_.every = function (collection, predicate, context) {
  if (context) {
    predicate = predicate.bind(context);
  }

  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      if (!predicate(collection[i], i, collection)) {
        return false;
      }
    }
  } else if (typeof collection === 'object' && collection !== null) {
    for (const key in collection) {
      if (Object.prototype.hasOwnProperty.call(collection, key)) {
        if (!predicate(collection[key], key, collection)) {
          return false;
        }
      }
    }
  } else {
    return true;
  }

  return true;
};

// // _.some(collection, [predicate], [context])
// // Returns true if any value in the collection passes the predicate truth test.
// // Predicate is called with three arguments:
// // (element, index|key, collection), and bound to the context if one is passed.
// // Short-circuits and stops traversing the list if a true element is found.
// // TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
if (context) {
  predicate = predicate.bind(context)
};
if (Array.isArray(collection)) {
  for (let i = 0; i < collection.length; i++) {
    if (predicate(collection[i], i, collection)) {
      return true;
    }
  }
} else { 
  for (const key in collection) {
    if (Object.prototype.hasOwnProperty.call(collection, key)) {
      if(predicate(collection[key], key, collection)) {
        return true;
      }
    }
  }
}
return false;
};

// // _.invoke(collection, methodName, *arguments)
// // Returns an array with the results of calling the method
// // indicated by methodName on each value in the collection.
// // // Any extra arguments passed to invoke will be forwarded on to the method invocation.
// _.invoke = function (collection, methodName) {
// var func = typeof methodName === 'function';
// let result = []
// };
// if (Array.isArray(collection)) {

// }

// // _.pluck(collection, propertyName)
// // A convenient version of what is perhaps the most common use-case for map:
// // given an array of objects (collection), iterates over each element
// // in the collection, and returns an array with all the values
// // corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
let result = [];
for (let i = 0; i < collection.length; i++) {
  for (let key in collection[i]) {
    if (key === propertyName) {
      result.push(collection[i][key])
    } else {
      result.push(undefined)
    }
  }
}
  return result;
};



// // // FUNCTIONS

// // // _.once(func)
// // // Creates a version of the function that can only be called one time
// // // (with any arguments). Repeated calls to the modified function
// // // will have no effect, returning the value from the original call.
// // // Useful for initialization functions, instead of having to set
// // // a boolean flag and then check it later.
// // _.once = function (func) {
  _.once = function (func) {
    let result;
    let called = false;
  
    return function funcHandler() {
      if (!called) {
        result = func.apply(this, arguments);
        called = true;
      }
      return result;
    };
  };
  
// // };

// // // _.memoize(func)
// // // Memoizes a given function by caching the computed result.
// // // Useful for speeding up slow-running computations.
// // // You may assume that the memoized function takes only one argument
// // // and that it is a primitive. Memoize should return a function that when called,
// // // will check if it has already computed the result for the given argument
// // // and return that value instead of recomputing it.
  _.memoize = function (func) {
    let cache = {};
  
    return function (...args) {
      let key = args[0]; // Assuming func takes only one primitive argument
      if (!(key in cache)) {
        cache[key] = func.apply(this, args);
      }
      return cache[key];
    };
  };

// // // _.delay(function, wait, *arguments)
// // // Much like setTimeout(), invokes function after waiting milliseconds.
// // // If you pass the optional arguments, they will be forwarded
// // // on to the function when it is invoked.
  _.delay = function (func, wait, ...args) {
    setTimeout(function () {
      func.apply(null, args);
    }, wait);
  };


// // // _.throttle(function, wait)
// // // Returns a new, throttled version of the passed function that,
// // // when invoked repeatedly (with any arguments), calls the original function
// // // at most once every wait milliseconds, and otherwise just returns
// // // the last computed result. Useful for rate-limiting events
// // // that occur faster than you can keep up with.
_.throttle = function (func, wait) {
let waiting = false;
let lastArgs, lastContext, lastResult;
function throttled(...args) {
  if (!waiting) {
    lastArgs = args;
    lastContext = this;
    lastResult = func.apply(this, args) 
    waiting = true;
    setTimeout(() => {
      waiting = false;
     }, wait);
    }
  return lastResult
  }
return throttled;
};


// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}


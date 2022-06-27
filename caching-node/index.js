// * Caching
const createHash = (item) => JSON.stringify(item);

const memoize = (original) => {
  const cache = {};
  return (...args) => {
    const hash = createHash(args);
    const calculateResults = () => {
      const results = original(...args);
      cache[hash] = results;
      return results;
    };

    return cache.hasOwnProperty(hash) ? cache[hash] : calculateResults();
  };
};

//*
function expensiveCompute(a, b, c) {
  return a + b + c;
}

const memoizedCompute = memoize(expensiveCompute);
console.time();
memoizedCompute(1, 2, 3);
console.timeEnd(); // expensiveCompute is executed and the result is stored and returned
memoizedCompute(2, 4, 6); // expensiveCompute is executed  again
console.time();
memoizedCompute(1, 2, 3);
console.timeEnd(); // expensiveCompute is not exectued, instead
memoizedCompute(2, 4, 6);

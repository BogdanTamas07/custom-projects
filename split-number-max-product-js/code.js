const splitNumber = (number) => {
  const sums = getSums(number);
  let max = { value: 0, values: [] };

  sums.map((item) => {
    const product = item.reduce((item1, item2) => item1 * item2);

    if (product > max.value) {
      max = { value: product, values: item };
    }
  });

  return max;
};

const getValuesWithStaticIndex = (number, index) => {
  let sum = 0;
  let localIndex = index;
  let values = [];
  while (sum !== number && localIndex > 1) {
    sum = sum + localIndex;
    values.push(localIndex);
    if (sum + localIndex > number) {
      --localIndex;
    }
  }

  if (sum === number) return values;
  return null;
};

const getValuesWithDynamicIndex = (number, index) => {
  let sum = 0;
  let localIndex = index;
  let values = [];

  while (sum !== number && localIndex > 1) {
    sum = sum + localIndex;
    values.push(localIndex);
    if (sum + localIndex < number) {
      ++localIndex;
    }
    if (sum + localIndex > number) {
      --localIndex;
    }
  }

  if (sum === number) return values;
  return null;
};

const getSums = (number) => {
  let results = [];

  for (let index = 2; index < number; index++) {
    const firsPair = getValuesWithStaticIndex(number, index);
    const secondPair = getValuesWithDynamicIndex(number, index);

    if (firsPair) {
      if (
        !results.some(
          (item) => JSON.stringify(firsPair) === JSON.stringify(item)
        )
      ) {
        results.push(firsPair);
      }
    }

    if (secondPair) {
      if (
        !results.some(
          (item) => JSON.stringify(secondPair) === JSON.stringify(item)
        )
      ) {
        results.push(secondPair);
      }
    }
  }

  return results;
};

console.log(splitNumber(10));
console.log(splitNumber(5));
console.log(splitNumber(25));

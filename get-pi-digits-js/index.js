const piDigits = (digitsNumber) => {
  console.log(getPiValue(digitsNumber).toFixed(digitsNumber));
};

const getProduct = (i) => {
  let product = 1;

  for (let j = 0; j <= 2 * i - 1; j++) {
    const value = Math.pow(j + 1, Math.pow(-1, j));
    product = product * value;
  }

  return product;
};

const getPiValue = (digitsNumber) => {
  let sum = 0;

  for (let i = 0; i <= digitsNumber; i++) {
    const firstValue = 3 / (Math.pow(4, i) * (2 * i + 1));
    sum = sum + firstValue * getProduct(i);
  }

  return sum;
};

console.log(piDigits(30));

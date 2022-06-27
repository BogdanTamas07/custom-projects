const trashContainer = document.querySelector(".trash-container");
const moneyElem = document.querySelector(".money");
const currencyFormatter = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const trashFormatter = new Intl.NumberFormat("en-us", {
  minimumIntegerDigits: 8,
  maximumFractionDigits: 0,
  useGrouping: false,
});

const MAX_MONEY_RAISED = 30 * Math.pow(10, 6);

(async function setupTrash() {
  const amountRaised = await fetch("https://tscache.com/donation_total.json")
    .then((res) => res.json())
    .then((data) => data.count);
  moneyElem.innerText = currencyFormatter.format(amountRaised);

  const amounLeftToRaise = Math.max(MAX_MONEY_RAISED - amountRaised, 0);
  const stringifiedAmount = trashFormatter.format(amounLeftToRaise);

  const trashAmount = {
    xxl: {
      amount: parseInt(`${stringifiedAmount[0]}${stringifiedAmount[1]}`),
      icon: "bag",
    },
    xl: {
      amount: parseInt(`${stringifiedAmount[2]}`),
      icon: "takeout",
    },
    lg: {
      amount: parseInt(`${stringifiedAmount[3]}`),
      icon: "headphones",
    },
    md: {
      amount: parseInt(`${stringifiedAmount[2]}`),
      icon: "phone",
    },
    sm: {
      amount: parseInt(`${stringifiedAmount[2]}`),
      icon: "toy-car",
    },
    xs: {
      amount: parseInt(`${stringifiedAmount[2]}`),
      icon: "bottle",
    },
  };

  Object.values(trashAmount).forEach(({ amount, icon }) => {
    for (let i = 0; i < amount; i++) {
      createTrash(icon);
    }
  });
})();

function createTrash(icon) {
  const img = document.createElement("img");
  const top = randomNumberBetween(0, 50);
  const size = top / 5 + 1;
  img.classList.add("trash");
  img.src = `imgs/${icon}.svg`;
  img.style.top = `${top}vh`;
  img.style.left = `${randomNumberBetween(0, 100)}vh`;
  img.style.width = `${size}vmin`;
  img.style.height = `${size}vmin`;
  img.style.setProperty("--rotation", `${randomNumberBetween(-30, 30)}deg`);
  trashContainer.appendChild(img);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

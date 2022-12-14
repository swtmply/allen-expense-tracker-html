export let transactions = {
  expenses: [],
  incomes: [],
};

export let currentMonth = new Date()
  .toLocaleString("default", { month: "short" })
  .toLocaleLowerCase();

export const icons = {
  Food: "drumstick",
  Clothing: "shirt",
  Bills: "money-bill",
  Entertainment: "wand-magic-sparkles",
  Transportation: "car-side",
  Other: "tree",
};

export const setTransactions = (t) => {
  transactions = t;
};

export const setCurrentMonth = (month) => {
  currentMonth = month;
};

import { monthlyExpenses, yearlyExpenses } from "./charts.js";

const expenseFormDialog = document.getElementById("expenseFormDialog");
const expenseList = document.getElementById("expenseList");
const selectedMonth = document.getElementById("selectedMonth");
const expenseForm = document.getElementById("expenseForm");
const cancelButton = document.getElementById("cancelButton");

let expenses = [];
let currentMonth = new Date()
  .toLocaleString("en-US", { month: "short" })
  .toLowerCase();

export let categories = {
  Food: 0,
  Clothing: 0,
  Bills: 0,
  Entertainment: 0,
  Transportation: 0,
  Other: 0,
};

export let months = {
  Jan: 0,
  Feb: 0,
  Mar: 0,
  Apr: 0,
  May: 0,
  Jun: 0,
  Jul: 0,
  Aug: 0,
  Sep: 0,
  Oct: 0,
  Nov: 0,
  Dec: 0,
};

const icons = {
  Food: "drumstick",
  Clothing: "shirt",
  Bills: "money-bill",
  Entertainment: "wand-magic-sparkles",
  Transportation: "car-side",
  Other: "tree",
};

function initExpenses() {
  // Get the expenses from local storage
  const expensesFromLocalStorage = JSON.parse(localStorage.getItem("expenses"));
  // Initialize the selected month
  selectedMonth.value = currentMonth;

  // Create the expense list
  if (expensesFromLocalStorage) {
    expenses = expensesFromLocalStorage;
    createExpenseList(expenses);
  }
}

function addToExpenses(expense) {
  // Add the expense to the expense list
  expenses.push(expense);

  // Save the expenses to local storage
  localStorage.setItem("expenses", JSON.stringify(expenses));
  createExpenseList(expenses);
}

export function addExpense() {
  const expenseForm = document.forms["expenseForm"];

  // Make an object through the inputs from user
  const expense = {
    date: expenseForm.elements["expenseDate"].value,
    name: expenseForm.elements["expenseName"].value,
    amount: expenseForm.elements["expenseAmount"].value,
    category: expenseForm.elements["expenseCategory"].value,
  };

  // Add the expense to the expense list
  addToExpenses(expense);

  expenseForm.reset();
  closeDialog();
}

function closeDialog() {
  expenseFormDialog.close();
}

function createExpenseList(expenses) {
  // Clear the expense list
  expenseList.innerHTML = "";

  const expensesForMonth = expenses.filter((e) => {
    const monthOfExpense = new Date(e.date)
      .toLocaleString("en-US", { month: "short" })
      .toLowerCase();

    if (currentMonth === monthOfExpense) return e;
  });

  expensesForMonth.forEach((e) => {
    // Add expense to HTML
    const expenseItem = document.createElement("li");
    expenseItem.innerHTML = `
       <li class="bg-white shadow-lg rounded-md p-4 flex justify-between">
         <div class="flex gap-4">
             <i class="fas fa-${icons[e.category]} text-2xl"></i>
             <div class="flex flex-col">
             <span class="font-semibold">${e.name}</span>
             <span class="text-sm text-gray-500">${e.date.toLocaleString(
               "en-US"
             )}</span>
             </div>
         </div>
         <span class="font-semibold">₱ ${Number(e.amount).toLocaleString(
           "en-US"
         )}.00</span>
       </li>`;
    expenseList.appendChild(expenseItem);
  });

  if (monthlyExpenses && yearlyExpenses) {
    calculateMonthlyExpenses(expensesForMonth);
    calculateYearlyExpenses(expenses);
  }
}

function calculateMonthlyExpenses(expenses) {
  // Calculate total of monthly expenses
  const monthlyTotalElement = document.getElementById("monthlyTotal");
  monthlyTotalElement.innerHTML = expenses
    .reduce((prev, curr) => prev + Number(curr.amount), 0)
    .toLocaleString("en-US");

  Object.keys(categories).forEach((key) => {
    categories[key] = expenses.reduce((prev, curr) => {
      if (key === curr.category) {
        return prev + +curr.amount;
      }
      return prev;
    }, 0);
  });

  monthlyExpenses.data.datasets[0].data = Object.values(categories);
  monthlyExpenses.data.labels = Object.keys(categories);

  monthlyExpenses.update();
}

function calculateYearlyExpenses(expenses) {
  // Calculate total of monthly expenses
  const yearlyTotalElement = document.getElementById("yearlyTotal");
  yearlyTotalElement.innerHTML = expenses
    .reduce((prev, curr) => prev + Number(curr.amount), 0)
    .toLocaleString("en-US");

  Object.keys(months).forEach((key) => {
    months[key] = expenses
      .filter((e) => {
        const month = new Date(e.date).toLocaleString("en-US", {
          month: "short",
        });

        return month === key;
      })
      .reduce((prev, curr) => prev + +curr.amount, 0);
  });

  yearlyExpenses.data.datasets[0].data = Object.values(months);
  yearlyExpenses.data.labels = Object.keys(months);

  yearlyExpenses.update();
}

cancelButton.addEventListener("click", closeDialog);
expenseForm.addEventListener("submit", addExpense);
selectedMonth.addEventListener("change", function onMonthSelectChange() {
  currentMonth = selectedMonth.value;
  createExpenseList(expenses);
});

initExpenses();

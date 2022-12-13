import { createExpenseList, addToExpenseList } from "./expenses.js";
import { createCharts } from "./charts.js";

export let expenses = [];
export let currentMonth = new Date()
  .toLocaleString("default", { month: "short" })
  .toLocaleLowerCase();

const expenseFormDialog = document.getElementById("expenseFormDialog");
const selectedMonth = document.getElementById("selectedMonth");
const expenseForm = document.getElementById("expenseForm");
const cancelButton = document.getElementById("cancelButton");

export const closeDialog = () => {
  expenseFormDialog.close();
};

export const addExpense = (e) => {
  e.preventDefault();
  // Get the form from the dialog
  const expenseForm = document.forms["expenseForm"];

  // Make an object through the inputs from user
  const expense = {
    date: expenseForm.elements["expenseDate"].value,
    name: expenseForm.elements["expenseName"].value,
    amount: expenseForm.elements["expenseAmount"].value,
    category: expenseForm.elements["expenseCategory"].value,
  };

  // Add the expense to the expense list
  expenses.push(expense);

  // Save the expenses to local storage
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // update DOM
  addToExpenseList(expense);
  createCharts(expenses, currentMonth);
  expenseForm.reset();
  closeDialog();
};

export const onMonthSelectChange = () => {
  currentMonth = selectedMonth.value;

  createExpenseList(expenses, currentMonth);
  createCharts(expenses, currentMonth);
};

cancelButton.addEventListener("click", closeDialog);
expenseForm.addEventListener("submit", addExpense);
selectedMonth.addEventListener("change", onMonthSelectChange);

function init() {
  // Get the expenses from local storage
  const expensesFromLocalStorage = JSON.parse(localStorage.getItem("expenses"));
  // Initialize the selected month
  selectedMonth.value = currentMonth;

  // Create the expense list
  if (expensesFromLocalStorage) {
    expenses = expensesFromLocalStorage;

    createExpenseList(expenses, currentMonth);
    createCharts(expenses, currentMonth);
  }
}

init();

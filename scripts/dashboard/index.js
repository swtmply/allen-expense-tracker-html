import { createExpenseList, addToExpenseList } from "./expenses.js";
import { createCharts } from "./charts.js";
import {
  currentMonth,
  transactions,
  setCurrentMonth,
  setTransactions,
} from "../index.js";

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
    type: "expenses",
  };

  // Add the expense to the expense list
  transactions.expenses.push(expense);

  // Save the expenses to local storage
  localStorage.setItem("transactions", JSON.stringify(transactions));

  // update DOM
  addToExpenseList(expense);
  createCharts(transactions.expenses, currentMonth);
  expenseForm.reset();
  closeDialog();
};

export const onMonthSelectChange = () => {
  setCurrentMonth(selectedMonth.value);

  createExpenseList(transactions.expenses, currentMonth);
  createCharts(transactions.expenses, currentMonth);
};

cancelButton.addEventListener("click", closeDialog);
expenseForm.addEventListener("submit", addExpense);
selectedMonth.addEventListener("change", onMonthSelectChange);

function init() {
  // Get the expenses from local storage
  const transactionsFromLocalStorage = JSON.parse(
    localStorage.getItem("transactions")
  );
  // Initialize the selected month
  selectedMonth.value = currentMonth;

  // Create the expense list
  if (transactionsFromLocalStorage) {
    setTransactions(transactionsFromLocalStorage);

    createExpenseList(transactions.expenses, currentMonth);
    createCharts(transactions.expenses, currentMonth);
  }
}

init();

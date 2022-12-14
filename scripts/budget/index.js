import {
  transactions,
  currentMonth,
  setCurrentMonth,
  setTransactions,
} from "../index.js";
import { addToTransactionList, createtransactionList } from "./transactions.js";

const transactionFormDialog = document.getElementById("transactionFormDialog");
const selectedMonth = document.getElementById("selectedMonth");
const transactionForm = document.getElementById("transactionForm");
const cancelButton = document.getElementById("cancelButton");

export const closeDialog = () => {
  transactionFormDialog.close();
};

export const addtransaction = (e) => {
  e.preventDefault();
  // Get the form from the dialog
  const transactionForm = document.forms["transactionForm"];

  // Make an object through the inputs from user
  const transaction = {
    date: transactionForm.elements["transactionDate"].value,
    name: transactionForm.elements["transactionName"].value,
    amount: transactionForm.elements["transactionAmount"].value,
    category: transactionForm.elements["transactionCategory"].value,
    type: transactionForm.elements["transactionType"].value,
  };

  // Add the transaction to the transaction list
  transactions[transactionForm.elements["transactionType"].value].push(
    transaction
  );

  // Save the transactions to local storage
  localStorage.setItem("transactions", JSON.stringify(transactions));

  // TODO update DOM
  addToTransactionList(transaction);
  transactionForm.reset();
  closeDialog();
};

export const onMonthSelectChange = () => {
  setCurrentMonth(selectedMonth.value);

  createtransactionList(
    [...transactions.expenses, ...transactions.incomes],
    currentMonth
  );
};

cancelButton.addEventListener("click", closeDialog);
transactionForm.addEventListener("submit", addtransaction);
selectedMonth.addEventListener("change", onMonthSelectChange);

function init() {
  // Get the transactions from local storage
  const transactionsFromLocalStorage = JSON.parse(
    localStorage.getItem("transactions")
  );
  // Initialize the selected month
  selectedMonth.value = currentMonth;

  // Create the transaction list
  if (transactionsFromLocalStorage) {
    setTransactions(transactionsFromLocalStorage);

    createtransactionList(
      [...transactions.expenses, ...transactions.incomes],
      currentMonth
    );
  }
}

init();

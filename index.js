// dialog box
const addExpenseDialog = document.getElementById("addExpenseDialog");
const totalMonthExpensesElement = document.getElementById("totalMonthExpenses");
const selectMonth = document.getElementById("selectMonth");
const expensesContainer = document.getElementById("expensesContainer");
const emptyState = document.createElement("div");
const expensesList = document.getElementById("expensesList");

let selectedMonth = "Jan";
let expenses = {
  Jan: [],
  Feb: [],
  Mar: [],
  Apr: [],
  May: [],
  Jun: [],
  Jul: [],
  Aug: [],
  Sep: [],
  Oct: [],
  Nov: [],
  Dec: [],
};

function load() {
  // clear list
  expensesList.innerHTML = "";
  totalMonthExpensesElement.innerText = `$0`;

  // show empty state if no expenses
  if (expenses[selectedMonth].length === 0) {
    emptyState.classList.add(
      ..."flex justify-center items-center my-4".split(" ")
    );
    emptyState.innerHTML = `
        <p class="text-lg">Wow... such empty 🤣</p>
    `;
    expensesContainer.appendChild(emptyState);
  }

  calculateTotalMonthExpenses();

  // add list items
  expenses[selectedMonth].forEach(({ name, amount, date }) => {
    addListItem(name, amount, date);
  });
}

// dialog actions
function closeAddExpenseDialog() {
  addExpenseDialog.close();
}

function openAddExpenseDialog() {
  addExpenseDialog.showModal();
}

// month select
function selectMonthChange() {
  selectedMonth = selectMonth.value;

  load();
}

function calculateTotalMonthExpenses() {
  const totalMonthExpenses = Object.values(expenses[selectedMonth]).reduce(
    (t, { amount }) => t + amount,
    0
  );

  totalMonthExpensesElement.innerText = `$${totalMonthExpenses}`;
}

load();

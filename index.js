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

// dialog actions
function closeAddExpenseDialog() {
  addExpenseDialog.close();
}

function openAddExpenseDialog() {
  addExpenseDialog.showModal();
}

// month selection function
function selectMonthChange() {
  selectedMonth = selectMonth.value;
  revalidate();
}

// revalidate expenses
function revalidate() {
  // reset to default values
  expensesList.innerHTML = "";
  totalMonthExpensesElement.innerText = `$0`;

  // check the select month if it has no expenses and show the empty state
  console.log(expenses[selectedMonth], expenses[selectedMonth].length);

  if (expenses[selectedMonth].length <= 0) {
    // show empty state
    emptyState.classList.add(
      ..."flex justify-center items-center my-4".split(" ")
    );
    emptyState.innerHTML = `
        <p class="text-lg">Wow... such empty 🤣</p>
    `;
    expensesContainer.appendChild(emptyState);
  } else {
    // remove the empty state
    expensesContainer.removeChild(emptyState);
  }

  // add list items
  expenses[selectedMonth].forEach(({ name, amount, date }) => {
    addListItem(name, amount, date);
  });

  // calculate total month expenses
  const totalMonthExpenses = Object.values(expenses[selectedMonth]).reduce(
    (t, { amount }) => t + amount,
    0
  );

  // update total month expenses
  totalMonthExpensesElement.innerText = `$${totalMonthExpenses}`;
}

revalidate();

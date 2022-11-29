// dialog box
const addExpenseDialog = document.getElementById("addExpenseDialog");
const totalMonthExpensesElement = document.getElementById("totalMonthExpenses");
const selectMonth = document.getElementById("selectMonth");
const expensesContainer = document.getElementById("expensesContainer");
const emptyState = document.createElement("div");
const expensesList = document.getElementById("expensesList");
const barExpensesChart = document
  .getElementById("barExpensesChart")
  .getContext("2d");
const pieExpensesChart = document
  .getElementById("pieExpensesChart")
  .getContext("2d");

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
let categories = [
  "food",
  "clothing",
  "bills",
  "entertainment",
  "transport",
  "other",
];
let barChartData, pieChartData;

let barExpenses = new Chart(barExpensesChart, {
  type: "bar",
  data: {
    labels: Object.keys(expenses),
    datasets: [
      {
        data: barChartData,
        backgroundColor: ["#000"],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  },
});

let pieExpenses = new Chart(pieExpensesChart, {
  type: "doughnut",
  data: {
    labels: categories,
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#0000b3",
          "#0020ff",
          "#0040ff",
          "#0080ff",
          "#009fff",
          "#00bfff",
          "#00ffff",
        ],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    layout: {
      padding: 0,
    },
  },
});

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
  if (expenses[selectedMonth].length === 0) {
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
    emptyState.innerHTML = "";
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

  barChartData = Object.values(expenses).map((expense) =>
    expense.reduce((acc, cur) => acc + cur.amount, 0)
  );

  pieChartData = categories.map((category) => {
    return expenses[selectedMonth].reduce((acc, cur) => {
      if (cur.category === category) {
        return acc + cur.amount;
      }
      return acc;
    }, 0);
  });

  pieExpenses.data.datasets[0].data = pieChartData;
  barExpenses.data.datasets[0].data = barChartData;

  pieExpenses.update();
  barExpenses.update();
}

revalidate();

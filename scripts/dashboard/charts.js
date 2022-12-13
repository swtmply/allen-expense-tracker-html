const yearlyExpensesCtx = document
  .getElementById("yearlyExpenses")
  ?.getContext("2d");
const monthlyExpensesCtx = document
  .getElementById("monthlyExpenses")
  ?.getContext("2d");

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

let yearlyExpensesChart = new Chart(yearlyExpensesCtx, {
  type: "bar",
  data: {
    labels: Object.keys(months),
    datasets: [
      {
        data: [],
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

let monthlyExpensesChart = new Chart(monthlyExpensesCtx, {
  type: "doughnut",
  data: {
    labels: Object.keys(categories),
    datasets: [
      {
        data: [],
        backgroundColor: [
          "#000",
          "#222222",
          "#434343",
          "#4D4D4D",
          "#6B6B6B",
          "#858585",
          "#A3A3A3",
        ],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: "right",
      },
    },
    layout: {
      padding: 0,
    },
  },
});

export const createCharts = (expenses, currentMonth) => {
  // filter expenses by month
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseMonth = new Date(expense.date)
      .toLocaleString("en-US", { month: "short" })
      .toLocaleLowerCase();
    return expenseMonth === currentMonth;
  });

  // create pie chart
  const monthlyTotalElement = document.getElementById("monthlyTotal");
  monthlyTotalElement.innerHTML = monthlyExpenses
    .reduce((prev, curr) => prev + Number(curr.amount), 0)
    .toLocaleString("en-US");

  for (let key in categories) {
    categories[key] = monthlyExpenses.reduce((prev, curr) => {
      if (key === curr.category) {
        return prev + +curr.amount;
      }
      return prev;
    }, 0);
  }

  // update values of pie chart
  monthlyExpensesChart.data.datasets[0].data = Object.values(categories);
  monthlyExpensesChart.update();

  // create bar chart
  const yearlyTotalElement = document.getElementById("yearlyTotal");
  yearlyTotalElement.innerHTML = expenses
    .reduce((prev, curr) => prev + Number(curr.amount), 0)
    .toLocaleString("en-US");

  for (let key in months) {
    months[key] = expenses
      .filter((e) => {
        const month = new Date(e.date).toLocaleString("en-US", {
          month: "short",
        });

        return month === key;
      })
      .reduce((prev, curr) => prev + +curr.amount, 0);
  }

  // update values of bar chart
  yearlyExpensesChart.data.datasets[0].data = Object.values(months);
  yearlyExpensesChart.update();
};

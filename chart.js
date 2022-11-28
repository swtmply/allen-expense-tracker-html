const barExpensesChart = document
  .getElementById("barExpensesChart")
  .getContext("2d");
const pieExpensesChart = document
  .getElementById("pieExpensesChart")
  .getContext("2d");

const barExpenses = new Chart(barExpensesChart, {
  type: "bar",
  data: {
    labels: Object.keys(expenses),
    datasets: [
      {
        data: [
          1000, 1200, 1200, 1000, 1000, 500, 1000, 2000, 2000, 1000, 1500, 500,
        ],
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

const pieExpenses = new Chart(pieExpensesChart, {
  type: "doughnut",
  data: {
    labels: ["Food", "Transportation", "Housing", "Utilities", "Other"],
    datasets: [
      {
        data: [1000, 1200, 1200, 1000, 1000],
        backgroundColor: ["#000", "#272725", "#343432", "#4b4b48", "#5b5b57"],
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

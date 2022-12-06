import { months, categories } from "./index.js";

const yearlyExpensesChart = document
  .getElementById("yearlyExpenses")
  .getContext("2d");
const monthlyExpensesChart = document
  .getElementById("monthlyExpenses")
  .getContext("2d");

export let yearlyExpenses = new Chart(yearlyExpensesChart, {
  type: "bar",
  data: {
    labels: [],
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

export let monthlyExpenses = new Chart(monthlyExpensesChart, {
  type: "doughnut",
  data: {
    labels: [],
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

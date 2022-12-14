const monthlySpendingsCtx = document
  .getElementById("monthlySpendings")
  ?.getContext("2d");
const totalSpent = document.getElementById("totalSpent");
const monthlyRemaining = document.getElementById("monthlyRemaining");
const monthlyLimit = document.getElementById("monthlyLimit");

let monthlySpendingsChart = new Chart(monthlySpendingsCtx, {
  type: "doughnut",
  data: {
    labels: ["Total", "Remaining"],
    datasets: [
      {
        data: [],
        backgroundColor: ["#000", "#222222"],
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: 0,
    },
  },
});

export const createCharts = (transactions, currentMonth) => {
  // filter expenses by month
  const monthlySpendings = transactions.expenses
    .filter((expense) => {
      const expenseMonth = new Date(expense.date)
        .toLocaleString("en-US", { month: "short" })
        .toLocaleLowerCase();
      return expenseMonth === currentMonth;
    })
    .reduce((total, expense) => total + +expense.amount, 0);

  // Calculate percentages
  const monthlySpendingsPercentage = ((monthlySpendings / 10000) * 100).toFixed(
    1
  );
  const monthlyRemainingPercentage = (
    ((10000 - monthlySpendings) / 10000) *
    100
  ).toFixed(1);

  // Set the text in HTML
  totalSpent.innerText = Number(monthlySpendings).toLocaleString("en-US");
  monthlyLimit.innerText = Number(10000).toLocaleString("en-US");
  monthlyRemaining.innerText = Number(10000 - monthlySpendings).toLocaleString(
    "en-US"
  );

  // Update the chart
  monthlySpendingsChart.data.datasets[0].data = [
    monthlySpendingsPercentage,
    monthlyRemainingPercentage,
  ];
  monthlySpendingsChart.update();
};

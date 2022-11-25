function addExpense() {
  // get value from input
  const expenseName = document.getElementById("expenseName").value;
  const expenseAmount = document.getElementById("expenseAmount").value;
  const expenseDate = document.getElementById("expenseDate").value;

  // remove empty state from the DOM
  if (expenses[selectedMonth].length === 0) {
    expensesContainer.removeChild(emptyState);
  }

  addListItem(expenseName, expenseAmount, expenseDate);

  expenses[selectedMonth].push({
    name: expenseName ?? "No name",
    amount: parseInt(expenseAmount) ?? 0,
    date: expenseDate ?? new Date(),
  });

  calculateTotalMonthExpenses();
  closeAddExpenseDialog();
}

function addListItem(name, amount, date) {
  const listItem = document.createElement("li");
  listItem.classList.add(
    ..."flex justify-between items-center p-4 bg-white rounded shadow".split(
      " "
    )
  );
  listItem.innerHTML = `
            <div>
                <h3 class="text-xl font-bold">${name}</h3>
                <p class="text-sm text-neutral-500">${date}</p>
            </div>
            <div>
                <p class="text-xl font-bold">$${amount}</p>
            </div>
        `;

  expensesList.appendChild(listItem);
}

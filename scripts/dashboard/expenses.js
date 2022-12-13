const expenseList = document.getElementById("expenseList");
const fragment = document.createDocumentFragment();

const icons = {
  Food: "drumstick",
  Clothing: "shirt",
  Bills: "money-bill",
  Entertainment: "wand-magic-sparkles",
  Transportation: "car-side",
  Other: "tree",
};

// Create the expense list
export const createExpenseList = (expenses, month) => {
  // Clear the expense list
  expenseList.innerHTML = "";

  // Create the expense list
  expenses.forEach((expense) => {
    const expenseMonth = new Date(expense.date)
      .toLocaleString("en-US", { month: "short" })
      .toLocaleLowerCase();

    if (expenseMonth !== month) return;

    const expenseItem = document.createElement("li");
    expenseItem.innerHTML = `
       <li class="bg-white shadow-lg rounded-md p-4 flex justify-between">
         <div class="flex gap-4">
             <i class="fas fa-${icons[expense.category]} text-2xl"></i>
             <div class="flex flex-col">
             <span class="font-semibold">${expense.name}</span>
             <span class="text-sm text-gray-500">${expense.date.toLocaleString(
               "en-US"
             )}</span>
             </div>
         </div>
         <span class="font-semibold">₱ ${Number(expense.amount).toLocaleString(
           "en-US"
         )}.00</span>
       </li>
    `;
    fragment.appendChild(expenseItem);
  });

  expenseList.appendChild(fragment);
};

export const addToExpenseList = (expense) => {
  const expenseItem = document.createElement("li");
  expenseItem.innerHTML = `
     <li class="bg-white shadow-lg rounded-md p-4 flex justify-between">
       <div class="flex gap-4">
           <i class="fas fa-${icons[expense.category]} text-2xl"></i>
           <div class="flex flex-col">
           <span class="font-semibold">${expense.name}</span>
           <span class="text-sm text-gray-500">${expense.date.toLocaleString(
             "en-US"
           )}</span>
           </div>
       </div>
       <span class="font-semibold">₱ ${Number(expense.amount).toLocaleString(
         "en-US"
       )}.00</span>
     </li>
  `;
  fragment.appendChild(expenseItem);
  expenseList.appendChild(fragment);
};

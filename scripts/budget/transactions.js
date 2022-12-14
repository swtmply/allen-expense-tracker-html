import { icons } from "../index.js";

const transactionList = document.getElementById("transactionList");
const fragment = document.createDocumentFragment();

const transactionContent = (transaction) => `
        <li class="bg-white shadow-lg rounded-md p-4 flex justify-between">
         <div class="flex gap-4">
             <i class="fas fa-${icons[transaction.category]} text-2xl"></i>
             <div class="flex flex-col">
             <span class="font-semibold">${transaction.name}</span>
             <span class="text-sm text-gray-500">${transaction.date.toLocaleString(
               "en-US"
             )}</span>
             </div>
         </div>
         <span class="font-semibold ${
           transaction.type === "expenses" ? "text-red-500" : "text-green-500"
         }">₱ ${Number(transaction.amount).toLocaleString("en-US")}.00</span>
       </li>
`;

export const createtransactionList = (transactions, month) => {
  // Clear the expense list
  transactionList.innerHTML = "";

  // Create the expense list
  transactions.forEach((transaction) => {
    const transactionMonth = new Date(transaction.date)
      .toLocaleString("en-US", { month: "short" })
      .toLocaleLowerCase();

    if (transactionMonth !== month) return;

    const transactionItem = document.createElement("li");
    transactionItem.innerHTML = transactionContent(transaction);
    fragment.appendChild(transactionItem);
  });

  transactionList.appendChild(fragment);
};

export const addToTransactionList = (transaction) => {
  const transactionItem = document.createElement("li");
  transactionItem.innerHTML = transactionContent(transaction);

  fragment.appendChild(transactionItem);
  transactionList.appendChild(fragment);
};

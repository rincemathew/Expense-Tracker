const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const form_expense = document.getElementById('form-expense');
const amount = document.getElementById('amount');

const dummyTransactions = [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }
];

let transactions = dummyTransactions;

function addTransaction(e) {
  e.preventDefault();
  if (form_expense.value.trim() ==='' || amount.value.trim() === ''){
    alert('Please add a text and amound')
  } else {
    const transaction = {
      id: generateID(),
      text: form_expense.value,
      amount: +amount.value
    };
    console.log(transaction)
    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    form_expense.value = '';
    amount.value = '';
  }

}


function generateID() {
  return Math.floor(Math.random() * 100000000)
}


function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
  
    const item = document.createElement('li');
  
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');
  
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}
      </span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;
  
    list.appendChild(item);
  }

function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);
  console.log(amounts)
  const total = amounts.reduce((acc, item)=> (acc += item), 0).toFixed(2);
  console.log(total)
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  console.log(income)
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
  console.log(expense)

  balance.innerHTML =  `₹${total}`;
  money_plus.innerHTML =  `₹${income}`;
  money_minus.innerHTML =  `₹${expense}`;
}


function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  init()
}


function init() {
    list.innerHTML = '';
  
    transactions.forEach(addTransactionDOM);
    updateValues();
  }
  
init();

form.addEventListener('submit', addTransaction)


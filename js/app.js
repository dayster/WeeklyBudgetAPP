// Classes
class Budget{
    constructor(budget){
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }

    substractFromBudget(amount){
        return this.budgetLeft -= amount;
    }
}
// Everything Related HTML

class HTML{
    insertBudget(amount){
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }
    printMessage(message, className){
       const messageDiv = document.createElement('div');
       messageDiv.classList.add('text-center', 'alert', className);
       messageDiv.appendChild(document.createTextNode(message));

       document.querySelector('.primary').insertBefore(messageDiv, addExpenseForm);

       setTimeout(function(){
           document.querySelector('.primary .alert').remove();
           addExpenseForm.reset();
       },3000);
    }

    addExpenseToList(name, amount){
        const expensesList = document.querySelector('#expenses ul');

        // Create Li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-item-center';
        // Insert
        li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill">$ ${amount}</span>
        `;

        expensesList.appendChild(li);
    }

    trackBudget(amount){
        const budgetLeftDollars = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;

        if((budget.budget / 4) > budgetLeftDollars){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        }else if((budget.budget / 2) > budgetLeftDollars){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}

// Variables
const addExpenseForm = document.querySelector('#add-expense'),
      budgetTotal = document.querySelector('span#total'),
      budgetLeft = document.querySelector('span#left');

let budget, userBudget;

//Instance the html class
const html = new HTML();

// Events Listeners
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', function(){
        userBudget = prompt('What\'s your budget');
        if(userBudget === null || userBudget === '' || userBudget === ''){
            window.location.reload();
        }else{
            budget = new Budget(userBudget);
            html.insertBudget(budget.budget);
        }
    });

    addExpenseForm.addEventListener('submit', function(e){
        e.preventDefault();
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === ''){
            html.printMessage('There are error, all the fields are mandatory', 'alert-danger');
        }else{
            html.trackBudget(amount);
            html.addExpenseToList(expenseName, amount);
            html.printMessage('Add...', 'alert-success');
        }
    });
}
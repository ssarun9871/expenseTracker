onStart();
var amount = document.getElementById('amt');
var description = document.getElementById('desc');
var category = document.getElementById('category');
let btn = document.getElementById('submit');
let display = document.getElementById('display');
btn.addEventListener('click', addExpense);

async function onStart() {
    let res  = await axios.get('https://crudcrud.com/api/9b833b9c18614580ade7a4aa3a4a6069/data')
       
    for (let i = 0; i < res.data.length; i++) {
        let id = res.data[i]._id;
        let exp = `${res.data[i].amount}-${res.data[i].description}-${res.data[i].category}`;
        displayOnScreen(id, exp)
    }
}


async function addExpense(e) {
    e.preventDefault();

    let obj = {
        amount: amount.value,
        description: description.value,
        category: category.value
    };
    let exp = `${amount.value}-${description.value}-${category.value}`;

    const res= await axios.post('https://crudcrud.com/api/9b833b9c18614580ade7a4aa3a4a6069/data', obj)
    displayOnScreen(res.data._id, exp);
}


function displayOnScreen(id, expense) {
    let p = `<li id="${id}">${expense}  <button onClick="deleteExpense('${id}')">Delete Expense</button>  <button onClick = "editExpense('${id}')">Edit Expense</button></li>`;
    display.innerHTML = display.innerHTML + p;
}


function deleteExpense(id) {
    let elementToRemove = document.getElementById(id);
    elementToRemove.remove();
    return axios.delete(`https://crudcrud.com/api/9b833b9c18614580ade7a4aa3a4a6069/data/${id}`)
}


async function editExpense(id) {
    let res = await axios.get(`https://crudcrud.com/api/9b833b9c18614580ade7a4aa3a4a6069/data/${id}`)

    let amt = res.data.amount;
    let des = res.data.description;
    let cat = res.data.category;

    amount.value = amt,
    description.value = des,
    category.value = cat;

    deleteExpense(id)
}
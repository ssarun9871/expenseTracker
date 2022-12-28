onStart();
var amount = document.getElementById('amt');
var description = document.getElementById('desc');
var category = document.getElementById('category');
let btn = document.getElementById('submit');
let display = document.getElementById('display');
btn.addEventListener('click', addExpense);


function addExpense(e) {
    e.preventDefault();

    let obj = {
        amount: amount.value,
        description: description.value,
        category: category.value
    };
    let exp = `${amount.value}-${description.value}-${category.value}`;
    console.log(exp);

    axios.post('https://crudcrud.com/api/659b68585873408da7365aeb563c75f6/data', obj)
        .then(res => {
            displayOnScreen(res.data._id, exp);
        })

}


function onStart() {
    axios.get('https://crudcrud.com/api/659b68585873408da7365aeb563c75f6/data')
        .then(res => {
            for (let i = 0; i < res.data.length; i++) {
                let id = res.data[i]._id;
                let exp = `${res.data[i].amount}-${res.data[i].description}-${res.data[i].category}`;
                displayOnScreen(id, exp)
            }
        });
}



function displayOnScreen(id, expense) {
    let p = `<li id="${id}">${expense}  <button onClick="deleteExpense('${id}')">Delete Expense</button>  <button onClick = "editExpense('${id}')">Edit Expense</button></li>`;
    display.innerHTML = display.innerHTML + p;
}




function deleteExpense(id) {
    let elementToRemove = document.getElementById(id);
    elementToRemove.remove();
    return axios.delete(`https://crudcrud.com/api/659b68585873408da7365aeb563c75f6/data/${id}`)
}


function editExpense(id) {
    axios.get(`https://crudcrud.com/api/659b68585873408da7365aeb563c75f6/data/${id}`)
        .then(res => {
            let amt = res.data.amount;
            let des = res.data.description;
            let cat = res.data.category;

            amount.value = amt,
                description.value = des,
                category.value = cat;
        })
        .then(deleteExpense(id))
}
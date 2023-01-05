
let login = document.getElementById('login');
login.addEventListener('click',loginFunction);

function loginFunction(event){
event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('pwd').value;
    let credential = {
        email: email,
        password:password
    }

axios.post('http://localhost:3000/login',credential)
.then(res=>console.log(res.data))
.catch(err=> console.log(err.response.data))
}
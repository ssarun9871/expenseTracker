document.getElementById("reset_password").addEventListener('click',reset);

function reset(event){
    event.preventDefault();
    let emailid = document.getElementById('email').value
    console.log(emailid);
    axios.post('http://localhost:3000/password/forgotpassword',{email:emailid});
}

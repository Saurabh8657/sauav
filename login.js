// login.js

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem('jwtToken', data.token);
            setTimeout(() => {
                console.log('Token:', localStorage.getItem('jwtToken'));
                window.location.href = 'adminDashboard.html';
            }, 100); 
        } else {
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch(error => console.error('Error:', error));
}

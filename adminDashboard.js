// adminDashboard.js

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:3000/destinations', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        },
    })
    .then(response => response.json())
    .then(data => {
        const destinationsList = document.getElementById('destinationsList');
        destinationsList.innerHTML = JSON.stringify(data, null, 2);
    })
    .catch(error => console.error('Error:', error));
});

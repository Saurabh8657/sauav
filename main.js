
const baseURL = 'http://localhost:3000/';

async function fetchAndDisplayDestinations() {
    try {
        const response = await fetch(baseURL + 'destinations');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const destinations = await response.json();
        console.log(destinations);
        displayDestinations(destinations);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayDestinations(destinations) {
    const destinationList = document.getElementById('destinationList');

    destinationList.innerHTML = '';

    destinations.forEach(destination => {
        const destinationItem = document.createElement('div');
        destinationItem.innerHTML = `<p>${destination.city}, ${destination.country}</p>`;

        const image = document.createElement("img");
        image.src = destination.imageURL ;
        destinationItem.append(image);
        destinationList.appendChild(destinationItem);
    });
}

fetchAndDisplayDestinations();

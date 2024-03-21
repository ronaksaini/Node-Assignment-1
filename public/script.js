// Function to fetch and display all data
function fetchDataAndDisplay() {
    fetch('/data')
    .then(response => response.json())
    .then(data => {
        // Clear existing content
        document.getElementById('data').innerHTML = '';
        // Append each data entry to the page
        data.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.innerHTML = `<b>First Name:</b> ${entry.firstName}<br><b>Last Name:</b>  ${entry.lastName}<br><b>Contact:</b>  ${entry.mobileNo}<br><b>E-mail: </b> ${entry.email}<br><b>Address: </b> ${entry.street},${entry.city},${entry.state},${entry.country}<br><b>Login ID:</b>  ${entry.loginId}<br><b>Password: </b> ${entry.password}`;
            document.getElementById('data').appendChild(entryElement);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Add event listener only when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('myForm').addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(this);
        var jsonData = {};
        formData.forEach(function(value, key) {
            jsonData[key] = value;
        });
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            // Display the inserted data on the page
            // document.getElementById('response').innerText = `Data inserted successfully:\nName: ${data.name}, Email: ${data.email}`;
            // Fetch and display all data again after submission
            fetchDataAndDisplay();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Fetch and display all data initially
    fetchDataAndDisplay();
});


function toggleContent() {
    var content = document.getElementById("data");
    var button = document.getElementById("toggleButton");
  
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        button.textContent = "Hide All";
    } else {
        content.style.display = "none";
        button.textContent = "Show All";
    }
}

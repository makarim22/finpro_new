<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <title>Find Nearest Parking</title>  
</head>  
<body>  
    <h1>Find Nearest Parking Locations</h1>  
    <form id="locationForm">  
        <input type="text" id="address" placeholder="Enter your location" required />  
        <button type="submit">Find Parking</button>  
    </form>  
    
    <div id="results"></div>  

    <script>  
        document.getElementById('locationForm').addEventListener('submit', async (e) => {  
            e.preventDefault();  
            const address = document.getElementById('address').value;  
            const response = await fetch(`/find-nearest?address=${encodeURIComponent(address)}`);  
            const data = await response.json();  
            
            // Display results - customize this according to your needs  
            const resultsDiv = document.getElementById('results');  
            resultsDiv.innerHTML = JSON.stringify(data.nearbyParkingLots);  
        });  
    </script>  
</body>  
</html>
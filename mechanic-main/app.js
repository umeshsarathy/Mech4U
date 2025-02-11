// const clientDetails = document.getElementById("clientDetails");

async function fetchData() {
    try {

        const clientDetails = document.getElementById("clientDetails");


        const response = await fetch("http://localhost:3000/clients"); // Request from backend
        const documents = await response.json();
        console.log("Documents:", documents);

        // clientDetails.innerHTML = "";
        documents.forEach((client) => {
            const div = document.createElement("div");
            div.className = "client-card";
            div.innerHTML = `
                <div class="client-info">
                    <p><strong>Name:</strong> ${client.clientName}</p>
                    <p><strong>Phone:</strong> ${client.clientPhone}</p>
                    <p><strong>Vehicle:</strong> ${client.vehicle}</p>
                    <p><strong>License Plate:</strong> ${client.license}</p>
                    <p><strong>Problem:</strong> ${client.problem}</p>
                    <p><strong>Latitude:</strong> ${client.lat}</p>
                    <p><strong>Longitude:</strong> ${client.long}</p>
                </div>
                <button onclick="okclicked('${client.clientName}','${client.clientPhone}','${client.lat}','${client.long}')">OK</button>
            `;
            clientDetails.appendChild(div);
        });

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
async function okclicked(clientname,clientphone,clientlat,clientlong){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                localStorage.setItem("latitude", position.coords.latitude);
                localStorage.setItem("longitude", position.coords.longitude);
                 
            },
            () => {
                alert("❌ Location access denied. Unable to find a mechanic.");
            }
        );
    } else {
        alert("❌ Geolocation is not supported on this device.");
    }
    let lat = localStorage.getItem("latitude");
    let long = localStorage.getItem("longitude");
    let mechname= localStorage.getItem("mechName");
    let mechphone= localStorage.getItem("mechPhone");
    console.log(mechname);
    console.log(mechphone);
    console.log(clientname);

    let response = await fetch("http://localhost:3000/save1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientname,mechname,mechphone,lat,long})
    });

    let result = await response.json();
    alert(result.message);

    localStorage.setItem("ClientName",clientname);
    localStorage.setItem("ClientPhone",clientphone);
    localStorage.setItem("ClientLat",clientlat);
    localStorage.setItem("ClientLong",clientlong);

    window.location.href="searching.html";



}

window.onload = fetchData;

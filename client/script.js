//const { json } = require("express");

document.addEventListener("DOMContentLoaded", function () {
    const clientName = localStorage.getItem("clientName") || "Guest";
    const clientPhone = localStorage.getItem("clientPhone") || "Unknown";

    const clientInfo = document.getElementById("client-info");
    if (clientInfo) {
        clientInfo.innerHTML = `<strong>Name:</strong> ${clientName} <br> <strong>Phone:</strong> ${clientPhone}`;
    }

    const issueForm = document.getElementById("issueForm");
    if (issueForm) {
        issueForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            const vehicle = document.getElementById("vehicle").value.trim();
            const license = document.getElementById("license").value.trim();
            const problem = document.getElementById("problem").value.trim();

            if (!vehicle || !license || !problem) {
                alert("Please fill out all fields before submitting.");
                return;
            }

            localStorage.setItem("vehicle", vehicle);
            localStorage.setItem("license", license);
            localStorage.setItem("problem", problem);

            // Get the user's location and redirect to the map page
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        localStorage.setItem("latitude", position.coords.latitude);
                        localStorage.setItem("longitude", position.coords.longitude);
                         
                        
                        // window.location.href = "searching.html";
                    },
                    () => {
                        alert(" Location access denied. Unable to find a mechanic.");
                    }
                );
            } else {
                alert(" Geolocation is not supported on this device.");
            }
            let lat = localStorage.getItem("latitude");
            let long = localStorage.getItem("longitude");
            let response = await fetch("http://localhost:3000/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ clientName,clientPhone,vehicle,license,problem,lat,long })
            });
            
                // const query = { clientname: clientName }; // Modify your search criteria

                // try {
                //     const response = await fetch("http://localhost:3000/search", {
                //     method: "POST",
                //     headers: { "Content-Type": "application/json" },
                //     body: JSON.stringify(query),
                //     });

                //     const data = await response.json();
                //     console.log("Search Results:", data[0].mechname);
                //     localStorage.setItem("mechname",data[0].mechname);
                    
                    
                // } catch (error) {
                //     console.error("Error:", error);
                // }
            
            
            
            let result = await response.json();
            alert(result.message);

            window.location.href = "searching.html"
            

        });
    }
});

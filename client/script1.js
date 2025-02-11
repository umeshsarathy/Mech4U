async function sendOTP() {
    const phoneNumber = document.getElementById("phone").value;

    const response = await fetch("http://localhost:3000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber })
    });

    const data = await response.json();
    console.log("OTP Sent:", data);
}

// ✅ Verify OTP
async function verifyOTP() {
    const phoneNumber = document.getElementById("phone").value;
    const otp = document.getElementById("otp").value;

    const response = await fetch("http://localhost:3000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp })
    });

    const data = await response.json();
    console.log("OTP Verified:", data);
}
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
// const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Serves frontend files

// MongoDB Connection
const uri = "mongodb://localhost:27017/Nexathon'25"; // Fixed URI (removed single quote)
const client = new MongoClient(uri);
const dbName = "Nexathon";

async function connectDB() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }
    return client.db(dbName).collection("problem-details");
}

async function connectDB1() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect();
    }

    return client.db(dbName).collection("mechanic-requests");
}

// API to Write Data
app.post("/save", async (req, res) => {
    try {
        const collection = await connectDB();
        await collection.insertOne(req.body);
        res.json({ message: "Data saved!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving data", error });
    }
});

//API to Read Data
app.get("/clients", async (req, res) => {
    try {
        const collection = await connectDB();
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});

//API to write mechanic-requests
app.post("/save1", async (req, res) => {
    try {
        const collection = await connectDB1();
        
        await collection.insertOne(req.body);
        res.json({ message: "Data saved!" });
    } catch (error) {
        res.status(500).json({ message: "Error saving data", error });
    }
});

//API to read mechanic-requests
app.get("/clients1", async (req, res) => {
    try {
        const collection = await connectDB1();
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
});


app.post("/search", async (req, res) => {
    try {
        const collection = await connectDB1();// Replace with your collection name
  
      const query = req.body; // Expect query from frontend
      const result = await collection.find(query).toArray();
  
      res.json(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await client.close();
    }
  });




  const API_KEY = "YOUR_APYHUB_API_KEY"; // Replace with your actual API key

  // Aadhaar Verification API Endpoint
  app.post("/verify-aadhaar", async (req, res) => {
      const { aadhaarNumber } = req.body;
  
      if (!aadhaarNumber || aadhaarNumber.length !== 12) {
          return res.status(400).json({ message: "Invalid Aadhaar Number" });
      }
  
      try {
          const response = await axios.post(
              "https://api.apyhub.com/validate/aadhaar",
              { aadhaar: aadhaarNumber },
              { headers: { "apy-token": API_KEY, "Content-Type": "application/json" } }
          );
  
          res.json(response.data);
      } catch (error) {
          console.error("Verification failed:", error.response ? error.response.data : error);
          res.status(500).json({ message: "Verification failed", error: error.response ? error.response.data : error });
      }
  });



// **Start Server on Port 3000**
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

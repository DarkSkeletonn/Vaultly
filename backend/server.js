const express = require("express");

const memoryRoutes = require("./routes/memoryRoutes");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use("/memories", memoryRoutes);

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
    res.send("Vaultly Backend Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
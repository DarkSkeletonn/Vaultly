const express = require("express");

require("./database/initDatabase");

const itemRoutes = require("./routes/itemRoutes");

const tagRoutes = require("./routes/tagRoutes");

const folderRoutes = require("./routes/folderRoutes");

const app = express();

app.use(express.json());

app.use("/items", itemRoutes);

app.use("/tags", tagRoutes);

app.use("/folders", folderRoutes);

app.get("/", (req, res) => {
    res.send("Vaultly Backend Running");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
const Database = require("better-sqlite3");

const db = new Database("../database/vaultly.db");

module.exports = db;
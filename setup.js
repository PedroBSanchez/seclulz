require("dotenv").config();

const fs = require("fs");
const path = require("path");

const jsonFilePath = path.join(__dirname, "config.json");
let config = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));

if (process.env.TOKEN) config.token = process.env.TOKEN;
if (process.env.APPLICATION_ID) config.clientId = process.env.APPLICATION_ID;

fs.writeFileSync(jsonFilePath, JSON.stringify(config, null, 2));

console.log("✅ config.json successfully updated!");

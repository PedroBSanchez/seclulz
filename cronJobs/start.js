const dollarCronJob = require("./dollar");
const bitcoinCronJob = require("./bitcoin");

const startCronJobs = (client) => {
  dollarCronJob(client);
  bitcoinCronJob(client);
};

module.exports = startCronJobs;

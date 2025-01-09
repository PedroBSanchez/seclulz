const dollarCronJob = require("./dollar");

const startCronJobs = (client) => {
  dollarCronJob(client);
};

module.exports = startCronJobs;

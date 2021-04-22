const Enum = require("enum");

const TASK_STATUS = {
  BACKLOG: "BACKLOG",//Default Status
  READY: "READY", //Developer
  IN_PROGRESS: "IN_PROGRESS", //Developer
  PEER_REVIEW: "PEER_REVIEW", // Developer
  TESTING: "TESTING", // Developer
  DONE: "DONE", //Tester
  RESOLVED: "RESOLVED", //Project manager
  DEPLOYED: "DEPLOYED",//Project manager
  CANCELLED: "CANCELLED",
};
Object.freeze(TASK_STATUS);

module.exports = { TASK_STATUS };

const Enum = require("enum");

const TASK_STATUS = {
  BACKLOG: "BACKLOG",
  READY: "READY",
  ON_GOING: "ON_GOING",
  PEER_REVIEW: "PEER_REVIEW",
  TESTING: "TESTING",
  COMPLETED: "COMPLETED",
  RESOLVED: "RESOLVED",
};
Object.freeze(TASK_STATUS);

module.exports = { TASK_STATUS };

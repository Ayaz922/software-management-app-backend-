const enums = require("../utils/enums");
//Permissions for Tasks
//Add Tasks
const addTaskPermission = (req, res, next) => {
    if (req.user.userType === "PROJECT_MANAGER" || req.user.userType === "ADMIN")
        next();
    else
        res.sendStatus(403);
};
// Update Tasks
const updateTaskPermission = (req, res, next) => {
    if (req.user.userType === "PROJECT_MANAGER")
        next();
    else
        res.sendStatus(403);
};
/**
 * This middleware decides whether the given user can assign the task or not
 * Rules
 * 1. If assignee is same as user assigning the project (Assign to self), then anyone can assign
 * 2. If assignee is different than user assigning the project(Assign to other), the PM and ADMIN can have permission
 */
const assignUserPermission = (req, res, next) => {
    if (req.body.username === req.user.username)
        next();
    else if (req.user.userType === 'ADMIN' || req.user.userType === 'PROJECT_MANAGER')
        next();
    else
        res.status(403).send("You can't assign the task to others");
};
/**
 * This middleware decides whether the given user have permission to change status of the task
 * Permission rule is as follows
 * 1. Developer can change the status to READY, IN_PROGRESS, "PEER_REVIEW", "TESTING"
 * 2. Tester can change the status to DONE
 * 3. Manager can change the status to DEPLOYED, CANCELLED or BACKLOG (in case of any review)
 */
const changeStatusPermission = (req, res, next) => {
    //Check if status is valid
    if (!req.body.status || !enums.TASK_STATUS.hasOwnProperty(req.body.status))
        return res.status(400).send("Please enter valid Task status");
    const status = req.body.status;
    const userType = req.user.userType;
    projectManagerPermissions = ["DEPLOYED", "CANCELLED", "BACKLOG"];
    developerPermissions = ["READY", "IN_PROGRESS", "PEER_REVIEW", "TESTING"];
    if (userType === "DEVELOPER" && developerPermissions.includes(status))
        next();
    else if (userType === "TESTER" && status == "DONE")
        next();
    else if (userType === "PROJECT_MANAGER" &&
        projectManagerPermissions.includes(status))
        next();
    else
        res.sendStatus(403);
};
// Delete Tasks
const deleteTaskPermission = (req, res, next) => {
    if (req.user.userType === "PROJECT_MANAGER")
        next();
    else
        res.sendStatus(403);
};
module.exports = {
    addTaskPermission,
    updateTaskPermission,
    changeStatusPermission,
    deleteTaskPermission,
    assignUserPermission
};

//Permissions for projects

//  Add project
const addProjectPermission = (req, res, next) => {
  if (req.user.userType === "PROJECT_MANAGER" || req.user.userType === "ADMIN")
    next();
  else res.sendStatus(403);
};
//  View projects
const viewAllProjectPermission = (req, res, next) => {
  if (req.user.userType === "PROJECT_MANAGER" || req.user.userType === "ADMIN")
    next();
  else res.sendStatus(403);
};

// Update projects
const updateProjectPermission = (req, res, next) => {
  if (req.user.userType === "PROJECT_MANAGER" || req.user.userType === "ADMIN")
    next();
  else res.sendStatus(403);
};
// Update all projects
const assignProjectManagerPermission = (req, res, next) => {
  if (req.user.userType === "PROJECT_MANAGER" || req.user.userType === "ADMIN")
    next();
  else res.sendStatus(403);
};
// Delete project
const deleteProjectPermission = (req, res, next) => {
  if (req.user.userType !== "ADMIN") return res.sendStatus(403);
  next();
};

module.exports = {
  addProjectPermission,
  assignProjectManagerPermission,
  viewAllProjectPermission,
  updateProjectPermission,
  deleteProjectPermission,
};

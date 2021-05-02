const userCRUDPermission = (req, res, next) => {
    if (req.user.userType === 'ADMIN')
        next();
    else
        res.sendStatus(403);
};
const assignProjectPermission = (req, res, next) => {
    if (req.user.userType === 'ADMIN' || req.user.userType === 'PROJECT_MANAGER')
        next();
    else
        res.sendStatus(403);
};
module.exports = {
    userCRUDPermission,
    assignProjectPermission
};

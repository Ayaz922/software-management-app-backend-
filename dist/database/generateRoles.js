const RoleSchema = require("../models/roles");
const createRoles = () => {
    console.log("Creating roles");
    let role = new RoleSchema({
        roleId: "ADMIN",
        roleName: "Administrator",
    });
    role.save();
    role = new RoleSchema({
        roleId: "PROJECT_MANAGER",
        roleName: "Project Manager",
    });
    role.save();
    role = new RoleSchema({
        roleId: "DEVELOPER",
        roleName: "Developer",
    });
    role.save();
    role = new RoleSchema({
        roleId: "TESTER",
        roleName: "Tester",
    });
    role.save();
    role = new RoleSchema({
        roleId: "SUPER_ADMIN",
        roleName: "Super Admin",
    });
    role.save();
    console.log("Roles created successfully");
};
module.exports = {
    createRoles,
};

const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateToken, adminAccessRequired, setUserData } = require("../authMiddlewares");
const router = express.Router();
const ProjectModel = require("../models/project");
const { viewAllProjectPermission, addProjectPermission, updateProjectPermission, deleteProjectPermission } = require("../permissions/project-permissions");

//Get all the tasks
router.get("/", viewAllProjectPermission, async (req, res) => {
  try {
    const allProjects = await ProjectModel.find().sort("-_id");
    res.json(allProjects);
  } catch (err) {
    sendError(400, { message: err }, res);
  }
});

router.get("/myprojects", setUserData, async (req, res) => {
  
  try {
    if (req.user_data.assignedProjects) {
      myProjects = await ProjectModel.find()
        .where("_id")
        .in(req.user_data.assignedProjects)
        .exec();
      res.send(myProjects);
    } else res.send("No project assigned to you");
  } catch (err) {
    sendError(400, { message: err }, res);
  }

});

// Need to implement some validation to avoid crash, need to implement the situation in which no id is matched
router.get("/:id", async (req, res) => {
  if (!req.params.id) return sendError(400, "Error: Please provide id", res);

  try {
    const projectById = await ProjectModel.findById(req.params.id);
    res.json(projectById);
  } catch (err) {
    sendError(404, { message: err }, res);
  }
});

//Add new project
router.post("/", addProjectPermission, async (req, res) => {
  if (!req.body.projectName)
    return sendError(400, "Error: Please provide projectname", res);

  const project = new ProjectModel({
    ...req.body,
  });

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (err) {
    sendError(404, { message: err }, res);
  }
});

//Update task's title and description
router.put("/:id",updateProjectPermission,  async (req, res) => {
  if (!req.params.id) return sendError(400, "Error: Please provide id", res);

  if (!req.body) return sendError(400, "Body is missing", res);

  try {
    const updatedProjectMessage = await ProjectModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ...req.body,
        },
      }
    );
    if (updatedProjectMessage.ok == 1) {
      //Send back update task to the user
      const updateProject = await ProjectModel.findById(req.params.id);
      return res.json(updateProject);
    } else res.json(updatedProjectMessage);
  } catch (err) {
    sendError(404, { message: err }, res);
  }
});

//Delete task
router.delete("/:id", deleteProjectPermission, async (req, res) => {
  if (!req.params.id) {
    return sendError(400, "Error: Please provide id", res);
  }

  try {
    const deleteMessage = await ProjectModel.deleteOne({ _id: req.params.id });
    res.json(deleteMessage);
  } catch (err) {
    sendError(404, { message: err }, res);
  }
});

function sendError(statusCode, message, res) {
  console.log(message);
  res.status(statusCode);
  return res.send(message);
}

module.exports = router;

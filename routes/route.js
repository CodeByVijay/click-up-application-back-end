import { createNewTask,getAllTasks,getTask,taskStatusChange } from "../controller/TaskController.js";
import {
  Register,
  Login,
  UserList,
  StoreProject,
  getAllProjects,
  getSingleProject
} from "../controller/UserController.js";
import express, { json } from "express";
const router = express.Router();

router.post("/api/register", Register);
router.post("/api/login", Login);
router.get("/api/user-list", UserList);
router.post("/api/store-project", StoreProject);
router.get("/api/all-projects", getAllProjects);
router.post("/api/project", getSingleProject);
router.post("/api/create-task", createNewTask);
router.get("/api/all-tasks", getAllTasks);
router.get("/api/task/:id", getTask);
router.post("/api/task-status-change", taskStatusChange);

router.all("*", (req, res) => {
  res.status(200).json({ result: "failed", msg: "url not found." });
});
export default router;

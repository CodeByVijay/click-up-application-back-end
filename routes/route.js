import {
  Register,
  Login,
  UserList,
  StoreProject,
  getAllProjects,
  getSingleProject,createNewTask
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

router.all("*", (req, res) => {
  res.status(200).json({ result: "failed", msg: "url not found." });
});
export default router;

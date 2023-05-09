import { storeComment } from "../controller/CommentController.js";
import { StoreProject, getAllProjects, getSingleProject,verifyInviteAndAddMember,inviteMember,removeProjectMember,updateProject,deleteProject} from "../controller/ProjectController.js";
import { createNewTask,getAllTasks,getTask,taskStatusChange,assignTask } from "../controller/TaskController.js";
import {
  Register,
  Login,
  UserList,
} from "../controller/UserController.js";
import express, { json } from "express";
const router = express.Router();

router.post("/api/register", Register);
router.post("/api/login", Login);

router.get("/api/user-list", UserList);

router.post("/api/store-project", StoreProject);
router.get("/api/all-projects", getAllProjects);
router.post("/api/project", getSingleProject);
router.post("/api/edit-project", updateProject);
router.get("/api/delete-project/:id", deleteProject);


router.post("/api/create-task", createNewTask);
router.get("/api/all-tasks", getAllTasks);
router.get("/api/task/:id", getTask);
router.post("/api/task-status-change", taskStatusChange);
router.post("/api/task-assign", assignTask);

router.post("/api/invite-new-member", inviteMember);
router.post("/api/verify-invite", verifyInviteAndAddMember);
router.post("/api/remove-project-member", removeProjectMember);

// Comments
router.post("/api/store-comment",storeComment)

router.all("*", (req, res) => {
  res.status(200).json({ result: "failed", msg: "url not found." });
});
export default router;

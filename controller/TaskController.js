import db_conn from "../connection.js";
import { taskMail } from "../mailTemplate/taskMail.js";
// import { mailTransporter } from "./mailSetting.js";

export const createNewTask = (req, res) => {
  const {
    task_name,
    task_desc,
    task_assign,
    task_assign_to,
    project_id,
    exp_date_time,
    task_assign_user_name,
    task_assign_to_user_name,
    project_name,
  } = req.body;

  try {
    const saveProject =
      "INSERT INTO `tasks`(project_id,assign_user_id,assign_to_user_id,task_name,description,expected_date_time) VALUES(?,?,?,?,?,?)";
    db_conn.query(
      saveProject,
      [
        project_id,
        task_assign,
        task_assign_to,
        task_name,
        task_desc,
        exp_date_time,
      ],
      (err, result) => {
        if (err) throw err;
        taskMail(req.body);
        return res
          .status(200)
          .json({ result: "success", msg: "Task Successfully Created." });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getAllTasks = (req, res) => {
  try {
    const getTask = "SELECT id,task_name,expected_date_time,status FROM tasks";
    db_conn.query(getTask, (err, result) => {
      if (err) throw err;
      return res.status(200).json({ result: result, msg: "Task fetched." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getTask = (req, res) => {
  try {
    const taskId = req.params.id;
    const getTask =
      "SELECT t.id as task_id, t.task_name, t.expected_date_time, t.status,t.description as task_desc, tu.name as assignTo, u.name as assignFrom,p.project_name,p.description as project_desc,p.members as project_members,p.status as project_status, pu.name as project_manager FROM tasks t INNER JOIN projects p ON t.project_id = p.id INNER JOIN users u ON t.assign_user_id = u.id INNER JOIN users tu ON t.assign_to_user_id = tu.id INNER JOIN users pu ON p.admin_id = pu.id WHERE t.id = ?";
    db_conn.query(getTask, [taskId], (err, result) => {
      if (err) throw err;
      return res.status(200).json({ result: result, msg: "Task fetched." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const taskStatusChange =(req,res)=>{
  const {task_id,status} = req.body
  try {
    const statusChange =
      "UPDATE tasks SET status=? WHERE id =?";
    db_conn.query(statusChange, [status,task_id], (err, result) => {
      if (err) throw err;
      return res.status(200).json({ result: result, msg: "Task status changed." });
    });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
  // console.log(req.body)

}

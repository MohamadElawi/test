const express = require("express");

const router = express.Router();
const {
  AddTask,
  Tasks,
  DeleteTask,
  EditTask,

  GetTask,
} = require("../controllers/task.controller");
router.get("/", Tasks);
router.get("/:id", GetTask);
router.post("/create", AddTask);
router.delete("/delete/:id", DeleteTask);
router.put("/edit/:id", EditTask);

module.exports = router;

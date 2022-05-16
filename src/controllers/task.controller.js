const taskModel = require("../models/task.model");

const moment = require("moment");

const Tasks = async (req, res) => {
  const tasks = await taskModel.find();
  try {
    res.status(200).json({
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const AddTask = async (req, res) => {
  const { title, subject } = req.body;
  try {
    if (!title || !subject) {
      return res.status(201).json({
        message: "One of the fields is missing",
      });
    }
    const newTask = new taskModel({
      title,
      subject,
      date: moment().format("MMMM Do YYYY"),
      status: "todo",
    });
    await newTask.save();
    res.status(200).json({
      message: "succes the Task added successfully ^^",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetTask = async (req, res) => {
  const _id = req.params.id;
  try {
    await taskModel.find({ _id }).then((task) => {
      if (!task)
        return res.status(404).json({
          statuscode: 404,
          message: "Task Not Found",
        });
      else
        res.status(200).json({
          data: task,
        });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const DeleteTask = async (req, res) => {
  const _id = req.params.id;
  try {
    await taskModel.findOneAndDelete({ _id }).then((task) => {
      if (!task)
        return res.status(404).json({
          statuscode: 404,
          message: "Task Not Found",
        });
      else
        res.status(200).json({
          statuscode: 200,
          message: "Delete successed",
        });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const EditTask = (req, res) => {
  const _id = req.params.id;

  try {
    taskModel
      .findOneAndUpdate({ _id }, { $set: req.body }, { new: true }, (err, doc) => {
        if (err) {
          return res.status(422).json({
            message: "Something wrong when updating data!"
          })
        }
        res.status(200).json({
          message: "Edit Succefully"
        })

      })
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  AddTask,
  Tasks,
  DeleteTask,
  GetTask,
  EditTask,

};

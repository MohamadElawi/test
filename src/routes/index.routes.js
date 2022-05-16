module.exports = (app) => {
  app.use("/api/task", require("./tasks.routes"));
};

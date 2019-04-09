"use strict";

// Routes, with inline controllers for each route.
const express = require("express");
const router = express.Router();
const Project = require("./models").Project;
const strftime = require("strftime");
const bodyParser = require("body-parser");

// Example endpoint
router.get("/create-test-project", (req, res) => {
  const project = new Project({
    title: "I am a test project"
  });
  project.save(err => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.send("Success: created a Project object in MongoDb");
  });
});
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// Part 1: View all projects
// Implement the GET / endpoint.
router.get("/", (req, res) => {
  let sort = req.query.sort;

  if (req.query.sort) {
    Project.find({}, function(err, projects){
      console.log(err);
      if(projects.contribution) {
        let total = 0;
        for (let i = 0; i < project.contribution.length; i++) {
          total += project.contribution[i].amount;
        }
        projects.sort(function(projectA, projectB) {
          let aVal = projectA[sort][total];
          let bVal = projectB[sort][total];
          if (aVal < bVal) {
            return 1;
          } else {
            return -1;
          };
        });
      } else {
      projects.sort(function(projectA, projectB) {
        let aVal = projectA[sort];
        let bVal = projectB[sort];
        if (aVal < bVal) {
          return 1;
        } else {
          return -1;
        };
      });
    }
      res.render('index', {items: projects});
    });
  } else {
    const project = new Project({
    });
    Project.find({}, (err, array) => {
      res.render('index', {items: array});
    });
  }
});

// Part 2: Create project
// Implement the GET /new endpoint
router.get("/new", (req, res) => {
  res.render("new")
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post("/new", (req, res) => {
  const project = new Project({
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    catergory: req.body.catergory,
  });
  project.save()
    .then(() => res.redirect("http://localhost:3000/"))
    .catch(err => {
      console.log(err)
      res.render("new", {err, project})
    })
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get("/project/:projectid", function(req, res) {
  Project.findById(`${req.params.projectid}`)
  .then((project) => res.render('project',{project}));
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post("/project/:projectid", function(req, res) {
  console.log(req.params.projectid)
  Project.findById(`${req.params.projectid}`)
  .then((project) => {
    //console.log("1",project);
    let obj = {name: req.body.name, amount: req.body.amount};
    project.contribution.push(obj);
    return project.save();
  })
  .then((project)=> {
    //console.log("2", project);
    let total = 0;
    for (let i = 0; i < project.contribution.length; i++) {
      total += project.contribution[i].amount;
    }

    const data = {project, percent: 100*(total/project.goal), total}
    //console.log("done", data);
    return res.render('project', data);
  })
  .catch(err => {
    console.log(err);
    res.render('project', {err})});
});


// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
router.get("/project/:projectid/edit", function(req, res) {
  Project.findById(`${req.params.projectid}`)
  .then((project) => res.render('editProject',{project}));
});
// Create the POST /project/:projectid/edit endpoint
router.post("/project/:projectid/edit", function(req, res) {
  console.log(req.params.projectid)
  Project.findByIdAndUpdate(req.params.projectid, {
    title: req.body.title,
    goal: req.body.goal,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,

  })
  .then((project.save()))
  .catch(err => {
    console.log(err);
    res.render('project', {err})});
});

module.exports = router;

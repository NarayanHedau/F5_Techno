const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

require("./Database/db");

require("./model/standard/standard.model");
require("./model/student/student.model");
require("./model/subject/subject.model");

const Standard = mongoose.model("Standard");
const Subject = mongoose.model("Subject");
const Student = mongoose.model("Student");


// Create Subject API
app.post("/create/subject", async (req, res) => {
  try {
    const result = await Subject(req.body).save();
    res.status(200).json({
      status: 200,
      message: "Subject created Successfilly",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Unable to create Subject",
    });
  }
});

// Create Standard API
app.post("/create/standard", async (req, res) => {
  try {
    const result = await Standard(req.body).save();
    res.status(200).json({
      status: 200,
      message: "Standard created Successfilly",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Unable to create Standard",
    });
  }
});

// Create Student API
app.post("/create/student", async (req, res) => {
  try {
    const result = await new Student(req.body).save();
    res.status(200).json({
      status: 200,
      message: "Student created Successfilly",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Unable to create Student",
    });
  }
});

// get Unique subject from student having standrad 8th class
app.get("/get/unique/Subject", async (req, res) => {
  try {
    let viii_stdData = await Standard.findOne({ standard: "8th std" });
    viii_stdData = await Student.find({ standard: viii_stdData._id }).populate(
      "subject"
    );
    let viii_std_ids = viii_stdData.map((e) => e.subject).flat();
    let uniqueSubject = viii_std_ids.map((item) => item.name);
    uniqueSubject = uniqueSubject.filter(
      (v) => uniqueSubject.indexOf(v) === uniqueSubject.lastIndexOf(v)
    );

    res.status(200).json({
      status: 200,
      message: "Count of students with subject Mathematics",
      data: uniqueSubject,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Unable to fetch data",
    });
  }
});
// Get count of student having Subject Math
app.get("/get/user/having/subject/maths", async (req, res) => {
  try {
    const subjectName = "Mathematics";
    let mathId = await Subject.findOne({ name: subjectName });
    let result = await Student.aggregate([
      { $match: { subject: mathId._id } },
      { $count: "studentCount" },
    ]);
    res.status(200).json({
      status: 200,
      message: "Count of students with subject Mathematics",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Unable to fetch data",
    });
  }
});

app.get("/get/standatd/having/subject/maths", async (req, res) => {
  try {
    const subjectName = "Mathematics";
    let mathId = await Subject.findOne({ name: subjectName });
    let studentData = await Student.find({ subject: mathId._id });
    let standardIds = studentData.map((ele) => ele.standard);
    let standardData = await Standard.find({ _id: standardIds });
    standardData = standardData.map((ele) => ele.standard);
    res.status(200).json({
      status: 200,
      message: "Count of students with subject Mathematics",
      data: standardData,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Unable to fetch data",
    });
  }
});

app.get("/getData/:id", async (req, res) => {
  try {
    let find = function (schema, id) {
      return schema.findOne({ _id: id });
    };
    let data = await find(Subject, req.params.id);
    res.status(200).json({
      status: 200,
      message: "Count of students with subject Mathematics",
      data: data,
    });
  } catch (error) {
    console.log("=====>>>>>", error);
    res.status(400).json({
      status: 400,
      message: "Unable to fetch data",
    });
  }
});

app.listen(3000, () => {
  console.log("Connected");
});

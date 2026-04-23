import express from "express";

const students = [
  { id: 1, name: "Ann", subject: "maths" },
  { id: 2, name: "Bob", subject: "IT" },
  { id: 3, name: "Cloe", subject: "PE" },
];

const PORT = 3300;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/students", (req, res) => {
  return res.status(200).json(students);
});

app.get("/students/:id", (req, res) => {
  const id = +req.params.id;
  const student = students.find((x) => x.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  return res.status(200).json(student);
});

app.post("/students", (req, res) => {
  const { name, subject } = req.body;

  if (!name || !subject) {
    return res.status(400).json({ message: "Name and subject are required" });
  }

  let id;
  if (students.length === 0) {
    id = 1;
  } else {
    id = students[students.length - 1].id + 1;
  }

  const student = { id, name, subject };
  students.push(student);

  return res.status(201).json(student);
});

app.put("/students/:id", (req, res) => {
  const id = +req.params.id;
  const { name, subject } = req.body;

  if (!name || !subject) {
    return res.status(400).json({ message: "Name and subject are required" });
  }

  const student = students.find((x) => x.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = name;
  student.subject = subject;

  return res.status(200).json(student);
});

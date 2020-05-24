const { StudentDataReader, TeacherDataReader } = require("./DataLayer");
const fs = require("fs");
const path = require("path");

const baseFilePath = path.join(__dirname,"../", "JSONData");

if (!fs.existsSync(baseFilePath)) {
    fs.mkdirSync(baseFilePath)
}

let _studentDataSet = new StudentDataReader(path.join(baseFilePath, "Students.json"));
let _teacherDataSet = new TeacherDataReader(path.join(baseFilePath, "Teachers.json"));

_teacherDataSet.generateRandomTeachers();
let teacherIds = _teacherDataSet.getArrayFromFile().map(teacher => teacher.id);
_studentDataSet.generateRandomStudents(teacherIds);

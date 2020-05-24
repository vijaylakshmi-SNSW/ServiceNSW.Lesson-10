const { CustomerDataReader } = require("./DataLayer");
const { CustomerService } = require("./Services");
const fs = require("fs");
const path = require("path");

const baseFilePath = path.join(__dirname,"../", "JSONData");

if (!fs.existsSync(baseFilePath)) {
    fs.mkdirSync(baseFilePath)
}

let _customerDataSet = new CustomerDataReader(path.join(baseFilePath, "Customer.json"));
let _customerService = new CustomerService(_customerDataSet);
// let _teacherDataSet = new TeacherDataReader(path.join(baseFilePath, "Teachers.json"));

// _teacherDataSet.generateRandomTeachers();
// let teacherIds = _teacherDataSet.getArrayFromFile().map(teacher => teacher.id);
// _customerDataSet.generateRandomStudents(teacherIds);
_customerService.g

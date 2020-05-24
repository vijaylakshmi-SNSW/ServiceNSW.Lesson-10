const {Teacher} = require("../Models");
const fs = require("fs");

module.exports = class TeacherDataReader {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getArrayFromFile() {
        return JSON.parse(fs.readFileSync(this.fileName).toString()).map(teacherRaw => new Teacher(
            teacherRaw.firstName,
            teacherRaw.lastName,
            teacherRaw.age,
            teacherRaw.id
        ));
    }

    writeArrayToFile(arrayValue) {
        fs.writeFileSync(this.fileName, JSON.stringify(arrayValue));
    }

    getTeacher(id) {
        return this.getArrayFromFile().find(s => s.id == id);
    }

    updateTeacher(teacher) {
        this.writeArrayToFile(this.getArrayFromFile().map(s => {
            if (s.id == teacher.id) {
                return teacher;
            } else {
                return s;
            }
        }));
    }

    deleteTeacher(id) {
        this.writeArrayToFile(this.getArrayFromFile().filter(s => s.id != id));
    }

    addTeacher(teacher) {
        this.writeArrayToFile(this.getArrayFromFile().concat([teacher]));
    }

    // WARNING: THIS WILL OVERRIDE ANY DATA CURRENTLY IN THE "Teachers.json" FILE
    generateRandomTeachers() {
        this.writeArrayToFile(Teacher.generateRandomPeople(10));
    }
}

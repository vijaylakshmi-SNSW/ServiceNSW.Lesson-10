module.exports = class StudentService {
    constructor(studentDataReader, teacherDataReader) {
        this.studentDataReader = studentDataReader;
        this.teacherDataReader = teacherDataReader;
    }

    getStudent(id){
        return this.studentDataReader.getStudent(id);
    
    }

    searchByName(searchFName,searchLName) {
        return this.studentDataReader.searchByName(searchFName, searchLName);
    }

    deleteStudent(id){
        let student = this.getStudent(id);
        if(!student) {
            console.log("Error: No Matching Student Found");
        } else {
            this.studentDataReader.deleteStudent(id);
        }
    }

    

    updateStudent(student) {
        let dataStudent = this.getStudent(student.id);
        if(!dataStudent) {
            console.log("Error: No Matching Student Found");
        } else if (this.validateStudent(student)) {
            this.studentDataReader.updateStudent(student);
        } else {
            console.log("Error: Student object was invalid")
        }
    }

    addStudent(student) {
        if (this.validateStudent(student)) {
            this.studentDataReader.addStudent(student);
        } else {
            console.log("Error: Student object was invalid")
        }
    }

    doesTeacherExist(id) {
        let teacher = this.teacherDataReader.getTeacher(id);
        if(teacher) {
            return true;
        } else {
            return false;
        }
    }
    

    validateStudent(student){
        if(!this.doesTeacherExist(student.teacherId)) {
            console.log("Error: Could not find matching teacher for given teacherId")
            return false;
        }
        if(isNaN(student.age)) {
            return false;
        }
        for (let i = 0; i < student.grades.length; i++) {
            const grade = student.grades[i];
            if(isNaN(grade)) {
                console.log("Error: One or more of the entered grades was invalid" + grade);
                return false;
            }
        }
        return true;
    }
} 
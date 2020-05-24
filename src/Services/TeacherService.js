module.exports = class StudentService {
    constructor(studentDataReader, teacherDataReader) {
        this.studentDataReader = studentDataReader;
        this.teacherDataReader = teacherDataReader;
    }
    getTeacher(id){
        return this.teacherDataReader.getTeacher(id);
    
    }


    deleteTeacher(id){
        let teacher = this.getTeacher(id);
        if(!teacher) {
            console.log("Error: No Matching Teacher Found");
        } else {
            this.teacherDataReader.deleteTeacher(id);
            console.log("Succesfully deleted the Teacher's record");
        }
    }

    

    updateTeacher(teacher) {
        let dataTeacher = this.getTeacher(teacher.id);
        if(!dataTeacher) {
            console.log("Error: No Matching Teacher Found");
        } else if (this.validateTeacher(teacher)) {
            this.teacherDataReader.updateTeacher(teacher);
            console.log("Teacher's details updated successfully")
        } else {
            console.log("Error: teacher object was invalid")
        }
    }

    addTeacher(teacher) {
        if (this.validateTeacher(teacher)) {
            this.teacherDataReader.addTeacher(teacher);
            console.log("New teacher details added successfully")
        } else {
            console.log("Error: Teacher object was invalid")
        }
    }


    validateTeacher(teacher){
        if(!this.teacherDataReader.getTeacher(teacher.id)){
            console.log("Error: Could not find matching teacher for given teacherId")
            return false;  
        }
        if(isNaN(teacher.age)){
            return false;
        }

        return true;
    } 
    
}

// validateStudent(student){
//     if(!this.doesTeacherExist(student.teacherId)) {
//         console.log("Error: Could not find matching teacher for given teacherId")
//         return false;
//     }
//     if(isNaN(student.age)) {
//         return false;
//     }
//     for (let i = 0; i < student.grades.length; i++) {
//         const grade = student.grades[i];
//         if(isNaN(grade)) {
//             console.log("Error: One or more of the entered grades was invalid" + grade);
//             return false;
//         }
//     }
//     return true;
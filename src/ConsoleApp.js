const readline = require('readline');
const path = require("path");
const { StudentDataReader, TeacherDataReader } = require("./DataLayer");
const { StudentService, TeacherService } = require("./Services");
const { Student, Teacher } = require("./Models");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question) {
    let answer;

    return new Promise((resolve, reject) => {
        rl.question(question, (ans) => {
            resolve(ans);
        })
    });
}


async function Program() {
    const baseFilePath = path.join(__dirname, "../", "JSONData");
    const _studentDataReader = new StudentDataReader(path.join(baseFilePath, "Students.json"));
    const _teacherDataReader = new TeacherDataReader(path.join(baseFilePath, "Teachers.json"));
    const _studentService = new StudentService(_studentDataReader, _teacherDataReader);
    const _teacherService = new TeacherService(_studentDataReader, _teacherDataReader);

    // console.log(_studentDataReader.getArrayFromFile());
    // console.log(_teacherDataReader.getArrayFromFile());

    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Students");
        console.log("[2] Teachers");
        console.log("[3] Exit");
        let userInput = await askQuestion("Select an option from above: ");
        switch (userInput) {
            case "1":
                console.log("[1] Add Student");
                
                console.log("[2] Search Students");
                console.log("[3] Update Student");
                console.log("[4] Delete Student");
                console.log("[5] Search Student by Name:")
                console.log("[6] Go Back");
                let userInputStudent = await askQuestion("Select an option from above: ");
                switch (userInputStudent) {
                    case "1":
                        let studentFirstName = await askQuestion("Enter Student First Name: ");
                        let studentLastName = await askQuestion("Enter Student Last Name: ");
                        let studentAge = await askQuestion("Enter Student Age: ");
                        let parsedStudentAge = parseInt(studentAge);
                        let grades = await askQuestion("Enter Student Grades (Space-Separated): ");
                        let teacherId = await askQuestion("Enter Teacher's ID: ");
                        let parsedGrades = grades.split(" ").map(num => parseInt(num));
                        let newStudent = new Student(
                            studentFirstName,
                            studentLastName,
                            parsedStudentAge,
                            parsedGrades,
                            teacherId
                        );
                        _studentService.addStudent(newStudent);
                        break;

                        

                           
                            
                    case "2":
                        let searchid = await askQuestion("Enter the search id : ");
                        matchingid = _studentService.getStudent(searchid);
                        console.log(matchingid);
                        break;

                    case "3":
                        let updatedStudentFirstName = await askQuestion("Enter Student First Name: ");
                        let updatedStudentLastName = await askQuestion("Enter Student Last Name: ");
                        let updatedStudentAge = await askQuestion("Enter Student Age: ");
                        let parsedupdatedStudentAge = parseInt(updatedStudentAge);
                        let updatedgrades = await askQuestion("Enter Student Grades (Space-Separated): ");
                        let parsedUpdatedGrades = updatedgrades.split(" ").map(num => parseInt(num));
                        let updatedteacherId = await askQuestion("Enter Teacher's ID: ");
                        let updatedstudentId = await askQuestion("Enter student Id: ");
                        let newUpdatedStudent = new Student(
                            updatedStudentFirstName,
                            updatedStudentLastName,
                            parsedupdatedStudentAge,
                            parsedUpdatedGrades,
                            updatedteacherId, updatedstudentId
                            );
                        _studentService.updateStudent(newUpdatedStudent);

                        break;
                    case "4":
                        let deleteStudentId = await askQuestion("Enter Student's ID you want to delete: ");
                        _studentService.deleteStudent(deleteStudentId);
                        break;
                    
                    case "5":
                        let studentFName = await askQuestion("Enter Student First Name: ");
                        let studentLName = await askQuestion("Enter Student Last Name: ");
                        objStudent = _studentService.searchByName(studentFName,studentLName);
                        console.log(objStudent);
                        break;
                        case "6":
                        break;
                }
                break;
            case "2":
                console.log("[1] Add Teacher");
                
                console.log("[2] Search Teacher");
                console.log("[3] Update Teacher");
                console.log("[4] Delete Teacher");
                
                console.log("[5] Go Back");
                let userInputTeacher = await askQuestion("Select an option from above: ");
                switch (userInputTeacher) {
                    case "1":
                        let teacherFirstName = await askQuestion("Enter Teacher First Name: ");
                        let teacherLastName = await askQuestion("Enter Teacher Last Name: ");
                        let teacherAge = await askQuestion("Enter Teacher Age: ");
                        let parsedTeacherAge = parseInt(teacherAge);
                    
                        
                        
                        let newTeacher = new Teacher(
                            teacherFirstName,
                            teacherLastName,
                            parsedTeacherAge,
                            
                            
                        );
                        _teacherService.addTeacher(newTeacher);
                        break;
                        
                    case "2":
                        let searchid = await askQuestion("Enter the search id : ");
                        matchingid = _teacherService.getTeacher(searchid);
                        console.log(matchingid);
                        break;
                    case "3":
                        let updatedTeacherFirstName = await askQuestion("Enter Teacher First Name: ");
                        let updatedTeacherLastName = await askQuestion("Enter Teacher Last Name: ");
                        let updatedTeacherAge = await askQuestion("Enter Teacher Age: ");
                        let parsedupdatedTeacherAge = parseInt(updatedTeacherAge);
                        
                        let updatedteacherId = await askQuestion("Enter Teacher's ID: ");
                        
                        let newUpdatedTeacher = new Teacher(
                            updatedTeacherFirstName,
                            updatedTeacherLastName,
                            parsedupdatedTeacherAge,
                            
                            updatedteacherId
                            );
                        _teacherService.updateTeacher(newUpdatedTeacher);

                        break;
                    case "4":
                        let deleteTeacherId = await askQuestion("Enter Teacher's id you want to delete: ");
                        _teacherService.deleteTeacher(deleteTeacherId);
                        break;
                    case "5":
                        break;

                        }
                        break;
            
            case "3":
                shouldLoop = false;
                break;
            default:
                console.log("Error: Could not read user input. Please enter a number from 1 to 3");
        }
    }
}

Program().then(() => {
    process.exit(0);
});

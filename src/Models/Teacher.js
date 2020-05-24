const Person = require("./Person");

class Teacher extends Person {
    constructor(firstName, lastName, age, id = uuid.v4()) {
        super(firstName, lastName, age, id);
    }

    static generateRandomPeople(num) {
        // let people =  super.generateRandomPeople(num);
        // let teachers = []
        // for (let i = 0; i < people.length; i++) {
        //     const person = people[i];
        //     teachers.push(new Teacher(
        //         person.firstName,
        //         person.lastName,
        //         person.age,
        //         person.id
        //     ));
        // }

        return super.generateRandomPeople(num).map(person => new Teacher(
            person.firstName,
            person.lastName,
            person.age,
            person.id
        ));
    }

    getMyStudents(students) {
        return students.filter(student => student.teacherId == this.id);
    }
}

module.exports = Teacher;

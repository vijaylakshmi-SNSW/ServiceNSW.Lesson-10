const { Customer } = require("../Models"); // customerdataReader have the methods (Logics) whereas the CustomerService
const fs = require("fs");                  // have validation and error returns to the customer.

module.exports = class CustomerDataReader {
    constructor(fileName) {
        this.fileName = fileName;
    }

    getArrayFromFile() {
        return JSON.parse(fs.readFileSync(this.fileName).toString()).map(customerRaw => new Customer(
            customerRaw.firstName,
            customerRaw.lastName,    // new customer is the object
            customerRaw.age,
            customerRaw.customerId
        ));
    }

    writeArrayToFile(arrayValue) {
        fs.writeFileSync(this.fileName, JSON.stringify(arrayValue));  //it writes given values in the JSON file
    }

    getCustomer(customerId) {
        return this.getArrayFromFile().find(c => c.customerId == customerId);  //this will find the customer from the getArray
    }

    updateCustomer(customer) {

        this.writeArrayToFile(this.getArrayFromFile().map(c => {  // when you update, call the writeArraytoFile(as it writes the data in the JSON file)
            if (c.customerId == customer.customerId) {
                return customer;
            } else {
                return c;
            }
        }));
    }


    deleteCustomer(customerId) {
        this.writeArrayToFile(this.getArrayFromFile().filter(c => c.customerId != customerId));
    }

    addCustomer(customer) {
        this.writeArrayToFile(this.getArrayFromFile().concat([customer]));

    }

    // WARNING: THIS WILL OVERRIDE ANY DATA CURRENTLY IN THE "Students.json" FILE
    // generateRandomStudents(teacherIds) {
    //     this.writeArrayToFile(Student.generateRandomPeople(100, teacherIds));
    // }
}


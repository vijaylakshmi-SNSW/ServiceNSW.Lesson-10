//const Person = require("./Person");   
const random = require("../Common/Random");
const uuid = require("uuid");

class Customer {
    constructor(firstName, lastName, age, customerId, id = uuid.v4()) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.id = id;
        this.customerId = customerId;
    }

    getCustomerId(custId) {
        return custId.find(cust => cust.id == this.customerId);
    }

}

module.exports = Customer;
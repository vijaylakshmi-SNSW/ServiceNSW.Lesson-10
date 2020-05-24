module.exports = class CustomerService {
    
    constructor(customerDataReader) {
        this.customerDataReader = customerDataReader;
        
    }

    getCustomer(customerNum){
        return this.customerDataReader.getCustomer(customerNum);
    }

    deleteCustomer(customerid){
        let customer = this.getCustomer(customerid);
        if(!customer) {
            console.log("Error: No Matching Customer Found");
        } else {
            this.customerDataReader.deleteCustomer(customerid);
            console.log("Customer details has been deleted! ")
        }
    }

    updateCustomer(customer) {
        let dataCustomer = this.getCustomer(customer.customerId);
        if(!dataCustomer) {
            console.log("Error: No Matching Customer Found");
        } else if (this.validateCustomer(customer)) {
            this.customerDataReader.updateCustomer(customer);
            console.log("Succesfully updated the customer details! ");
        } else {
            console.log("Error: Customer object was invalid")
        }
    }

    addCustomer(customer) {
        let dataCustomer = this.getCustomer(customer.customerId);
        if (dataCustomer) {
            console.log("Error: Customer already found with this id:" +customer.customerId);
        } else if(this.validateCustomer(customer)){
            this.customerDataReader.addCustomer(customer);
            console.log("Succefully added the new Customer")
        } else {
            console.log("Error: Customer entry was invalid");
        }

    }

    validateCustomer(customer){
       
        if((!isNaN(customer.age) && !isNaN(customer.customerId)) && customer.customerId.length == 6 ){
            return true;
        } 
        
        return false;
    }
} 
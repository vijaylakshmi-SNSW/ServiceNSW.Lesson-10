const readline = require('readline');
const path = require("path");
const { CustomerDataReader } = require("./DataLayer");
const { CustomerService } = require("./Services");
const { Customer } = require("./Models");


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
    const _CustomerDataReader = new CustomerDataReader(path.join(baseFilePath, "Customer.json"));
    //const _teacherDataReader = new TeacherDataReader(path.join(baseFilePath, "Teachers.json"));
    const _CustomerService = new CustomerService(_CustomerDataReader);

    // console.log(_CustomerDataReader.getArrayFromFile());
    // console.log(_teacherDataReader.getArrayFromFile());

    let shouldLoop = true;
    while (shouldLoop) {
        console.log("[1] Customer");
        console.log("[2] Exit");
        let userInput = await askQuestion("Select an option from above: ");
        switch (userInput) {
            case "1":
                console.log("[1] Add Customer");
                console.log("[2] Search Customers");
                console.log("[3] Update Customer");
                console.log("[4] Delete Customer");
                console.log("[5] Go Back");
                let userInputCustomer = await askQuestion("Select an option from above: ");
                switch (userInputCustomer) {
                    case "1":
                        let CustomerFirstName = await askQuestion("Enter Customer First Name: ");
                        let CustomerLastName = await askQuestion("Enter Customer Last Name: ");
                        let CustomerAge = await askQuestion("Enter Customer Age: ");
                        let parsedCustomerAge = parseInt(CustomerAge);
                        let CustomerId = await askQuestion("Enter Customer Number: ");
                        let parsedCustomerId = parseInt(CustomerId);
                        // let grades = await askQuestion("Enter Customer Grades (Space-Separated): ");
                        // let teacherId = await askQuestion("Enter Teacher's ID: ");
                        // let parsedGrades = grades.split(" ").map(num => parseInt(num));
                        let newCustomer = new Customer(
                            CustomerFirstName,
                            CustomerLastName,
                            parsedCustomerAge,
                            CustomerId

                        );
                        _CustomerService.addCustomer(newCustomer);
                        break;
                    case "2":
                        let searchTerm = await askQuestion("Enter Customer Id: ");
                        let matchingCustomers = _CustomerService.getCustomer(searchTerm);
                        console.log(matchingCustomers);
                        break;
                    
                    case "3":
                        let updatedCustomerFirstName = await askQuestion("Enter Customer First Name: ");
                        let updatedCustomerLastName = await askQuestion("Enter Customer Last Name: ");
                        let updatedCustomerAge = await askQuestion("Enter Customer Age: ");
                        let parsedUpdatedCustomerAge = parseInt(updatedCustomerAge);
                        let updatedCustomerId = await askQuestion("Enter Customer Number: ");
                        //let parsedUpdatedCustomerId = parseInt(updatedCustomerId);
                        let UpdatednewCustomer = new Customer(
                            updatedCustomerFirstName,
                            updatedCustomerLastName,
                            parsedUpdatedCustomerAge,
                            pdatedCustomerId

                        );
                        _CustomerService.updateCustomer(UpdatednewCustomer);

                        break;
                    
                    case "4":
                        let CustomerDetailsToDelete = await askQuestion("Enter the Customer number you want to delete: ");
                        _CustomerService.deleteCustomer(CustomerDetailsToDelete);

                        break;
                    

                    case "5":

                        break;
                        default:
                    console.log("Error: Could not read user input. Please enter a number from 1 to 2");


                } break;
                case "2":
                    shouldLoop = false;
                    break;
                default:
                    console.log("Error: Could not read user input. Please enter a number from 1 to 3");
                    console.log("");

        }
        
    }

    
    


}

Program().then(() => {
    process.exit(0);
});
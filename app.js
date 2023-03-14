//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");
mongoose.set('strictQuery', true);
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
mongoose.connect('mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/PayrolllDB');

// console.log(currentSN);


const PayrollSchema = mongoose.Schema({

Employee_Profile_Picture: {
    type: String,
    required: [true, "Please provide a valid link for the Employee's profile picture"]
  },
Employee_email_adsress:  {
      type: String,
      required: [true, "Check  Employee Email missing"]
    },
Employee_number: {
      type: String,
      required: [true, "Check Employee Number missing missing"]
    },
EmployeeTitle:{
      type:String,
      minlength: 2,
      maxlength: 5,
      required: [true, "Check Employee title Enter Title"],
    },
Employee_Tax_Number: 
      {
        type: String || Number,
        min:10,
        max: 10,
        required: [true, "Check Employee TAX number"],
      },
EpmloyyeID_Number: {
        type: String || Number,
        minlength: 13,
        maxlength: 13,
        required: [true, "Check Check Employee ID Number"]
    },
Epmloyye_Contact: {
      type: String || Number,
      minlength: 10,
      maxlength: 10,
      required: [true, "Check Employee Contact Details"]
  },
Epmloyye_Altenative_Contact: {
    type: String || Number,
    minlength: 10,
    maxlength: 10,
    required: [true, "Check Employee Contact Alternative Details"]
},
Epmloyye_UIF: {
  type: String || Number,
  minlength: 0,
  maxlength: 10,
  required: [true, "Check Employee UIF"]
},
Epmloyye_TAX: {
  type: String || Number,
  minlength: 0,
  maxlength: 10,
  required: [true, "Check Employee UIF Tax Number"]
},
Epmloyye_PAYE: {
  type: String || Number,
  minlength: 0,
  maxlength: 13,
  required: [true, "Check Employee PAYE"]
},
Epmloyye_SDL: {
  type: String || Number,
  minlength: 0,
  maxlength: 10,
  required: [true, "Check Employee SDL"]
},
Epmloyye_hour_Rate: {
  type: String,
  minlength: 0,
  maxlength: 6,
  required: [true, "Check Employee Rate"]
},
Epmloyye_Basic_Salary: {
  type: String || Number,
  minlength: 0,
  maxlength: 50,
  required: [true, "Check Employee Basic Salary"]
},
Epmloyye_Basic_Final_Salary: {
  type: String || Number,
  minlength: 0,
 
  required: [true, "Check Employee Final Basic Salary"]
},
Epmloyye_Fines: {
  type: String || Number,
  minlength: 0,
  maxlength: 13,
  required: [true, " Check Employee Fines"]
},
Employee_CitizenShip: {
      type: String,
      
      required: [true, "Check Employee Citizenship Status"]
  },
  Employee_Nationality: {
    type: String,
 
    required: [true, "Check Employee Nationality Status"]
},
Employee_Department: {
  type: String,
  
  required: [true, "Check Employee Department Status"]
},
Employee_Leave_Days_total: {
    type: String || Number,
    minlength: 0,
    maxlength: 3,
    required: [true, "Check Employee Total Allocated Days"]
},
Employee_Leave_Days_Taken: {
  type: String || Number,
  minlength: 0,
  maxlength: 3,
  required: [true, "Check Employee Days Taken"]
},
Employee_Leave_Days_left: {
  type: String || Number,
  minlength: 0,
  maxlength: 50,
  required: [true, " Check Employee Days left"]
},
Employee_Home_Address: {
  type: String,
  required: [true, "Check Employee Home Address"]
}, 
Employee_FirstName: {
  type: String,
  required: [true, "Check Employee Home Address"]
}, 
Employee_LastName: {
  type: String,
  required: [true, "Check Employee Home Address"]
},
Postion:{
  type: String,
  required:[true, "Check Employee Home Address"]
},
Hours_worked: {
  type: String || Number,
  minlength: 0,
  maxlength: 4,
  required: [true, " Check Employee Days left"]
}, 
Employee_Allowance:{
  type: String || Number,
  minlength: 0,
  maxlength: 8,
  required: [true, " Check Employee Days left"]
},
Medical_Aid:{
  type: String || Number,
  minlength: 0,
  maxlength: 8,
  required: [true, " Check Employee Days left"]
},
});
const Payrollsmodel = mongoose.model("Payroll_ProCollection", PayrollSchema);
// Loading Employye data

var GenerateNumber = Math.floor(Math.random() * 900) + 100;
// Combine the year and student number to create the employee number
var EmployeeNumberModel = "2023" + GenerateNumber;


const  PayrollSave = new Payrollsmodel({
  Employee_Profile_Picture: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  Employee_email_adsress:"Mike@gmail.com",
  Employee_number: EmployeeNumberModel,
  EmployeeTitle: "Mr",
  Employee_Tax_Number:"4474438665",
  EpmloyyeID_Number: "7534678793567",
  Epmloyye_Contact: "0998427568",
  Epmloyye_Altenative_Contact:"0698427568",
  Epmloyye_UIF: "9%",
  Epmloyye_TAX: "27%",
  Epmloyye_PAYE: "9%",
  Epmloyye_SDL:"9%",
  Epmloyye_hour_Rate:'',
  Epmloyye_Basic_Salary:'',
  Epmloyye_Basic_Final_Salary:"from front end",
  Epmloyye_Fines: "0",
  Employee_CitizenShip:"South Africa",
  Employee_Nationality:"South African",
  Employee_Department: "Finance",
  Employee_Leave_Days_total: "30",
  Employee_Leave_Days_Taken:"1",
  Employee_Leave_Days_left: "from front end",
  Employee_Home_Address: "Mshabela 1064",
  Employee_LastName: "Mike",
  Employee_FirstName: "Moon",
  Hours_worked: "",
  Postion:"",
  Employee_Allowance:"",
  Medical_Aid:"",


});
var ID_Checeke_Validator = "7534678793567"
var employee_NumValidator = EmployeeNumberModel
// Generate a random student number between 100 and 999
let current_Employee_Number;

// Find all the employees in the Payrollsmodel collection
Payrollsmodel.find(function (err, Teachers) {
  if (err) {
    console.log(err);
  } else {
    Teachers.forEach(function (Teacher) {
      current_Employee_Number = Teacher.Employee_number;
      // console.log(current_Employee_Number);
    });
    // Here you can use the current_Employee_Number variable
    // console.log("Current employee number is: " + current_Employee_Number);
    
    // Check if employee already exists
   

    // Payrollsmodel.findOne({ $or: [{ EmployeeID_Number: ID_Checeke_Validator }, 
    // ] }, function (err, Employee) {
    //   if (err) {
    //     console.log(err);
    //   } else if (Employee) {
        
    //     console.log("Employee already exists");
    //   } else {
    //     // Create a new Payroll document and save it to the database
    //     // const newPayroll = new Payrollsmodel({
    //     //   EmployeeID_Number: ID_Checeke_Validator,
    //     //   Employee_number: current_Employee_Number,
    //     //   // add any other fields to the document here
    //     // });
    //     // PayrollSave.save(function (err) {
    //     //   if (err) {
    //     //     console.log(err);
    //     //   } else {
    //     //     console.log("Employee added");
    //     //   }
    //     // });
    //   }
    // });
  }
});
Payrollsmodel.find(
  {$or: [{Employee_number: employee_NumValidator},]},
  function (err, EmployeeDetails) {
    if (err) {
      console.log(err);
    } else {
      if (EmployeeDetails.length > 0) {
        console.log("Employee number exits "+EmployeeDetails[0].Employee_number);
        
      } else {
        //     PayrollSave.save(function (err) {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log("Employee added");
        //               }
        // });
      }
    }
  }
);

//Geeting data from DB to Front End to Add new employee
app.get('/Payroll.html', (req, res) => {
  Payrollsmodel.find(
    { },
    function (err, EmployeeDetails) {
    if (err) {
      console.log(err) 
    } else { console.log(EmployeeDetails)}
    res.render("payroll", {listTitle: "Today", Learn: EmployeeDetails});
  });
});


//Geeting data from DB to Front End to Add new employee
app.get('/AddNewEmployee.html', (req, res) => {
  Payrollsmodel.find(
    { },
    function (err, EmployeeDetails) {
    if (err) {
      console.log(err) 
    } else { console.log(EmployeeDetails)}
    res.render("Addnewemployee", {listTitle: "Today", Learn: EmployeeDetails,
    
  
  });
  });
});



//Edit data from fornt end
app.post('/edit', (req, res) => {
  const id = req.body.id;
  const salaryAfterTaxQuery = req.body.EmployeeBasicAfterTax;
  const EmployeTaxNumQuery = req.body.EmployeeTaxNumber;
  const ContactsQuery = req.body.EpmloyyeContact;
  const ProfileLinkQueryuery = req.body.EmployeeProfilePicture;
  const ATNcontactsQuery = req.body.AlternativeContactDetails;
  const EmplyoyeeIDquery =req.body.EpmloyyeIDNumber;
  const EmployeeTaxQuery = req.body.EmployeeTax;
  const MedicaalaidQuery = req.body.MedicalAid;
  const AllowanceQuery = req.body.Allowancee;
  const hourswoked = req.body.hoursWorked;
  const hourate = req.body.EpmloyyehourRate;
  const employeeBasicSalary = req.body.EpmloyyeBasicSalary;
  const employeeHomeAddress = req.body.employeeHomeAddress;
  const employeeEmailAddress = req.body.Employeeemailadsress;
  console.log(AllowanceQuery)

  Payrollsmodel.findOneAndUpdate(
    { _id: id },
    {
      Epmloyye_Basic_Final_Salary: salaryAfterTaxQuery,
      Employee_Tax_Number: EmployeTaxNumQuery,
      Epmloyye_Contact: ContactsQuery,
      Employee_Profile_Picture: ProfileLinkQueryuery,
      Epmloyye_Altenative_Contact:ATNcontactsQuery,
      EpmloyyeID_Number: EmplyoyeeIDquery,
      Epmloyye_TAX :EmployeeTaxQuery,
      Medical_Aid: MedicaalaidQuery,
      Employee_Allowance:AllowanceQuery,
      Hours_worked:hourswoked,
      Epmloyye_hour_Rate: hourate,
      Epmloyye_Basic_Salary: employeeBasicSalary,
      Employee_Home_Address: employeeHomeAddress,
      Employee_email_adsress: employeeEmailAddress
      
    },
    (err, employee) => {
      if (err) {
        console.log(err);
        res.redirect('/error');
      } else {
        res.redirect('/');
      }
    }
  );
});


//Geeting data from DB to Front End to mian page
app.get('/', (req, res) => {
  Payrollsmodel.find(
    { },
    function (err, EmployeeDetails) {
    if (err) {
      console.log(err) 
    } else { console.log(EmployeeDetails)}
    res.render("list", {listTitle: "Today", Learn: EmployeeDetails,
    });
  });
});
// Starting Sever
app.listen(5000, function() {  
  console.log("Server started on port 5000");
});

app.post('/search', (req, res) => {
  const searchQuery = req.body.searchQueryName.toLowerCase();

  console.log("Search Query: ", searchQuery);
  Payrollsmodel.find(
    { $or: [
      { Employee_LastName: { $regex: searchQuery, $options: "i" } },
      { Employee_FirstName: { $regex: searchQuery, $options: "i" } },
      { Employee_Department: { $regex: searchQuery, $options: "i" } }
    ]},
    function (err, EmployeeDetails) {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while searching.");
      } else {
        console.log(EmployeeDetails);
        res.render("list", { listTitle: "Today", Learn: EmployeeDetails });
      }
    }
  );
});
//Payroll search
app.post('/searchpayroll', (req, res) => {
  const searchQuery = req.body.searchQueryName.toLowerCase();

  console.log("Search Query: ", searchQuery);
  Payrollsmodel.find(
    { $or: [
      { Employee_LastName: { $regex: searchQuery, $options: "i" } },
      { Employee_FirstName: { $regex: searchQuery, $options: "i" } },
      { Employee_Department: { $regex: searchQuery, $options: "i" } }
    ]},
    function (err, EmployeeDetails) {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while searching.");
      } else {
        console.log(EmployeeDetails);
        res.render("payroll", { listTitle: "Today", Learn: EmployeeDetails });
      }
    }
  );
});






// Generate a random student number between 100 and 999
//let current_Employee_Number;
// Find all the employees in the Payrollsmodel collection
// Payrollsmodel.find(function (err, EmployeesM) {
//   if (err) {
//     console.log(err);
//   } else {
//     // Loop through each employee and store their employee number in the current_Employee_Number variable
//     EmployeesM.forEach(function (Employee) {
//       current_Employee_Number = Employee.Employee_Number;
//     });
//     // Here you can use the current_Employee_Number variable
//   }
// });


// Payrollsmodel.save().then(() => console.log('Employee added'));
// const fist_Name_VALIDATOR = "Sammy";
// const last_Name_VALIDATOR = "Phahlamohlaka";
// const STN_validator = current_Employee_Number








// Learnermodel.find({ Last_Name: last_Name_VALIDATOR },{ Fist_Name: fist_Name_VALIDATOR },{ Student_Number: STN_validator }, function (err, learners) {
//   if (learners.some((learner) => learner.Last_Name === last_Name_VALIDATOR) || learners.some((learner) => learner.Fist_Name === fist_Name_VALIDATOR) && learners.some((learner) => learner.Student_Number === STN_validator)) {
//     console.log("Learner already exists");
//   } else {
//     //  console.log("Learner already add");
//       // learnerSave.save().then(() => console.log('Learner added'));
//   }
// });





// // Model query for teacher prolile



// let Teacher_subjects;

// Grade_Propertiesmodel.find(function (err, Teachers) {
//   if (err) {
//     console.log(err);
//   } else {
//     Teachers.forEach(function (Teacher) {
//       Teacher_subjects = Teacher.Subject;
//        console.log(Teacher_subjects);
//     });
//     // Here you can use the current_learner variable
//     // console.log("Current learner is: " + current_learner_Student);
//   }
// });


// let Teacher_Grade;
// Grade_Propertiesmodel.find(function (err, Teachers) {
//   if (err) {
//     console.log(err);
//   } else {
//     Teachers.forEach(function (Teacher) {
//       Teacher_Grade = Teacher.grade_number;
//        console.log(Teacher_Grade);
//     });
//     // Here you can use the current_learner variable
//     // console.log("Current learner is: " + current_learner_Student);
//   }
// });

// // app.get('/', (req, res) => {
// //   // res.sendfile('Mylearners.html'); 

// //   Grade_Propertiesmodel.find(
    
// //     { grade_number: ["9C","9F"] },
    
// //     function (err, leanerDetails) {

// //     if (err) {
// //       console.log(err)
      
// //     } else { console.log(leanerDetails)}

// //     res.render("list", {listTitle: "Today", Learn: leanerDetails});


// //   });
  
// // })


// app.get('/', (req, res) => {
//   // res.sendfile('Mylearners.html'); 

//   Learnermodel.find(
    
//     { grade_number: ["9C","9F"] },
    
//     function (err, leanerDetails) {

//     if (err) {
//       console.log(err)
      
//     } else { console.log(leanerDetails)}

//     res.render("list", {listTitle: "Today", Learn: leanerDetails});


//   });
  
// })
// // leaners stats model count
// app.get('/', (req, res) => {
//   // res.sendfile('Mylearners.html'); 

//   Learnermodel.find(
    
//     { grade_number: ["9C","9F"] },
    
//     function (err, leanerDetails) {

//     if (err) {
//       console.log(err)
      
//     } else { console.log(leanerDetails)}

//     res.render("list", {listTitle: "Today", Learn: leanerDetails});


//   });
  
// })



// // Model query for Leaners all
// // querying leaner by grade
// app.get('/Mylearners.html', (req, res) => {
//   // res.sendfile('Mylearners.html'); 

//   Learnermodel.find(
    
//     { grade_number: ["9C","9F"] },
    
//     function (err, leanerDetails) {

//     if (err) {
//       console.log(err)
      
//     } else { console.log(leanerDetails)}

//     res.render("learners", {listTitle: "Today", Learn: leanerDetails});
   

//   });

  
// });

// // counting the numberr of learners

// app.get('/students', function(req, res) {
//   Learnermodel.find({}, function(err, students) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.render('students', { students: students });
//     }
//   });
// });



// // querying leaner by grade



// // querying Garde Proparties by informtion

// app.get("/", function(req, res) {
  
  
//     Learnermodel.find(
      
//       { grade_number: ["9C","9F"] },
      
//       function (err, leanerDetails) {
  
//       if (err) {
//         console.log(err)
        
//       } else { console.log(leanerDetails)}
  
//       res.render("list", {listTitle: "Today", Learn: leanerDetails});
  
  
//     })
//   // const day = date.getDate();
  
  
//   });
  



// // adding new leaner
// app.post("/", function(req, res){

//   const   Fist_Name1 = req.body.newItem;
//   const learnerSave = new Learnermodel(
//     {
      
//       // LearnerT: learnerTeacher,
//       Gender:"F",
    
//       Leaner_Profile_Picture:"https://images.pexels.com/photos/7275385/pexels-photo-7275385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//       address:"Jane Furse",
      
//       email_adsress:
//       "Goad-C@school.co.za",
      
//       grade_number:
//       "9F",
//       Fist_Name: Fist_Name1,
//       Last_Name: "Phahlamohlaka",
//       Student_Number:currentSN
    
    
//     });

// //  learnerSave.save().then(() => res.redirect("/Mylearners.html"));

// });
// // deleting leaner
// app.post("/delete", function (req, res) {
//   const checkedid = req.body.checkbox;
//   Learnermodel.findByIdAndRemove(checkedid, function (err, docs) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Removed User : ", docs);
//       res.redirect("/Mylearners.html");
//     }
//   });
// });
//  const main = "Ronald438";
//  const main2 = "PingOfDeathSA";

// // app.get("/work", function(req,res){
// //   res.render("list", {listTitle: "Work List", newListItems: workItems});
// // });

// // database validation
// app.listen(5000, function() {

    
  
//   console.log("Server started on port 5000");
  
  
// });
// // Learnermodel.find(
  
// //   function (err, learners) {
// //   if (err) {
// //       console.log(err);
// //   } else {
// //     learners.forEach(function (learner) {
// //         var Curren_leaner = learner.Student_Number 
// //       console.log(
// //           learner.Student_Number 
// //             );
           
  
// // });
// //   }
// // });




// // validator
// // let current_learner_Student;

// // Learnermodel.find(function (err, learners) {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     learners.forEach(function (learner) {
// //       current_learner_Student = learner.Student_Number;
// //       // console.log(current_learner_Student);
// //     });
// //     // Here you can use the current_learner variable
// //     // console.log("Current learner is: " + current_learner_Student);
// //   }
// // });
// // const fist_Name_VALIDATOR = "Sammy";
// // const last_Name_VALIDATOR = "Phahlamohlaka";
// // const STN_validator = current_learner_Student








// // Learnermodel.find({ Last_Name: last_Name_VALIDATOR },{ Fist_Name: fist_Name_VALIDATOR },{ Student_Number: STN_validator }, function (err, learners) {
// //   if (learners.some((learner) => learner.Last_Name === last_Name_VALIDATOR) || learners.some((learner) => learner.Fist_Name === fist_Name_VALIDATOR) && learners.some((learner) => learner.Student_Number === STN_validator)) {
// //     console.log("Learner already exists");
// //   } else {
// //     //  console.log("Learner already add");
// //       // learnerSave.save().then(() => console.log('Learner added'));
// //   }
// // });






// // Deleting 
// // Learnermodel.deleteOne(
// //     { _id: "63eca4d68cb526dee3dle"}, {Gender: "M"},   
// //      function (err) {
// //              if (err) {console.log(err) 
// //             } else {
// //                 console.log("Delete is Succesful")
        
// //              }
            
// //             }
// //    )
// //  Grade_PropertiesSave.save().then(() => console.log('Grade_Properties added'));

//   //  learnerSave.save().then(() => console.log('Learner added'));





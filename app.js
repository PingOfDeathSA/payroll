//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const encrypt= require("mongoose-encryption");
// const date = require(__dirname + "/date.js");
mongoose.set('strictQuery', true);
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));
mongoose.connect('mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/PayrolllDB');


const userschema= new mongoose.Schema({
  email: String,
  password: String,

});

// console.log(currentSN);


const PayrollSchema = mongoose.Schema({

Employee_Profile_Picture: {
    type: String,
    // required: [true, "Please provide a valid link for the Employee's profile picture"]
  },
Employee_email_adsress:  {
      type: String,
      // required: [true, "Check  Employee Email missing"]
    },
Employee_number: {
      type: String,
      // required: [true, "Check Employee Number missing missing"]
    },
EmployeeTitle:{
      type:String,
      minlength: 2,
      maxlength: 5,
      // required: [true, "Check Employee title Enter Title"],
    },
Employee_Tax_Number: 
      {
        type: String || Number,
        min:10,
        max: 10,
        // required: [true, "Check Employee TAX number"],
      },
EpmloyyeID_Number: {
        type: String || Number,
        minlength: 13,
        maxlength: 13,
        // required: [true, "Check Check Employee ID Number"]
    },
Epmloyye_Contact: {
      type: String || Number,
      minlength: 10,
      maxlength: 10,
      // required: [true, "Check Employee Contact Details"]
  },
Epmloyye_Altenative_Contact: {
    type: String || Number,
    minlength: 10,
    maxlength: 10,
    // required: [true, "Check Employee Contact Alternative Details"]
},
Epmloyye_UIF: {
  type: String || Number,
  minlength: 0,
  maxlength: 10,
  // required: [true, "Check Employee UIF"]
},
Epmloyye_TAX: {
  type: String || Number,
  minlength: 0,
  maxlength: 10,
  // required: [true, "Check Employee UIF Tax Number"]
},
Epmloyye_PAYE: {
  type: String || Number,
  minlength: 0,
  maxlength: 13,
  // required: [true, "Check Employee PAYE"]
},
Epmloyye_SDL: {
  type: String || Number,
  minlength: 0,
  maxlength: 10,
  // required: [true, "Check Employee SDL"]
},
Epmloyye_hour_Rate: {
  type: String,
  minlength: 0,
  maxlength: 6,
  // required: [true, "Check Employee Rate"]
},
Epmloyee_Basic_Salary: {
  type: String || Number,
  minlength: 0,
  maxlength: 50,
  // required: [true, "Check Employee Basic Salary"]
},
Epmloyee_Basic_Final_Salary: {
  type: String || Number,
  minlength: 0,
 
  // required: [true, "Check Employee Final Basic Salary"]
},
Epmloyye_Fines: {
  type: String || Number,
  minlength: 0,
  maxlength: 13,
  // required: [true, " Check Employee Fines"]
},
Employee_CitizenShip: {
      type: String,
      
      // required: [true, "Check Employee Citizenship Status"]
  },
  Employee_Nationality: {
    type: String,
 
    // required: [true, "Check Employee Nationality Status"]
},
Employee_Department: {
  type: String,
  
  // required: [true, "Check Employee Department Status"]
},
Employee_Leave_Days_total: {
    type: String || Number,
    minlength: 0,
    maxlength: 3,
    // required: [true, "Check Employee Total Allocated Days"]
},
Employee_Leave_Days_Taken: {
  type: String || Number,
  minlength: 0,
  maxlength: 3,
  // required: [true, "Check Employee Days Taken"]
},
Employee_Leave_Days_left: {
  type: String || Number,
  minlength: 0,
  maxlength: 50,
  // required: [true, " Check Employee Days left"]
},
Employee_Home_Address: {
  type: String,
  // required: [true, "Check Employee Home Address"]
}, 
Employee_FirstName: {
  type: String,
  // required: [true, "Check Employee Home Address"]
}, 
Employee_LastName: {
  type: String,
  // required: [true, "Check Employee Home Address"]
},
Postion:{
  type: String,
  // required:[true, "Check Employee Home Address"]
},
Hours_worked: {
  type: String || Number,
  minlength: 0,
  maxlength: 4,
  // required: [true, " Check Employee Days left"]
}, 
Employee_Allowance:{
  type: String || Number,
  minlength: 0,
  maxlength: 8,
  // required: [true, " Check Employee Days left"]
},
Medical_Aid:{
  type: String || Number,
  minlength: 0,
  maxlength: 8,
  // required: [true, " Check Employee Days left"]
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
  Epmloyee_Basic_Salary:'',
  Epmloyee_Basic_Final_Salary:"",
  Epmloyye_Fines: "0",
  Employee_CitizenShip:"South Africa",
  Employee_Nationality:"South African",
  Employee_Department: "Finance",
  Employee_Leave_Days_total: "30",
  Employee_Leave_Days_Taken:"1",
  Employee_Leave_Days_left: "",
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
        // console.log("Employee number exits "+EmployeeDetails[0].Employee_number);
        
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
    } else { 
      // console.log(EmployeeDetails)
    }
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
    } else {
      //  console.log(EmployeeDetails)
    }
    res.render("Addnewemployee", {listTitle: "Today", Learn: EmployeeDetails,
    
  
  });
  });
});

app.get('/LeavedaysAdmin.html', (req, res) => {
  Payrollsmodel.find(
    { },
    function (err, EmployeeDetails) {
    if (err) {
      console.log(err) 
    } else {
      //  console.log(EmployeeDetails)
    }
    res.render("leavedays", {listTitle: "Today", Learn: EmployeeDetails,
    
  
  });
  });
});



//Edit data from fornt end
app.post('/EmployementInfoUpdate', (req, res) => {

  function calculateTax(income) {
    var tax = 0;
    var taxPercentage = 0;
  
    if (income > 782200) {
      tax = (income - 782200) * 0.39 + 209032;
      taxPercentage = 39;
    } else if (income > 613600) {
      tax = (income - 613600) * 0.36 + 149475;
      taxPercentage = 36;
    } else if (income > 467500) {
      tax = (income - 467500) * 0.31 + 97225;
      taxPercentage = 31;
    } else if (income > 337800) {
      tax = (income - 337800) * 0.26 + 61910;
      taxPercentage = 26;
    } else if (income > 216200) {
      tax = (income - 216200) * 0.18 + 33210;
      taxPercentage = 18;
    }
    return {
      taxAmount: tax,
      taxPercentage: taxPercentage
    };
  }
const employeeBasicSalaryQeury = req.body.EmployeeBasicSalary;

var YearIncome = employeeBasicSalaryQeury * 12;
  var DeductiontTax = calculateTax(YearIncome);
const { taxAmount, taxPercentage } = calculateTax(YearIncome);
var monthlyTax = taxAmount / 12;
console.log("Anual Tax To be deducted From anual Income: ", taxAmount);
console.log("Tax Percentage: ", taxPercentage+"%");
 console.log("YearIncome: ", DeductiontTax);
 console.log("Montly Tax To be deducted From Income: ", monthlyTax.toFixed(2));
 console.log("Salary before Tax " + employeeBasicSalaryQeury)
 const salary_after_tax = employeeBasicSalaryQeury - monthlyTax;
 console.log( "Salary after tax is " + salary_after_tax.toFixed(2))
 

 const MedicaalaidQuery = req.body.MedicalAid;
 console.log("medical is "+ MedicaalaidQuery)
 console.log("medical is "+ req.body.MedicalAid)
const FineQuery = req.body.finess
console.log("Fine is "+ FineQuery)
const AllowanceQuery = req.body.Allowancee;
console.log("Allowance is "+ AllowanceQuery)






// Define the calculateUIF function

function calculateUIF(salary) {
  if (salary < 1.7772) {
    return 0;
  } else if (salary < 17712) {
    return salary * 0.01;
  } else {
    return 177.12;
  }
}

//UIF Calculator
// Calculate UIF for a salary of R17,712
var uif = calculateUIF(salary);
// Output the result



var salaryAfteralldeductions = salary_after_tax - MedicaalaidQuery - FineQuery;


// UIF Calculator
function calculateUIF(salary) {
  if (salary < 1.7772) {
    return 0;
  } else if (salary < 17712) {
    return salary * 0.01;
  } else {
    return 177.12;
  }
}

// Calculate UIF for a salary of R17,712
var salary = salaryAfteralldeductions;
var uif = calculateUIF(salary);
console.log("UIF amount: R" + uif.toFixed(2));



var finalsalaryadding_allowance = salaryAfteralldeductions + parseInt(AllowanceQuery) - uif ;

console.log("Salary After Deductions " + salaryAfteralldeductions )
console.log("Allowance is " + finalsalaryadding_allowance )

// Calculating leavedays




  const id = req.body.id;
  
  const EmployeTaxNumQuery = req.body.EmployeeTaxNumber;
  const ContactsQuery = req.body.EpmloyyeContact;
  const ProfileLinkQueryuery = req.body.EmployeeProfilePicture;
  const ATNcontactsQuery = req.body.AlternativeContactDetails;
  const EmplyoyeeIDquery =req.body.EpmloyyeIDNumber;
  const EmployeeTaxQuery = monthlyTax.toFixed(2);

  
  const hourswoked = req.body.hoursWorked;
  const hourate = req.body.EpmloyyehourRate;
 
  const employeeHomeAddress = req.body.employeeHomeAddress;
  const employeeEmailAddress = req.body.Employeeemailadsress;
  // console.log("tax amount is " + salaryAfterTaxQuery + employeeBasicSalaryQeury )

  Payrollsmodel.findOneAndUpdate(
    { _id: id },
    {
      Epmloyye_UIF:uif.toFixed(2),
      Epmloyye_Fines: FineQuery,
      Epmloyee_Basic_Final_Salary: finalsalaryadding_allowance.toFixed(2),
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
      Epmloyee_Basic_Salary: employeeBasicSalaryQeury,
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

//Updating leavedays
app.post('/leavedays', (req, res) => {
  const id = req.body.id;
  const daysTakenQuery = req.body.daystaken;
  const daysallocatedqyuery = req.body.daysallocated;

  const EmployeeLeaveDaysLeftQuery = daysallocatedqyuery - daysTakenQuery;

  console.log("Employee ID: " + id);
  console.log("Days taken: " + daysTakenQuery);
  console.log("Days Left: " + EmployeeLeaveDaysLeftQuery);
  console.log("Days Allocated: " + daysallocatedqyuery);
  
  Payrollsmodel.findOneAndUpdate(
    { _id: id },
    {
      Employee_Leave_Days_total: daysallocatedqyuery,
      Employee_Leave_Days_left: EmployeeLeaveDaysLeftQuery,
      Employee_Leave_Days_Taken: daysTakenQuery
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

//Saving monthly payrolls
const payrollSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  Employeenumber: { type: [String ]||[Number], required: true },
  EmployeeLastName: { type: [String ]||[Number], required: true },
  EmployeeFirstName: { type: [String ]||[Number], required: true },
  Position: { type: [String ]||[Number], required: true },
  EmployeeDepartment: { type: [String ]||[Number], required: true },
  EpmloyeeBasicSalary: { type: [String ]||[Number], required: true },
  Hoursworked: { type: [String ]||[Number], required: true },
  EmployeeAllowance: { type:[String ]||[Number], required: true },
  MedicalAid: { type:[String ]||[Number], required: true },
  EpmloyyeTax: { type: [String ]||[Number], required: true },
  EpmloyyeUIF: { type: [String ]||[Number], required: true },
  EpmloyyeFines: { type: [String ]||[Number], required: true },
  Epmloyee_BasicFinalSalary: { type: [String ]||[Number], required: true },
  EmployeeHoursRate:{ type: [String ]||[Number], required: true },
  EpmloyyeTotal: { type: String, required: true },

  }
);

const PayrollModelRollouts = mongoose.model('Payrollrollout', payrollSchema);
app.post('/commits', (req, res) => {
  const DateQuery = req.body.checkedDate;
  const EmNoQuery = req.body.EmNo;
  const FNQuery = req.body.FN;
  const LNQuery = req.body.LN;
  const PSQuery = req.body.PS;
  const EDQuery = req.body.ED;
  const EBSQuery = req.body.EBS;
  const EHRQuery = req.body.EHR;
  const HWQuery = req.body.HW;
  const EAQuery = req.body.EA;
  const MAQuery = req.body.MA;
  const ETQuery = req.body.ET;
  const EUQuery = req.body.EU;
  const EFQuery = req.body.ET;
  const EFBSQuery = req.body.EFBS;
  const totalSQuery = req.body.totalS;

  console.log('EmailQuery:',DateQuery);
  console.log('EmNoQuery:',EmNoQuery);
  console.log('FNQuery:',FNQuery);
  console.log('LNQuery:',LNQuery);
  console.log('PSQuery:',PSQuery);
  console.log('EDQuery:',EDQuery);
  console.log('EBSQuery:',EBSQuery);
  console.log('EBSQuery:',EHRQuery);
  console.log('HWQuery:',HWQuery);
  console.log('EAQuery:',EAQuery);
  console.log('MAQuery:',MAQuery);
  console.log('ETQuery:',ETQuery);
  console.log('EUQuery:',EUQuery);
  console.log('EFQuery:',EFQuery);
  console.log('EFBSQuery:',EFBSQuery);
  console.log( typeof'totalSQuery:',totalSQuery);

  const PayrollSaveRollouts = new PayrollModelRollouts(
    {
      date : DateQuery,
      Employeenumber: EmNoQuery,
      EmployeeLastName: FNQuery,
      EmployeeFirstName: LNQuery,
      Position : PSQuery,
      EmployeeDepartment: EDQuery,
      EpmloyeeBasicSalary:EBSQuery,
      EmployeeHoursRate:EHRQuery,
      Hoursworked: HWQuery,
      EmployeeAllowance:EAQuery,
      MedicalAid:MAQuery,
      EpmloyyeTax: ETQuery,
      EpmloyyeUIF:EUQuery,
      EpmloyyeFines: EFQuery,
      Epmloyee_BasicFinalSalary:EFBSQuery,
      EpmloyyeTotal: totalSQuery,  
    }); 
  // const payrollsave = new PayrollModel(payrollrollouts);
  PayrollSaveRollouts.save().then(() => res.redirect("/Payroll.html")).catch(err => {
     console.error(err);
     res.status(500).send(`
     <div style="background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
       <strong>Error:</strong> ${err}
     </div>
   `);
   });
});

// getting previous payroll commits from database'
app.get('/PayrollCommits.html', (req, res) => {
  PayrollModelRollouts.find(
    { },
    function (err, EmployeeDetails) {
    if (err) {
      console.log(err) 
    } else {
      //  console.log(EmployeeDetails)
    }
    res.render("payrollcommits", {listTitle: "Today", Learn: EmployeeDetails,
    
  
  });
  });
});
















app.post('/EmployeeInfoUpdate', (req, res) => {

  const id = req.body.id;
  
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
 
 
  // console.log("tax amount is " + salaryAfterTaxQuery + employeeBasicSalaryQeury )

  Payrollsmodel.findOneAndUpdate(
    { _id: id },
    {
    
     
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

app.post("/Addnewemployee", function(req, res){
      const  Fist_NameQuery = req.body.FirstName;
      const  LastNamneQuery = req.body.LastName;
      const  ImagelinkQuery = req.body.Imagelink;
      const  EmailaddressQuery = req.body.Emailaddress;
      const ContactNumberQuery = req.body.Contactnumber;
      const AternatviContactsQuery = req.body.alternativecontacts;
      const IDNoQuery = req.body.IDNo;
      const TAXQuery = req.body.TaxNo;
      const NatinalityQuery = req.body.Natinality;
      const TitleQuery = req.body.Title;
      const HomeaddressQuery = req.body.Homeaddress;
      const HourrateQuery = req.body.Hourrate;
      const JobTitleQuery = req.body.JobTitle;
      const DepartmentbodyQuery = req.body.Departmentbody;
      const DaysallowqueryQuery = req.body.daysAllocated;
      console.log(Fist_NameQuery)
      console.log(LastNamneQuery)
      console.log(ImagelinkQuery)
      console.log(EmailaddressQuery)
      console.log(ContactNumberQuery)
      console.log(AternatviContactsQuery)
      console.log(IDNoQuery)
      console.log(TAXQuery)
      console.log(NatinalityQuery)
      console.log(TitleQuery)
      console.log(HomeaddressQuery)
      console.log(HourrateQuery)
      console.log(JobTitleQuery)
      console.log(DepartmentbodyQuery)
      console.log(DaysallowqueryQuery)
  const PayrollSave = new Payrollsmodel(
    {
      Employee_Profile_Picture: ImagelinkQuery,
      Employee_email_adsress: EmailaddressQuery,
      Employee_number: EmployeeNumberModel,
      EmployeeTitle: TitleQuery,
      Employee_Tax_Number: TAXQuery,
      EpmloyyeID_Number: IDNoQuery,
      Epmloyye_Contact: ContactNumberQuery,
      Epmloyye_Altenative_Contact:AternatviContactsQuery,
      Epmloyye_UIF: "0",
      Epmloyye_TAX: "0",
      Epmloyye_PAYE: "0",
      Epmloyye_SDL:"0",
      Epmloyye_hour_Rate:HourrateQuery,
      Epmloyee_Basic_Salary:'0',
      Epmloyee_Basic_Final_Salary:"0",
      Epmloyye_Fines: "0",
      Employee_CitizenShip:"South Africa",
      Employee_Nationality: NatinalityQuery,
      Employee_Department: DepartmentbodyQuery,
      Employee_Leave_Days_total: DaysallowqueryQuery,
      Employee_Leave_Days_Taken:"0",
      Employee_Leave_Days_left: "0",
      Employee_Home_Address: HomeaddressQuery,
      Employee_LastName: LastNamneQuery,
      Employee_FirstName: Fist_NameQuery,
      Hours_worked: "0",
      Postion: JobTitleQuery,
      Employee_Allowance:"0",
      Medical_Aid:"0",
    });
  PayrollSave.save().then(() => res.redirect("/"));
});


//Geeting data from DB to Front End to mian page
app.get('/dashbord.html', (req, res) => {
  Payrollsmodel.find(
    { },
    function (err, EmployeeDetails) {
    if (err) {
      console.log(err) 
    } else { 
      // console.log(EmployeeDetails)
    }
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
        // console.log(EmployeeDetails);
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
        // console.log(EmployeeDetails);
        res.render("payroll", { listTitle: "Today", Learn: EmployeeDetails });
      }
    }
  );
});
app.post('/searchpaLeave', (req, res) => {
  const searchQuery = req.body.searchQueryName.toLowerCase();

  console.log("Search Query: ", searchQuery);
  Payrollsmodel.find(
    { $or: [
      { Employee_LastName: { $regex: searchQuery, $options: "i" } },
      { Employee_FirstName: { $regex: searchQuery, $options: "i" } },
   
    ]},
    function (err, EmployeeDetails) {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while searching.");
      } else {
        // console.log(EmployeeDetails);
        res.render("leavedays", { listTitle: "Today", Learn: EmployeeDetails });
      }
    }
  );
});


app.post('/searchPayrollRolloutsByDate', (req, res) => {
  const searchQuery = req.body.searchDate;
  const alldatesQuery = req.body.alldates;

  if (alldatesQuery === 'on') {
    PayrollModelRollouts.find({}, function (err, EmployeeDetails) {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while searching.");
      } else {
        res.render("payrollcommits", { listTitle: "All Dates", Learn: EmployeeDetails });
      }
    });
  } else if (searchQuery) {
    PayrollModelRollouts.find({ date: searchQuery }, function (err, EmployeeDetails) {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred while searching.");
      } else {
        res.render("payrollcommits", { listTitle: "Today", Learn: EmployeeDetails });
      }
    });
  } else {
    res.redirect('/PayrollCommits.html');
  }
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



//user authen
const secret = "thisisourlittlesecret.";
userschema.plugin(//encrypt plugin package
   encrypt, {secret:secret, encryptedFields: ['password'] });
const UserModel = new mongoose.model("User", userschema);
const UserSave = new UserModel({
email: "Ronald@gmail.com",
password: "dhidghgvilh",

});
// UserSave.save().then(() => console.log('User added'));

// app.get("/",function(req, res){
//   res.render("home");
// });

app.get("/",function(req, res){
  res.render("login");
});
app.post("/login",function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  UserModel.findOne(
    { email: username },
    
    function (err, foundUser) {
      if (err) {
        console.log(err);
      } else {

        if (foundUser) {
          if (foundUser.password === password) {
        
            Payrollsmodel.find(
              { },
              function (err, EmployeeDetails) {
              if (err) {
                console.log(err) 
              } else { 
                // console.log(EmployeeDetails)
              }
              res.render("list", {listTitle: "Today", Learn: EmployeeDetails,
              });
            });
          }

        }

      }
    }
  );
 
  // UserSave.save().then(() => console.log('User added'));
});
app.get("/register",function(req, res){
  res.render("register");
});
app.post("/register",function(req, res){
  const newUser = new UserModel  ({
    email: req.body.username,
    password: req.body.password,
  });
newUser.save(function (err) {
  if (err){
    console.log(err);

  }else{
    res.render("secrets")
  }
  
})

// UserSave.save().then(() => console.log('User added'));

});
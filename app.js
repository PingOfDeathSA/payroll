//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const learnerInfoSchema = require('./schema');
const teacherSchema = require('./schema');
const AnnouceSchema = require('./schema');
const GenerateNumber = require('./schema');
const AnnouceSchema = require('./schema');
const TearcherSave = require('./schema');
const LearnerSave = require('./schema');
const session = require('express-session');
const Promise = require('bluebird'); // Import Promise library

const passport = require("passport");
const passportLocalMongoose = require('passport-local-mongoose');
const MongoStore = require('connect-mongo')(session);
const LocalStrategy = require('passport-local').Strategy;
// const encrypt= require("mongoose-encryption");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const date = require(__dirname + "/date.js");
mongoose.set('strictQuery', true);




const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('trust proxy', 1);


app.use(session({
  secret: 'THeTerminatorIsHere',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collectionName: 'sessions',
    ttl: 60 * 60 // 1 hour
  })
}));


app.use(passport.initialize());
app.use(passport.session());
mongoose.connect('mongodb+srv://PingOfDeathSA:Ronald438@cluster0.kqlfkdc.mongodb.net/FinalschoolDB');



const userschema= new mongoose.Schema({
  email: String,
  password: String,
  TeacherNumber: Number,
});


userschema.plugin(passportLocalMongoose);


const UserModel = mongoose.model("User", userschema);

passport.use(UserModel.createStrategy());
passport.use(new LocalStrategy({ username: 'email' }, UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());


var GenerateNumberT = Math.floor(Math.random() * 500) + 100;
// Combine the year and student number to create the employee number
var GenTeacherNumber = "2000" + GenerateNumberT;
const UserSave = new UserModel({
  username: "mark@school.co.za",
  password: "testing@443547",
  TeacherNumber: GenTeacherNumber,
});



app.get("/register.html",function(req, res){
  res.render("registerpage");
});
app.post("/register.html",function(req, res){

  UserModel.register({username: req.body.username, TeacherNumber: GenTeacherNumber, }, req.body.password, function (err,user) {
    if(err){
      console.log(err);
      res.redirect("/register.html");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/welcome.html");
      })
      
    }
  });
});

app.get("/welcome.html", function (req, res) {
  if (req.isAuthenticated()){
    TeacherInfomodel.find(
      { },
      function (err, TeacherDi) {
      if (err) {
        console.log(err) 
      } else {
          // console.log(TeacherDi)
      }
      res.render("welecome",
    );
    });

  } else {
    res.redirect("/")
  }
  
})
app.post("/", function(req, res){
  const user = new UserModel({
    username: req.body.username,
    password: req.body.password,
  })
  TeacherUsername = user.username
  console.log("user is" ,TeacherUsername);


  req.logIn( user, function (err) {
    if(err){
      console.log(err)
    } else {
      passport.authenticate("local")(req, res, function () {
        TeacherInfomodel.find({ email_adsress: TeacherUsername }, function (err, TeacherDetails) {
          if (err) {
            console.log(err);
          } else {
             console.log("Teacher Details is", TeacherDetails);
        
            let TeacherSubject = [];
            let TeacherGrade = [];
            TeacherDetails.forEach((teacher) => {
              TeacherSubject = TeacherDetails.map((teacher) => teacher.subject);
              TeacherGrade = TeacherDetails.map((teacher) => teacher.GradeID);
            });
        
            Annoucefomodel.find({}, function (err, Annoces) {
              if (err) {
                console.log(err);
              } else {
                // console.log(Annoces);
              }
              // console.log("TeacherSubject before flattening:", TeacherSubject);
              // console.log("TeacherGrade before flattening:", TeacherGrade);
              
             


// Create an empty array to store the results of each query
let allLearnerDetails = [];

// Flatten the arrays
const TeacherSubjectflat = TeacherSubject.flat();
const TeacherGradeflat = TeacherGrade.flat();

// Define an async function to fetch the learner details
async function fetchLearnerDetails() {
  try {
    let allLearnerDetails = [];
   let subject = [];
    // Loop through each subject and grade combination
    for (let i = 0; i < TeacherSubjectflat.length; i++) {
      for (let j = 0; j < TeacherGradeflat.length; j++) {
         subject = TeacherSubjectflat[i];
        const grade = TeacherGradeflat[j];
console.log('subjects before is ',subject)
        // Fetch the learner details for the current subject and grade
        const learnerDetails = await LearnerInfomodel.find({ subject, GradeID: grade });

        // Check if each learner is already in the allLearnerDetails array
        learnerDetails.forEach((learner) => {
          const alreadyAdded = allLearnerDetails.some((addedLearner) => {
            return addedLearner.id === learner.id;
          });

          // Only add the learner to the array if they haven't already been added
          if (!alreadyAdded) {
            allLearnerDetails.push(learner);
          }
        });
      }
    }
    console.log('all learner data is ',allLearnerDetails)
    var intolist = TeacherSubject
    for (var s = 0; s < intolist.length; s++) {
      var innerList = intolist[s];
      // perform an operation on the inner list here
      console.log(innerList);
    }
//  console.log(intolist)

 Querysubject = innerList;
 const subjectsCount = Querysubject.length;
 const learnersWithResults = new Array(subjectsCount).fill(0);
 const learnersWithoutResults = new Array(subjectsCount).fill(0);
 let totalLearnersWithResults = 0;
 let totalLearnersWithoutResults = 0;
 for (let i = 0; i < subjectsCount; i++) {
   const subject = Querysubject[i];
   const learnersWithResultsForSubject = [];
   const learnersWithoutResultsForSubject = [];
 
   allLearnerDetails.forEach(learner => {
     const tests = learner.OnlineTest;
     const hasResultsForSubject = tests.some(test => test.Subject_Test === subject);
 
     if (hasResultsForSubject) {
       const resultForSubject = tests.find(test => test.Subject_Test === subject).Mark;
       learnersWithResultsForSubject.push({ studentNumber: learner.StudentNumber, mark: resultForSubject || 0, GradeName: learner.GradeID, subject: subject });
       console.log(`Learner with Student Number ${learner.StudentNumber} in Grade ${learner.GradeID} has results for ${subject}: ${resultForSubject}`);
     } else {
       learnersWithoutResultsForSubject.push({ studentNumber: learner.StudentNumber, mark: 0, GradeName: learner.GradeID, subject: subject });
       console.log(`Learner with Student Number ${learner.StudentNumber} in Grade ${learner.GradeID} does not have results for ${subject}`);
     }
   });
 
   learnersWithResults[i] = learnersWithResultsForSubject;
   learnersWithoutResults[i] = learnersWithoutResultsForSubject;
   totalLearnersWithResults += learnersWithResultsForSubject.length;
   totalLearnersWithoutResults += learnersWithoutResultsForSubject.length;
 
   console.log(`Learners with results for ${subject}: ${learnersWithResultsForSubject.length}`);
   console.log(`Learners without results for ${subject}: ${learnersWithoutResultsForSubject.length}`);
   console.log(`Total number of learners for ${subject}: ${learnersWithoutResultsForSubject.length + learnersWithResultsForSubject.length}`);
 }
 
 console.log(`Total learners with results: ${totalLearnersWithResults}`);
 console.log(`Total learners without results: ${totalLearnersWithoutResults}`);
 
 const gradeAverages = {};
 for (let i = 0; i < subjectsCount; i++) {
   const subject = Querysubject[i];
   for (const [grade, learners] of Object.entries(learnersWithResults[i].concat(learnersWithoutResults[i]).reduce((acc, curr) => {
     if (!acc[curr.GradeName]) {
       acc[curr.GradeName] = [];
     }
     acc[curr.GradeName].push(curr);
     return acc;
   }, {}))) {
     const marks = learners.map(learner => learner.mark);
     const averageMark = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
     if (!gradeAverages[grade]) {
       gradeAverages[grade] = {};
     }
     gradeAverages[grade][subject] = averageMark;
   }
 }
 
 console.log('Grade averages:');
 console.log(gradeAverages);
 

 const ymark = [];
 const xsubjects = [];
 const grage = [];
 
 for (let i = 0; i < subjectsCount; i++) {
   const subject = Querysubject[i];
   for (const [grade, learners] of Object.entries(learnersWithResults[i].reduce((acc, curr) => {
     if (!acc[curr.GradeName]) {
       acc[curr.GradeName] = [];
     }
     acc[curr.GradeName].push(curr);
     return acc;
   }, {}))) {
     const marks = learners.map(learner => learner.mark).concat(learnersWithoutResults[i].filter(learner => learner.GradeName === grade).map(learner => learner.mark));
     const averageMark = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
     if (!gradeAverages[grade]) {
       gradeAverages[grade] = {};
     }
     gradeAverages[grade][subject] = averageMark;
     
     // add data to arrays
     ymark.push(averageMark);
     xsubjects.push(subject);
     grage.push(grade);
   }
 }
 
 console.log('Grade averages:');
 console.log(gradeAverages);
 console.log('ymark:', ymark);
 console.log('xsubjects:', xsubjects);
 console.log('grage:', grage);
 const gradeSubjects = [];

 for (let i = 0; i < xsubjects.length; i++) {
   for (let j = 0; j < grage.length; j++) {
     if (gradeAverages[grage[j]] && gradeAverages[grage[j]][xsubjects[i]]) {
       const gradeSubject = `${grage[j]} ${xsubjects[i]}`;
       if (!gradeSubjects.includes(gradeSubject)) {
         gradeSubjects.push(gradeSubject);
       }
     }
   }
 }
 
 console.log('gradeSubjects:', gradeSubjects);
 



    // Render the results
    if (allLearnerDetails.length === 0) {
      res.render("error", {
        message: "Cannot load data, no learners found. Please contact your administrator."
      });
    } else {
       console.log('learners with marks is')
       const now = new Date();
       const options = { year: 'numeric', month: 'long', day: 'numeric' };
       const formattedDate = now.toLocaleDateString(undefined, options);
       res.render("list", {
         Date: formattedDate,
        //  TotalLearners: allLearnerDetails.length,
        yValues: ymark,
        xValues: gradeSubjects,
         LWR: learnersWithResults,
         LWNR: learnersWithoutResults,
         Teacher: TeacherDetails,
         Ann: Annoces,
         Learner: allLearnerDetails,
       });
    }
  } catch (err) {
    console.log(err);
    // Handle error
  }
}


// Call the fetchLearnerDetails function
fetchLearnerDetails();

            });
          }
        });
        



        
      })
    }
  })
  });



//Geeting data of learners from DB to Front End
app.get('/Mylearner.html', (req, res) => {
  if (req.isAuthenticated()){
    const TeacherUsername = req.user;
    console.log("teracher user is ",TeacherUsername)
    TeacherInfomodel.find({ email_adsress: TeacherUsername.username }, function (err, TeacherDetails) {
      if (err) {
        console.log(err);
      } else {
         console.log("Teacher Details is", TeacherDetails);
    
        let TeacherSubject = [];
        let TeacherGrade = [];
        TeacherDetails.forEach((teacher) => {
          TeacherSubject = TeacherDetails.map((teacher) => teacher.subject);
          TeacherGrade = TeacherDetails.map((teacher) => teacher.GradeID);
        });
    
        Annoucefomodel.find({}, function (err, Annoces) {
          if (err) {
            console.log(err);
          } else {
            // console.log(Annoces);
          }
          // console.log("TeacherSubject before flattening:", TeacherSubject);
          // console.log("TeacherGrade before flattening:", TeacherGrade);
          
         


// Create an empty array to store the results of each query
let allLearnerDetails = [];

// Flatten the arrays
const TeacherSubjectflat = TeacherSubject.flat();
const TeacherGradeflat = TeacherGrade.flat();

// Define an async function to fetch the learner details
async function fetchLearnerDetails() {
try {
let allLearnerDetails = [];
let subject = [];
// Loop through each subject and grade combination
for (let i = 0; i < TeacherSubjectflat.length; i++) {
  for (let j = 0; j < TeacherGradeflat.length; j++) {
     subject = TeacherSubjectflat[i];
    const grade = TeacherGradeflat[j];
console.log('subjects before is ',subject)
    // Fetch the learner details for the current subject and grade
    const learnerDetails = await LearnerInfomodel.find({ subject, GradeID: grade });

    // Check if each learner is already in the allLearnerDetails array
    learnerDetails.forEach((learner) => {
      const alreadyAdded = allLearnerDetails.some((addedLearner) => {
        return addedLearner.id === learner.id;
      });

      // Only add the learner to the array if they haven't already been added
      if (!alreadyAdded) {
        allLearnerDetails.push(learner);
      }
    });
  }
}
console.log('all learner data is ',allLearnerDetails)
var intolist = TeacherSubject

for (var s = 0; s < intolist.length; s++) {
  var innerList = intolist[s];
  // perform an operation on the inner list here
  console.log(innerList);
}
//  console.log(intolist)

Querysubject = innerList;
const subjectsCount = Querysubject.length;
const learnersWithResults = new Array(subjectsCount).fill(0);
const learnersWithoutResults = new Array(subjectsCount).fill(0);
let totalLearnersWithResults = 0;
let totalLearnersWithoutResults = 0;

for (let i = 0; i < subjectsCount; i++) {
const subject = Querysubject[i];
const learnersWithResultsForSubject = [];
const learnersWithoutResultsForSubject = [];

allLearnerDetails.forEach(learner => {
 const tests = learner.OnlineTest;
 const hasResultsForSubject = tests.some(test => test.Subject_Test === subject);

 if (hasResultsForSubject) {
   const resultForSubject = tests.find(test => test.Subject_Test === subject).Mark;
   learnersWithResultsForSubject.push({ studentNumber: learner.StudentNumber, mark: resultForSubject || 0, GradeName: learner.GradeID, subject: subject,  });
   const alllearnerswithR = 
   console.log(`Learner with Student Number ${learner.StudentNumber} in Grade ${learner.GradeID} has results for ${subject}: ${subject}`);

 } else {
   learnersWithoutResultsForSubject.push({ studentNumber: learner.StudentNumber, mark: 0, GradeName: learner.GradeID, subject: subject });
   console.log(`Learner with Student Number ${learner.StudentNumber} in Grade ${learner.GradeID} does not have results for ${subject}`);
 }
});

learnersWithResults[i] = learnersWithResultsForSubject;
learnersWithoutResults[i] = learnersWithoutResultsForSubject;
totalLearnersWithResults += learnersWithResultsForSubject.length;
totalLearnersWithoutResults += learnersWithoutResultsForSubject.length;

console.log(`Learners with results for ${subject}: ${learnersWithResultsForSubject.length}`);
console.log(`Learners without results for ${subject}: ${learnersWithoutResultsForSubject.length}`);
console.log(`Total number of learners for ${subject}: ${learnersWithoutResultsForSubject.length + learnersWithResultsForSubject.length}`);
}

console.log(`Total learners with results: ${totalLearnersWithResults}`);
console.log(`Total learners without results: ${totalLearnersWithoutResults}`);


const gradeAverages = {};
for (let i = 0; i < subjectsCount; i++) {
const subject = Querysubject[i];
for (const [grade, learners] of Object.entries(learnersWithResults[i].concat(learnersWithoutResults[i]).reduce((acc, curr) => {
 if (!acc[curr.GradeName]) {
   acc[curr.GradeName] = [];
 }
 acc[curr.GradeName].push(curr);
 return acc;
}, {}))) {
 const marks = learners.map(learner => learner.mark);
 const averageMark = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
 if (!gradeAverages[grade]) {
   gradeAverages[grade] = {};
 }
 gradeAverages[grade][subject] = averageMark;
}
}

console.log('Grade averages:');
console.log(gradeAverages);


const ymark = [];
const xsubjects = [];
const grage = [];

for (let i = 0; i < subjectsCount; i++) {
const subject = Querysubject[i];
for (const [grade, learners] of Object.entries(learnersWithResults[i].reduce((acc, curr) => {
 if (!acc[curr.GradeName]) {
   acc[curr.GradeName] = [];
 }
 acc[curr.GradeName].push(curr);
 return acc;
}, {}))) {
 const marks = learners.map(learner => learner.mark).concat(learnersWithoutResults[i].filter(learner => learner.GradeName === grade).map(learner => learner.mark));
 const averageMark = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
 if (!gradeAverages[grade]) {
   gradeAverages[grade] = {};
 }
 gradeAverages[grade][subject] = averageMark;
 
 // add data to arrays
 ymark.push(averageMark);
 xsubjects.push(subject);
 grage.push(grade);
}
}

console.log('Grade averages:');
console.log(gradeAverages);
console.log('ymark:', ymark);
console.log('xsubjects:', xsubjects);
console.log('grage:', grage);
const gradeSubjects = [];

for (let i = 0; i < xsubjects.length; i++) {
for (let j = 0; j < grage.length; j++) {
 if (gradeAverages[grage[j]] && gradeAverages[grage[j]][xsubjects[i]]) {
   const gradeSubject = `${grage[j]} ${xsubjects[i]}`;
   if (!gradeSubjects.includes(gradeSubject)) {
     gradeSubjects.push(gradeSubject);
   }
 }
}
}

// console.log('gradeSubjects:', gradeSubjects);

// Important data to fillter here to get what ever data based on login teacher
const learnerDetails = [];

allLearnerDetails.forEach(learner => {
  const learnerObj = {
    first_name: learner.first_name,
    last_name: learner.last_name,
    GradeID: learner.GradeID,
    title: learner.title,
    age: learner.age,
    Gender: learner.Gender,
    home_address: learner.home_address,
    email_address: learner.email_address,
    Gandian_First_Name: learner. Gandian_First_Name,
    Gdian_Lat_Name: learner. Gdian_Lat_Name,
    Gadian_title: learner.Gadian_title,
    Gadian_email: learner.Gadian_email,
    Gadian_Home_address: learner.Gadian_Home_address,
    Gadiane_Contacts: learner.Gadiane_Contacts,

    _id: learner.id,

    //this is leaner profile error typo i named it teacher to be fixed
    teacher_profile_picture: learner.teacher_profile_picture,
    StudentNumber: learner.StudentNumber,
    OnlineTest: []
  };

  learner.OnlineTest.forEach(test => {
    if (Querysubject.includes(test.Subject_Test)) {
      const testObj = {
        Subject_Test: test.Subject_Test,
        Mark: test.Mark,
        TestName: test.TestName,
      };
      
      learnerObj.OnlineTest.push(testObj);
      
      if (test.Subject_Test === Querysubject) {
        learnerObj.TestName = test.TestName;
      }
    }
  });

  learnerDetails.push(learnerObj);
});

console.log(learnerDetails);




// let allsONlinrestR = []
// learnerDetails.forEach(onlinet =>{
//   const subjects = onlinet.OnlineTest
//   console.log(onlinet.OnlineTest)
//   allsONlinrestR.push(onlinet.OnlineTest)
// })

console.log("Teacher leaners is",learnerDetails);
console.log("suject to check with is ", Querysubject)


let AlloNlineResults = [];

allLearnerDetails.forEach(takingtestresults => {
  AlloNlineResults.push(takingtestresults.StudentNumber);
  AlloNlineResults.push(...takingtestresults.OnlineTest);
});

console.log(AlloNlineResults);



// Render the results
if (allLearnerDetails.length === 0) {
  res.render("error", {
    message: "Cannot load data, no learners found. Please contact your administrator."
  });
} else {
   console.log('learners with marks is')
   const now = new Date();
   const options = { year: 'numeric', month: 'long', day: 'numeric' };
   const formattedDate = now.toLocaleDateString(undefined, options);
   res.render("Mylearners", {
     Date: formattedDate,
    //  TotalLearners: allLearnerDetails.length,
    yValues: ymark,
    xValues: gradeSubjects,
     LWR: learnersWithResults,
     LWNR: learnersWithoutResults,
     Teacher: TeacherDetails,
     Ann: Annoces,
    TeacherLwithR: learnerDetails,
     Learner: allLearnerDetails,
   });
}
} catch (err) {
console.log(err);
// Handle error
}
}


// Call the fetchLearnerDetails function
fetchLearnerDetails();

        });
      }
    });

  } else {
    res.redirect("/")
  }
});






//Geeting data of learners from DB to Front End
app.get('/dashboard.html', (req, res) => {
  if (req.isAuthenticated()){
    const TeacherUsername = req.user;
    console.log("teracher user is ",TeacherUsername)
    TeacherInfomodel.find({ email_adsress: TeacherUsername.username }, function (err, TeacherDetails) {
      if (err) {
        console.log(err);
      } else {
         console.log("Teacher Details is", TeacherDetails);
    
        let TeacherSubject = [];
        let TeacherGrade = [];
        TeacherDetails.forEach((teacher) => {
          TeacherSubject = TeacherDetails.map((teacher) => teacher.subject);
          TeacherGrade = TeacherDetails.map((teacher) => teacher.GradeID);
        });
    
        Annoucefomodel.find({}, function (err, Annoces) {
          if (err) {
            console.log(err);
          } else {
            // console.log(Annoces);
          }
          // console.log("TeacherSubject before flattening:", TeacherSubject);
          // console.log("TeacherGrade before flattening:", TeacherGrade);
          
         


// Create an empty array to store the results of each query
let allLearnerDetails = [];

// Flatten the arrays
const TeacherSubjectflat = TeacherSubject.flat();
const TeacherGradeflat = TeacherGrade.flat();

// Define an async function to fetch the learner details
async function fetchLearnerDetails() {
try {
let allLearnerDetails = [];
let subject = [];
// Loop through each subject and grade combination
for (let i = 0; i < TeacherSubjectflat.length; i++) {
  for (let j = 0; j < TeacherGradeflat.length; j++) {
     subject = TeacherSubjectflat[i];
    const grade = TeacherGradeflat[j];
console.log('subjects before is ',subject)
    // Fetch the learner details for the current subject and grade
    const learnerDetails = await LearnerInfomodel.find({ subject, GradeID: grade });

    // Check if each learner is already in the allLearnerDetails array
    learnerDetails.forEach((learner) => {
      const alreadyAdded = allLearnerDetails.some((addedLearner) => {
        return addedLearner.id === learner.id;
      });

      // Only add the learner to the array if they haven't already been added
      if (!alreadyAdded) {
        allLearnerDetails.push(learner);
      }
    });
  }
}
console.log('all learner data is ',allLearnerDetails)
var intolist = TeacherSubject
for (var s = 0; s < intolist.length; s++) {
  var innerList = intolist[s];
  // perform an operation on the inner list here
  console.log(innerList);
}
//  console.log(intolist)

Querysubject = innerList;
const subjectsCount = Querysubject.length;
const learnersWithResults = new Array(subjectsCount).fill(0);
const learnersWithoutResults = new Array(subjectsCount).fill(0);
let totalLearnersWithResults = 0;
let totalLearnersWithoutResults = 0;
for (let i = 0; i < subjectsCount; i++) {
const subject = Querysubject[i];
const learnersWithResultsForSubject = [];
const learnersWithoutResultsForSubject = [];

allLearnerDetails.forEach(learner => {
 const tests = learner.OnlineTest;
 const hasResultsForSubject = tests.some(test => test.Subject_Test === subject);

 if (hasResultsForSubject) {
   const resultForSubject = tests.find(test => test.Subject_Test === subject).Mark;
   learnersWithResultsForSubject.push({ studentNumber: learner.StudentNumber, mark: resultForSubject || 0, GradeName: learner.GradeID, subject: subject });
   console.log(`Learner with Student Number ${learner.StudentNumber} in Grade ${learner.GradeID} has results for ${subject}: ${resultForSubject}`);
 } else {
   learnersWithoutResultsForSubject.push({ studentNumber: learner.StudentNumber, mark: 0, GradeName: learner.GradeID, subject: subject });
   console.log(`Learner with Student Number ${learner.StudentNumber} in Grade ${learner.GradeID} does not have results for ${subject}`);
 }
});

learnersWithResults[i] = learnersWithResultsForSubject;
learnersWithoutResults[i] = learnersWithoutResultsForSubject;
totalLearnersWithResults += learnersWithResultsForSubject.length;
totalLearnersWithoutResults += learnersWithoutResultsForSubject.length;

console.log(`Learners with results for ${subject}: ${learnersWithResultsForSubject.length}`);
console.log(`Learners without results for ${subject}: ${learnersWithoutResultsForSubject.length}`);
console.log(`Total number of learners for ${subject}: ${learnersWithoutResultsForSubject.length + learnersWithResultsForSubject.length}`);
}

console.log(`Total learners with results: ${totalLearnersWithResults}`);
console.log(`Total learners without results: ${totalLearnersWithoutResults}`);

const gradeAverages = {};
for (let i = 0; i < subjectsCount; i++) {
const subject = Querysubject[i];
for (const [grade, learners] of Object.entries(learnersWithResults[i].concat(learnersWithoutResults[i]).reduce((acc, curr) => {
 if (!acc[curr.GradeName]) {
   acc[curr.GradeName] = [];
 }
 acc[curr.GradeName].push(curr);
 return acc;
}, {}))) {
 const marks = learners.map(learner => learner.mark);
 const averageMark = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
 if (!gradeAverages[grade]) {
   gradeAverages[grade] = {};
 }
 gradeAverages[grade][subject] = averageMark;
}
}

console.log('Grade averages:');
console.log(gradeAverages);


const ymark = [];
const xsubjects = [];
const grage = [];

for (let i = 0; i < subjectsCount; i++) {
const subject = Querysubject[i];
for (const [grade, learners] of Object.entries(learnersWithResults[i].reduce((acc, curr) => {
 if (!acc[curr.GradeName]) {
   acc[curr.GradeName] = [];
 }
 acc[curr.GradeName].push(curr);
 return acc;
}, {}))) {
 const marks = learners.map(learner => learner.mark).concat(learnersWithoutResults[i].filter(learner => learner.GradeName === grade).map(learner => learner.mark));
 const averageMark = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
 if (!gradeAverages[grade]) {
   gradeAverages[grade] = {};
 }
 gradeAverages[grade][subject] = averageMark;
 
 // add data to arrays
 ymark.push(averageMark);
 xsubjects.push(subject);
 grage.push(grade);
}
}

console.log('Grade averages:');
console.log(gradeAverages);
console.log('ymark:', ymark);
console.log('xsubjects:', xsubjects);
console.log('grage:', grage);
const gradeSubjects = [];

for (let i = 0; i < xsubjects.length; i++) {
for (let j = 0; j < grage.length; j++) {
 if (gradeAverages[grage[j]] && gradeAverages[grage[j]][xsubjects[i]]) {
   const gradeSubject = `${grage[j]} ${xsubjects[i]}`;
   if (!gradeSubjects.includes(gradeSubject)) {
     gradeSubjects.push(gradeSubject);
   }
 }
}
}

console.log('gradeSubjects:', gradeSubjects);




// Render the results
if (allLearnerDetails.length === 0) {
  res.render("error", {
    message: "Cannot load data, no learners found. Please contact your administrator."
  });
} else {
   console.log('learners with marks is')
   const now = new Date();
   const options = { year: 'numeric', month: 'long', day: 'numeric' };
   const formattedDate = now.toLocaleDateString(undefined, options);
   res.render("list", {
     Date: formattedDate,
    //  TotalLearners: allLearnerDetails.length,
    yValues: ymark,
    xValues: gradeSubjects,
     LWR: learnersWithResults,
     LWNR: learnersWithoutResults,
     Teacher: TeacherDetails,
     Ann: Annoces,
     Learner: allLearnerDetails,
   });
}
} catch (err) {
console.log(err);
// Handle error
}
}


// Call the fetchLearnerDetails function
fetchLearnerDetails();

        });
      }
    });

  } else {
    res.redirect("/")
  }
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



app.get('/das', (req, res) => {
  Payrollsmodel.find(
    { },
    function (err, EmployeeDetails) {
    if (err) {
      console.log(err) 
    } else {
      //  console.log(EmployeeDetails)
      
    }
    res.render("userpage", {listTitle: "Today", Learn: EmployeeDetails,
    
  
  });
  });
});


app.get("/logout", function(req, res){
  req.logOut(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});


app.get("/",function(req, res){
  res.render("login");
});




<<<<<<< HEAD
=======
      Payrollsmodel.find({}, function (err, EmployeeDetails) {
        if (err) {
          console.log(err);
        } else { 
           const user = req.user;
  
           UserModel.find({ email: user.email }, function (err, users) {
            if (err) {
              console.log(err);
            } else {
              // console.log("Number of users:", users.length);
              // console.log("Logged-in user email:", user);
      res.render("list", {
        listTitle: "Today",
        Learn: EmployeeDetails,
        userEmail: user,
        userEmailHTML: user.username,
        ComapanyNmae: user.companyname,
      });
            }
          });
        }
      });
     
      
    })
  }
  
})

});
>>>>>>> 7140f906f399370bdd63cdeb9ed485209a3ec9e1
//Geeting data from DB to Front End to mian leavedays page
app.get("/LeavedaysAdmin.html",function(req, res){
  if (req.isAuthenticated()){
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

  } else {
    res.redirect("/")
  }
});

//Geeting data from DB to Front End to mian page
app.get('/dashboard.html', (req, res) => {
  if (req.isAuthenticated()){
    
    Payrollsmodel.find({}, function (err, EmployeeDetails) {
      if (err) {
        console.log(err);
      } else { 
<<<<<<< HEAD
         
=======
         const user = req.user;
>>>>>>> 7140f906f399370bdd63cdeb9ed485209a3ec9e1

         UserModel.find({ email: user.email }, function (err, users) {
          if (err) {
            console.log(err);
          } else {
            console.log("Number of users:", users.length);
            console.log("Logged-in user email:", user);

    res.render("list", {
      listTitle: "Today",
      Learn: EmployeeDetails,
      userEmail: user,
      userEmailHTML: user.username,
      ComapanyNmae: user.companyname,
    });
          }
        });
      }
    });

  } else {
    res.redirect("/")
  }
});





//Geeting data from DB to Front End to Add new employee
app.get('/Mygrades.html', (req, res) => {
  if (req.isAuthenticated()){
    const TeacherUsername = req.user;
    console.log("teracher user is ",TeacherUsername)
    TeacherInfomodel.find({ email_adsress: TeacherUsername.username }, function (err, TeacherDetails) {
      if (err) {
        console.log(err);
      } else {
         console.log("Teacher Details is", TeacherDetails);
    
        let TeacherSubject = [];
        let TeacherGrade = [];
        TeacherDetails.forEach((teacher) => {
          TeacherSubject = TeacherDetails.map((teacher) => teacher.subject);
          TeacherGrade = TeacherDetails.map((teacher) => teacher.GradeID);
        });
    
        Annoucefomodel.find({}, function (err, Annoces) {
          if (err) {
            console.log(err);
          } else {
            // console.log(Annoces);
          }
          // console.log("TeacherSubject before flattening:", TeacherSubject);
          // console.log("TeacherGrade before flattening:", TeacherGrade);
          
         


// Create an empty array to store the results of each query
let allLearnerDetails = [];

// Flatten the arrays
const TeacherSubjectflat = TeacherSubject.flat();
const TeacherGradeflat = TeacherGrade.flat();

// Define an async function to fetch the learner details
async function fetchLearnerDetails() {
try {
let allLearnerDetails = [];
let subject = [];
// Loop through each subject and grade combination
for (let i = 0; i < TeacherSubjectflat.length; i++) {
  for (let j = 0; j < TeacherGradeflat.length; j++) {
     subject = TeacherSubjectflat[i];
    const grade = TeacherGradeflat[j];
console.log('subjects before is ',subject)
    // Fetch the learner details for the current subject and grade
    const learnerDetails = await LearnerInfomodel.find({ subject, GradeID: grade });

    // Check if each learner is already in the allLearnerDetails array
    learnerDetails.forEach((learner) => {
      const alreadyAdded = allLearnerDetails.some((addedLearner) => {
        return addedLearner.id === learner.id;
      });

      // Only add the learner to the array if they haven't already been added
      if (!alreadyAdded) {
        allLearnerDetails.push(learner);
      }
    });
  }
}
console.log('all learner data is ',allLearnerDetails)
var intolist = TeacherSubject
for (var s = 0; s < intolist.length; s++) {
  var innerList = intolist[s];
  // perform an operation on the inner list here
  console.log(innerList);
}
//  console.log(intolist)
var intolistGrade = TeacherGradeflat
for (var t = 0; t < intolistGrade.length; t++) {
  var intoListGrade = intolistGrade[t];
  // perform an operation on the inner list here
  console.log(intoListGrade);
}
//  console.log(var intolistGrade = TeacherGradeflat




Querysubject = innerList;
QueryGrade = [intoListGrade]
Querysubject = innerList;

const subjectsCount = Querysubject.length;
const learnersWithResults = new Array(subjectsCount).fill(0);
const learnersWithoutResults = new Array(subjectsCount).fill(0);
let totalLearnersWithResults = 0;
let totalLearnersWithoutResults = 0;
const learnersByGrade = {};

for (let i = 0; i < subjectsCount; i++) {
  const subject = Querysubject[i];
  const learnersWithResultsForSubject = [];
  const learnersWithoutResultsForSubject = [];

  allLearnerDetails.forEach(learner => {
    const tests = learner.OnlineTest;
    const hasResultsForSubject = tests.some(test => test.Subject_Test === subject);

    if (hasResultsForSubject) {
      const resultForSubject = tests.find(test => test.Subject_Test === subject).Mark;
      learnersWithResultsForSubject.push({ studentNumber: learner.StudentNumber, mark: resultForSubject || 0, GradeName: learner.GradeID, subject: subject });
      console.log(`Learner with Student Number ${learner.StudentNumber} in Grade ${learner.GradeID} has results for ${subject}: ${resultForSubject}`);
    } else {
      learnersWithoutResultsForSubject.push({ studentNumber: learner.StudentNumber, mark: 0, GradeName: learner.GradeID, subject: subject });
      console.log(`Learner with Student Number ${learner.StudentNumber} in Grade ${learner.GradeID} does not have results for ${subject}`);
    }
  });

  learnersWithResults[i] = learnersWithResultsForSubject;
  learnersWithoutResults[i] = learnersWithoutResultsForSubject;
  totalLearnersWithResults += learnersWithResultsForSubject.length;
  totalLearnersWithoutResults += learnersWithoutResultsForSubject.length;

  console.log(`Learners with results for ${subject}: ${learnersWithResultsForSubject.length}`);
  console.log(`Learners without results for ${subject}: ${learnersWithoutResultsForSubject.length}`);
  console.log(`Total number of learners for ${subject}: ${learnersWithoutResultsForSubject.length + learnersWithResultsForSubject.length}`);

  learnersWithResultsForSubject.forEach(learner => {
    const grade = learner.GradeName;
    learnersByGrade[grade] = (learnersByGrade[grade] || 0) + 1;
  });
}

console.log(`Total learners with results: ${totalLearnersWithResults}`);
console.log(`Total learners without results: ${totalLearnersWithoutResults}`);
console.log('Number of learners in each grade:');
console.log(learnersByGrade);

const gradeAverages = {};
for (let i = 0; i < subjectsCount; i++) {
const subject = Querysubject[i];
for (const [grade, learners] of Object.entries(learnersWithResults[i].concat(learnersWithoutResults[i]).reduce((acc, curr) => {
 if (!acc[curr.GradeName]) {
   acc[curr.GradeName] = [];
 }
 acc[curr.GradeName].push(curr);
 return acc;
}, {}))) {
 const marks = learners.map(learner => learner.mark);
 const averageMark = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
 if (!gradeAverages[grade]) {
   gradeAverages[grade] = {};
 }
 gradeAverages[grade][subject] = averageMark;
}
}

console.log('Grade averages:');
console.log(gradeAverages);


const ymark = [];
const xsubjects = [];
const grage = [];

for (let i = 0; i < subjectsCount; i++) {
const subject = Querysubject[i];
for (const [grade, learners] of Object.entries(learnersWithResults[i].reduce((acc, curr) => {
 if (!acc[curr.GradeName]) {
   acc[curr.GradeName] = [];
 }
 acc[curr.GradeName].push(curr);
 return acc;
}, {}))) {
 const marks = learners.map(learner => learner.mark).concat(learnersWithoutResults[i].filter(learner => learner.GradeName === grade).map(learner => learner.mark));
 const averageMark = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
 if (!gradeAverages[grade]) {
   gradeAverages[grade] = {};
 }
 gradeAverages[grade][subject] = averageMark;
 
 // add data to arrays
 ymark.push(averageMark);
 xsubjects.push(subject);
 grage.push(grade);
}
}

const learnersBySubjectAndGrade = {};

for (let i = 0; i < subjectsCount; i++) {
  const subject = Querysubject[i];
  for (const [grade, learners] of Object.entries(learnersWithResults[i].reduce((acc, curr) => {
    if (!acc[curr.GradeName]) {
      acc[curr.GradeName] = [];
    }
    acc[curr.GradeName].push(curr);
    return acc;
  }, {}))) {
    const marks = learners.map(learner => learner.mark).concat(learnersWithoutResults[i].filter(learner => learner.GradeName === grade).map(learner => learner.mark));
    const averageMark = marks.reduce((acc, curr) => acc + curr, 0) / marks.length;
    if (!gradeAverages[grade]) {
      gradeAverages[grade] = {};
    }
    gradeAverages[grade][subject] = averageMark;

    const gradeSubject = `${grade} ${subject}`;
    learnersBySubjectAndGrade[gradeSubject] = learners.length;
  }
}


console.log('Grade averages:');
console.log(gradeAverages);
console.log('ymark:', ymark);
console.log('xsubjects:', xsubjects);
console.log('grage:', grage);
const gradeSubjects = [];

for (let i = 0; i < xsubjects.length; i++) {
for (let j = 0; j < grage.length; j++) {
 if (gradeAverages[grage[j]] && gradeAverages[grage[j]][xsubjects[i]]) {
   const gradeSubject = `${grage[j]} ${xsubjects[i]}`;
   if (!gradeSubjects.includes(gradeSubject)) {
     gradeSubjects.push(gradeSubject);
   }
 }
}
}

console.log('gradeSubjects:', gradeSubjects);


const totalLearnersByGradeSubject = [];

for (let i = 0; i < gradeSubjects.length; i++) {
  const gradeSubject = gradeSubjects[i];
  totalLearnersByGradeSubject[gradeSubject] = learnersBySubjectAndGrade[gradeSubject] || 0;
}

console.log('Total learners in each grade subject:',totalLearnersByGradeSubject);





// Render the results
if (allLearnerDetails.length === 0) {
  res.render("error", {
    message: "Cannot load data, no learners found. Please contact your administrator."
  });
} else {
   console.log('learners with marks is')
   const now = new Date();
   const options = { year: 'numeric', month: 'long', day: 'numeric' };
   const formattedDate = now.toLocaleDateString(undefined, options);
   res.render("Mygrades", {
     Date: formattedDate,
    //  TotalLearners: allLearnerDetails.length,
    yValues: ymark,
    xValues: gradeSubjects,
    TotalNofLPerGradeSubject: totalLearnersByGradeSubject,
     LWR: learnersWithResults,
     LWNR: learnersWithoutResults,
     Teacher: TeacherDetails,
     Ann: Annoces,
     Learner: allLearnerDetails,
   });
}
} catch (err) {
console.log(err);
// Handle error
}
}


// Call the fetchLearnerDetails function
fetchLearnerDetails();

        });
      }
    });

  } else {
    res.redirect("/")
  }
});



// getting previous payroll commits from database'
app.get('/PayrollCommits.html', (req, res) => {

  if (req.isAuthenticated()){
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

  } else {
    res.redirect("/")
  }
});



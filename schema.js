const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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

const learnerInfoSchema = new mongoose.Schema({
    StudentNumber: {
      type: String,
      required: true
    },
    GradeID: {
      type: String,
      required: true
    },
    subject: {
      type: [String],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    Gender: {
      type: String,
      required: true
    },
    home_address: {
      type: String || Number,
      required: true
    },
    Gandian_First_Name: {
      type: String,
      required: true
    },
    Gdian_Lat_Name: {
      type: String,
      required: true
    },
    Gadian_title: {
      type: String || Number,
      required: true
    },
    Gadian_email: {
      type: String,
      required: true
    },
    Gadian_Home_address: {
      type: String || Number,
      required: true
    },
    Gadiane_Contacts: {
      type: Number,
      required: true
    },
    OnlineTest: [{
      Subject_Test: {
        type: String,
        required: true
      },
      Mark: {
        type: Number,
        required: true
      }
    }],
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    teacher_profile_picture: {
      type: String,
      required: true
    },
    email_address: {
      type: String || Number,
      required: true
    }
  });
  
  const teacherSchema = new mongoose.Schema({
    TeacherNumber:{ type: String, required: true},
    GradeID: {
      type: [String],
      required: true
    },
    subject: {
      type: [String],
      required: true
    },
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    teacher_profile_picture: {
      type: String,
      required: true
    },
    email_adsress: {
      type: String || Number,
      required: true
    },
    home_address: {
      type: String|| Number,
      required: true
    },
    Contact_Details: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  });
  const AnnouceSchema = new mongoose.Schema({
    AnM: {
      type: String|| Number,
      required: true
    },
    Date: {
      type: Date,
      required: true,
      default: Date.now
    }
    });
  const TeacherInfomodel = mongoose.model("Teacher_collec", teacherSchema);
  const LearnerInfomodel = mongoose.model("Leaner_collec", learnerInfoSchema);
  const Annoucefomodel = mongoose.model("Announc_collec", AnnouceSchema);
  // Loading product data
  
  var GenerateNumber = Math.floor(Math.random() * 500) + 100;
  // Combine the year and student number to create the employee number
  var GenStudentNumber = "2023" + GenerateNumber;
  
  
  
  const  TearcherSave = new TeacherInfomodel({
    GradeID: ["12B", "11F"],
    subject: ['Natural Science', 'Technology'],
    first_name: 'Mark',
    last_name: 'Smith',
    teacher_profile_picture: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    home_address: "Mashabela",
    Contact_Details: "0942383800",
    title: "Miss",
    email_adsress: 'mark@school.co.za',
  });
  
  const LearnerSave = new LearnerInfomodel({
    StudentNumber: GenStudentNumber,
    GradeID: "9A",
    subject: ['Mathematics','English Home Language','IsiZulu First Additional Language','Life Orientation','Social Sciences','Natural Science','Technology','Economic and Management Sciences','Creative Arts'],
    title: "Ms",
    age: 14,
    Gender: 'Female',
    home_address: "Soweto",
    Gandian_First_Name: "Nomsa",
    Gdian_Lat_Name: "Mabena",
    Gadian_title: "Mrs",
    Gadian_email: "nomsa.mabena@gmail.com",
    Gadian_Home_address: "Soweto",
    Gadiane_Contacts: "0721110000",
    OnlineTest: [
      {
        Subject_Test: "Mathematics",
        Mark: 70,
        TestName: 'Apirl Test 1'
      },
      {
        Subject_Test: "English Home Language",
        Mark: 85 
      },
      {
        Subject_Test: "IsiZulu First Additional Language",
        Mark: 55 
      },
      {
        Subject_Test: "Social Sciences",
        Mark: 80 
      }
    ],
    first_name: 'Lindiwe',
    last_name: 'Mkhize',
    teacher_profile_picture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    email_address: 'lindiwe.mkhize@gmail.com'
  });
  
  
  // TearcherSave.save(function (err) {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             console.log("Teacher added");
  //           }
  // });
  // AnnounceSave.save(function (err) {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             console.log("Announce added");
  //           }
  // });
  // LearnerSave.save(function (err) {
  //           if (err) {
  //             console.log(err);
  //           } else {
  //             console.log("leaerner added");
  //           }
  // });
  


var hours_worked_inputs = document.querySelectorAll(".hours-worked-input");
var hourly_rate_inputs = document.querySelectorAll(".hourly-rate-input");
var basic_salary_inputs = document.querySelectorAll(".basic-salary-input");

function updateBasicSalary() {
  for (var i = 0; i < hours_worked_inputs.length; i++) {
    var hours_worked = parseFloat(hours_worked_inputs[i].value);
    var hourly_rate = parseFloat(hourly_rate_inputs[i].textContent);
    var basic_salary = hours_worked * hourly_rate;
    basic_salary_inputs[i].value = basic_salary.toFixed(2);
  }
}

for (var i = 0; i < hours_worked_inputs.length; i++) {
  hours_worked_inputs[i].addEventListener("input", updateBasicSalary);
}

updateBasicSalary();












// call updateEmployeeTax initially to set the value







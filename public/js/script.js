

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
function updateEmployeeTax() {
  var basicSalaryInput = document.querySelector(".basic-salary-input");
  var Year_income = basicSalaryInput * 12;
  var DeductiontTax = calculateTax(Year_income);
  var YearIncomeAfterTax =  Year_income - DeductiontTax;
var monthlyAfterTax = YearIncomeAfterTax /12;
  console.log(monthlyAfterTax)

}







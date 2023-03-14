var hours_worked = document.getElementById("hours-worked-input");
var hourly_rate_input = document.getElementById("hourly-rate-input");
var basic_salary_input = document.getElementById("basic-salary-input");

function updateBasicSalary() {
  var hourly_rate = parseFloat(hourly_rate_input.textContent);
  var basic_salary = hours_worked.value * hourly_rate;
  basic_salary_input.value = basic_salary.toFixed(2);
}

hours_worked.addEventListener("input", updateBasicSalary);

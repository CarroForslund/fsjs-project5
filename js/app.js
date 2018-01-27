'use strict'
// Variables
const employeesDiv = document.getElementById('employees');
let employees = null;
let searchResult = [];


// Get employees from API
$.ajax({
  url: 'https://randomuser.me/api/?results=12&nat=us&inc=name,picture,email,location,cell,dob,login',
  dataType: 'json',
  error: function() {
    console.error("Couldn't get random users from API");
  },
  success: function(data) {
    employees = data.results;
    displayEmployees(employees);
  },
});

// Create employee card for each employee and add to employees div
function displayEmployees(employees){

  // for each (employee of employeeArray){
  for (let i = 0; i < employees.length; i++){

    // Variables
    const employee = employees[i];
    const employeeNumber = i;
    const portrait = employee.picture.large;
    const name = capitalizeWords(employee.name.first) + ' ' + capitalizeWords(employee.name.last);
    const email = employee.email;
    const city = capitalizeWords(employee.location.city);
    const phone = employee.cell;
    const address = capitalizeWords(employee.location.street) + ', ' + employee.location.postcode;
    const birthday = employee.dob.substr(5, 2) + '/' + employee.dob.substr(8, 2) + '/' + employee.dob.substr(2, 2);
    // Employee Card
    const employeeCard = document.createElement('div');
    employeeCard.className = 'employee-card';
    employeesDiv.appendChild(employeeCard);

    // Employee Portrait
    const employeePortrait = document.createElement('img');
    employeePortrait.className = 'portrait';
    employeePortrait.src = portrait;
    employeePortrait.alt = 'Portrait of ' + name;
    employeeCard.appendChild(employeePortrait);

    // Details Div
    const employeeDetails = document.createElement('div');
    employeeDetails.className = 'details';
    employeeCard.appendChild(employeeDetails);

    // Employee Name
    const employeeName = document.createElement('h2');
    employeeName.innerHTML = name;
    employeeDetails.appendChild(employeeName);

    // Employee Email
    const employeeEmail = document.createElement('p');
    employeeEmail.innerHTML = email;
    employeeDetails.appendChild(employeeEmail);

    // Employee City
    const employeeCity = document.createElement('p');
    employeeCity.innerHTML = city;
    employeeDetails.appendChild(employeeCity);

    // Display more detailed employee info on click
    employeeCard.addEventListener('click', function(){
      displayEmployee(employees, employeeNumber);
    });
  }
}

function displayEmployee(employeeArray, employeeNumber){

  // Variables
  const employee = employeeArray[employeeNumber];
  const portrait = employee.picture.large;
  const name = capitalizeWords(employee.name.first) + ' ' + capitalizeWords(employee.name.last);
  const email = employee.email;
  const city = capitalizeWords(employee.location.city);
  const phone = employee.cell;
  const address = capitalizeWords(employee.location.street) + ', ' + capitalizeWords(employee.location.city) + ' ' + employee.location.postcode;
  const birthday = 'Birthday: ' + employee.dob.substr(5, 2) + '/' + employee.dob.substr(8, 2) + '/' + employee.dob.substr(2, 2);

  const main = document.getElementById('main');

  //Create and display overlay div
  const overlay = document.createElement('div');
  overlay.id = 'overlay';
  main.appendChild(overlay);

  overlay.addEventListener('click', function(event){
    if (event.target !== this) {
      return;
    }
    else {
      overlay.remove();
    }
  });

  //Create and display the employee detailed card
  const hr = document.createElement('hr');
  const employeeCard = document.createElement('div');
  employeeCard.className = 'employee-card-detailed';
  overlay.appendChild(employeeCard);

  //Create close button
  const close = document.createElement('p');
  close.className = 'close-button';
  close.innerHTML = '&times;';
  close.addEventListener('click', function(){
    overlay.remove();
  });
  employeeCard.appendChild(close);

  // Employee Portrait
  const employeePortrait = document.createElement('img');
  employeePortrait.className = 'portrait';
  employeePortrait.src = portrait;
  employeePortrait.alt = 'Portrait of ' + name;
  employeeCard.appendChild(employeePortrait);

  // Employee Name
  const employeeName = document.createElement('h2');
  employeeName.innerHTML = name;
  employeeCard.appendChild(employeeName);

  // Employee Email
  const employeeEmail = document.createElement('p');
  employeeEmail.innerHTML = email;
  employeeCard.appendChild(employeeEmail);

  // Employee City
  const employeeCity = document.createElement('p');
  employeeCity.innerHTML = city;
  employeeCard.appendChild(employeeCity);

  employeeCard.appendChild(hr);

  // Employee Phone
  const employeePhone = document.createElement('p');
  employeePhone.innerHTML = phone;
  employeeCard.appendChild(employeePhone);

  // Employee Address
  const employeeAddress = document.createElement('p');
  employeeAddress.innerHTML = address;
  employeeCard.appendChild(employeeAddress);

  // Employee Birthday
  const employeeBirthday = document.createElement('p');
  employeeBirthday.innerHTML = birthday;
  employeeCard.appendChild(employeeBirthday);

  //Create back and forvard buttons
  const previous = document.createElement('span');
  previous.className = 'browse-button';
  previous.innerHTML = '&lsaquo;'
  employeeCard.appendChild(previous);
  previous.addEventListener('click', function(){

    let employeeArray = null;

    if (searchResult.length === 0){
      employeeArray = employees;
    }
    else {
      employeeArray = searchResult;
    }

    if ((employeeNumber - 1) < 0){
      overlay.remove();
      displayEmployee(employeeArray, employeeArray.length -1);
    }
    else{
      overlay.remove();
      displayEmployee(employeeArray, employeeNumber - 1);
    }

  });

  const next = document.createElement('span');
  next.className = 'browse-button';
  next.innerHTML = '&rsaquo;'
  employeeCard.appendChild(next);
  next.addEventListener('click', function(){

    let employeeArray = null;

    if (searchResult.length === 0){
      employeeArray = employees;
    }
    else {
      employeeArray = searchResult;
    }
    if ((employeeNumber + 1) > employeeArray.length - 1){
      overlay.remove();
      displayEmployee(employeeArray, 0);
    }
    else{
      overlay.remove();
      displayEmployee(employeeArray, employeeNumber + 1);
    }
  });

}

// =============================================================================
// SEARCH
// =============================================================================
const searchField = document.querySelector("input[id='search']");
searchField.onkeyup = function(){

  // Variabe declaration
  const input = searchField.value;
  searchResult = [];

  // Refresh datalist for every character added or removed in iput field
  while (employeesDiv.firstChild) {
    employeesDiv.removeChild(employeesDiv.firstChild);
  }

  //If match save to search result
  for (let i = 0; i < employees.length; i++){
    if (employees[i].name.first.includes(input.toLowerCase())  || employees[i].name.last.includes(input.toLowerCase()) || employees[i].login.username.includes(input.toLowerCase())){
      searchResult.push(employees[i]);
      const employeesDisplayed = document.querySelectorAll('employee-card');
      console.log(searchResult);

    }
  }
  if (searchResult.length === 0){
    const message = document.createElement('p');
    message.innerHTML = 'No match found.'
    employeesDiv.appendChild(message);
    console.log('no match found');
  }
  else {
    displayEmployees(searchResult);
  }

};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================
function capitalizeWords(string) {
  return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// function createAndAppendNode(element, attribute, setting, parentNode){
//   const newNode = document.createElement(`'#{element}'`);
//   newNode.attribute = setting;
//   parentNode.appendChild(newNode);
// }

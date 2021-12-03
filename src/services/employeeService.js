const { Employee, Position } = require('../models');
const moment = require('moment');

let errors = [];

const getAge = (birthday) => {
  const actualDate = new Date();
  const birthdayDate = new Date(birthday);
  const difference = actualDate - birthdayDate;
  const oneYear = 1000 * 60 * 60 * 24 * 360;
  const age = Math.floor( difference / oneYear);
  if ( age < 0) return false;
  return age;
}


async function addEmployee(employeeData) {
  errors = [];
  const { name, tel, birthday, sex, status, positionId } = employeeData;
  const age = getAge(birthday);
  if (!age) errors.push({ code: 400, error: 'Data inválida'});

  if (errors.length) {
    return errors[0];
  }
  const employee = await Employee.create({ name, tel, birthday, age, sex, status, positionId });
  return employee;
}

async function getEmployees() {
  const employees = await Employee.findAll({ include: [{ model: Position, as: 'positions'}]});
  return employees;
}

module.exports = {
  addEmployee,
  getEmployees,
}
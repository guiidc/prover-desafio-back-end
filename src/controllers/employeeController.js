const employeeService = require('../services/employeeService');

async function addEmployee(req, res) {
  const employee = await employeeService.addEmployee(req.body);
  if (employee.error) return res.status(employee.code).json({ message: employee.error })
  return res.json(employee)
}

async function getEmployees(req, res) {
  const employees = await employeeService.getEmployees();
  return res.json(employees);
}

module.exports = {
  addEmployee,
  getEmployees,
}
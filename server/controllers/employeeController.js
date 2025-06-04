import express from "express";

import { User } from "../models/schema.js";


export const addEmployee = async(req, res)=>{
    try {
    const { email, username, department } = req.body;

    if (!email || !username || !department) {
      return res.status(400).json({ message: 'Email, username, and department are required.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const newEmployee = new User({
      email,
      username,
      department,
      roleId: 2,
      role: 'employee'
    });

    await newEmployee.save();

    res.status(201).json({ message: 'Employee added successfully.', employee: newEmployee });
  } catch (error) {
    console.error('Error creating manager:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
}

export const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const employee = await User.findOne({ _id: id, role: 'employee' });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    
    if (updates.email && updates.email !== employee.email) {
      const existingEmail = await User.findOne({ email: updates.email, _id: { $ne: id } });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists.' });
      }
    }

    
    if (updates.email !== undefined) employee.email = updates.email;
    if (updates.username !== undefined) employee.username = updates.username;
    if (updates.department !== undefined) employee.department = updates.department;

    await employee.save();

    res.status(200).json({ message: 'Employee updated successfully.', employee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};



export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await User.findOne({ _id: id, role: 'employee' });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }

    employee.active = 0;
    await employee.save();

    res.status(200).json({ message: 'Employee deleted successfully.' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const employee = await User.findOne({ _id: id, role: 'employee', active: 1 });
      if (!employee) {
        return res.status(404).json({ message: 'employee not found.' });
      }
      return res.status(200).json(employee);
    } else {
      const employees = await User.find({ role: 'employee', active: 1 });
      return res.status(200).json(employees);
    }
  } catch (error) {
    console.error('Error fetching employee(s):', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};



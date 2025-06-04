

import { User } from "../models/schema.js";


export const addManager = async(req, res)=>{
    try {
    const { email, username, department } = req.body;

    if (!email || !username || !department) {
      return res.status(400).json({ message: 'Email, username, and department are required.' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'Email already exists.' });
    }

    const newManager = new User({
      email,
      username,
      department,
      roleId: 1,
      role: 'manager',
    });

    await newManager.save();

    res.status(201).json({ message: 'Manager added successfully.', manager: newManager });
  } catch (error) {
    console.error('Error creating manager:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
}

export const editManager = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const manager = await User.findOne({ _id: id, role: 'manager' });
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found.' });
    }

    
    if (updates.email && updates.email !== manager.email) {
      const existingEmail = await User.findOne({ email: updates.email, _id: { $ne: id } });
      if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists.' });
      }
    }

    
    if (updates.email !== undefined) manager.email = updates.email;
    if (updates.username !== undefined) manager.username = updates.username;
    if (updates.department !== undefined) manager.department = updates.department;

    await manager.save();

    res.status(200).json({ message: 'Manager updated successfully.', manager });
  } catch (error) {
    console.error('Error updating manager:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

export const deleteManager = async (req, res) => {
  try {
    const { id } = req.params;

    const manager = await User.findOne({ _id: id, role: 'manager' });

    if (!manager) {
      return res.status(404).json({ message: 'Manager not found.' });
    }

    manager.active = 0;
    await manager.save();

    res.status(200).json({ message: 'Manager deleted successfully.' });
  } catch (error) {
    console.error('Error deleting manager:', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

export const getManager = async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const manager = await User.findOne({ _id: id, role: 'manager', active: 1 });
      if (!manager) {
        return res.status(404).json({ message: 'manager not found.' });
      }
      return res.status(200).json(manager);
    } else {
      const managers = await User.find({ role: 'manager', active: 1 });
      console.log(managers);
      return res.status(200).json(managers);
    }
  } catch (error) {
    console.error('Error fetching manager(s):', error);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};



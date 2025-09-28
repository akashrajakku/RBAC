import React, { useState, useEffect } from 'react';

import {editEmployee} from '../../services/employee/api';
import { editManager } from '../../services/manager/api';

export default function EditModal({ user, isOpen, onClose }) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    department: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        username: user.username || '',
        department: user.department || ''
      });
    }

  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== user[key]) {
        updatedFields[key] = formData[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      return alert("No changes made.");
    }
    
    const {roleId} = user;

    if(roleId === 1){
      await editManager(user._id, updatedFields);
      alert('manager edited successfully');
      onClose();
    }

    else if(roleId === 2){
      await editEmployee(user._id, updatedFields);
      alert('employee edited successfully');
      onClose();
    }

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className=" p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-white">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-white rounded-xl text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-white rounded-xl text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-white rounded-xl text-white"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border bg-black hover:cursor-pointer hover:bg-gray-950 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-black border border-white hover:bg-gray-950 hover:cursor-pointer text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

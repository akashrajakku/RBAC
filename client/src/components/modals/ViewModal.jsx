import React from 'react';

export default function ViewModal({ user, isOpen, onClose }) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-black mb-4">Manager Details</h2>

        <div className="space-y-3 text-gray-800">
          <div>
            <strong>Username:</strong> <span>{user.username}</span>
          </div>
          <div>
            <strong>Email:</strong> <span>{user.email}</span>
          </div>
          <div>
            <strong>Department:</strong> <span>{user.department}</span>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 hover:cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

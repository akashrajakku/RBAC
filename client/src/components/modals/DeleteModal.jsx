
import { deleteEmployee, deleteManager } from '../../services/api';

export default function DeleteModal({ user, isOpen, onClose }) {

  console.log(user);
  

  const handleDelete = async () => {
    
    if (!user || !user._id) {
    alert("No user selected for deletion.");
    return;
  }

    const {roleId} = user;

    try {
      if(roleId === 1){
          await deleteManager(user._id);
          alert('Manager deleted successfully');
          onClose(); 
      }

      else if(roleId === 2){
          await deleteEmployee(user._id);
          alert('Employee deleted successfully');
          onClose(); 
      }
      
    } catch (error) {
      console.error(error);
      alert(`Failed to delete ${user.role}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Deletion</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong>{user?.username}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-black bg-black hover:bg-green-800 hover:cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-xl bg-black text-white hover:bg-red-700 hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

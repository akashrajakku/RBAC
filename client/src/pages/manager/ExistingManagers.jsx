import { useEffect, useState } from "react";
import { getManager } from "../../services/manager/api";
import Heading from "../../components/ui/Heading";
import Manage from "../../components/ui/Manage";
import EditModal from "../../components/modals/EditModal";
import DeleteModal from "../../components/modals/DeleteModal";
import ViewModal from "../../components/modals/ViewModal";
import UserCard from "../../components/ui/UserCard";


function ExistingManagers() {
  const [managers, setManagers] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [currentManager, setCurrentManager] = useState(null);

  useEffect(() => {
    const fetchManagers = async()=>{
       const managers = await getManager();
       console.log(managers.data);
       setManagers(managers.data);
    }

    fetchManagers();
  }, [editModal, deleteModal])

  const handleEdit = (manager)=>{
    setCurrentManager(manager);
    setEditModal(true);
  }

  const handleView = (manager)=>{
      setCurrentManager(manager);
      setViewModal(true);
  }

  const handleDelete = (manager)=>{
      setCurrentManager(manager);
      setDeleteModal(true);
  }

  const onCloseEdit = ()=>{
    setEditModal(false);
  }

  const onCloseDelete = ()=>{
    setDeleteModal(false);
  }

  const onCloseView = ()=>{
    setViewModal(false);
  }
  
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <Heading label="Your Existing Managers" />
      </div>

      {/* Managers Grid */}
      {managers.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {managers.map((manager, index) => (
              <UserCard 
                key={manager.id || index} 
                user={{...manager, role: 'manager'}} 
                index={index} 
                showActions={true} 
                onEdit={() => handleEdit(manager)}
                onView={() => handleView(manager)}
                onDelete={() => handleDelete(manager)}
              />
            ))}
          </div>
          
          {/* Stats footer */}
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total Managers: <span className="font-semibold text-purple-600">{managers.length}</span></span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                All managers loaded successfully
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {managers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No managers found</h3>
          <p className="text-gray-500">There are no managers to display at the moment.</p>
        </div>
      )}

      {/* Modals */}
      {editModal && (
        <EditModal 
          user={currentManager} 
          isOpen={editModal} 
          onClose={onCloseEdit}
        />
      )}
      {deleteModal && (
        <DeleteModal 
          user={currentManager} 
          isOpen={deleteModal} 
          onClose={onCloseDelete}
        />
      )}
      {viewModal && (
        <ViewModal 
          user={currentManager} 
          isOpen={viewModal} 
          onClose={onCloseView}
        />
      )}
    </div>
  );

}

export default ExistingManagers
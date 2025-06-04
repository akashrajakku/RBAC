import { useEffect, useState } from "react";
import { getManager } from "../../services/api";
import Heading from "../ui/Heading";
import Manage from "../ui/Manage";
import EditModal from "../modals/EditModal";
import DeleteModal from "../modals/DeleteModal";
import ViewModal from "../modals/ViewModal";


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
    <div className="text-white">
      <Heading label="Your Existing Managers"/>

      <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead  className="py-4">
              <tr>
                <th className="border border-gray-300 px-4 py-2">S. No.</th>
                <th className="border border-gray-300 px-4 py-2">Username</th>
                <th className="border border-gray-300 px-4 py-2">Email Address</th>
                <th className="border border-gray-300 px-4 py-2">Department</th>
                <th className="border border-gray-300 px-4 py-2">Manage</th>
              </tr>
          </thead>
          
          <tbody>
              {managers.map((manager, index)=>{
                const {username, email, department} = manager;
                 return (
                    <tr>
                       <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                       <td className="border border-gray-300 px-4 py-2">{username}</td>
                       <td className="border border-gray-300 px-4 py-2">{email}</td>
                       <td className="border border-gray-300 px-4 py-2">{department}</td>
                       <td className="border border-gray-300 px-4 py-2">
                          <Manage onEdit={()=> handleEdit(manager)} 
                                  onView={()=> handleView(manager)}
                                  onDelete={()=> handleDelete(manager)}/>
                        </td>
                    </tr>
                 )
              })}
          </tbody>
      </table>

      

      {editModal && <EditModal user={currentManager} isOpen={editModal} onClose={onCloseEdit}/>}

      {deleteModal && <DeleteModal user={currentManager} isOpen={deleteModal} onClose={onCloseDelete}/>}

      {viewModal && <ViewModal user={currentManager} isOpen={viewModal} onClose={onCloseView}/>} 
    </div>
  )
}

export default ExistingManagers
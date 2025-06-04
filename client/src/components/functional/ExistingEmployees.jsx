import { useEffect, useState } from "react";
import { getEmployee } from "../../services/api";
import Heading from "../ui/Heading";
import Manage from "../ui/Manage";
import EditModal from "../modals/EditModal";
import DeleteModal from "../modals/DeleteModal";
import ViewModal from "../modals/ViewModal";


function ExistingEmployees() {
  const [employees, setEmployees] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async()=>{
       const employees = await getEmployee();
       console.log(employees.data);
       setEmployees(employees.data);
    }

    fetchEmployees();
  }, [editModal, deleteModal])

  const handleEdit = (employee)=>{
    setCurrentEmployee(employee);
    setEditModal(true);
  }

  const handleView = (employee)=>{
      setCurrentEmployee(employee);
      setViewModal(true);
  }

  const handleDelete = (employee)=>{
      setCurrentEmployee(employee);
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
      <Heading label="Your Existing Employees"/>

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
              {employees.map((employee, index)=>{
                const {username, email, department} = employee;
                 return (
                    <tr>
                       <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                       <td className="border border-gray-300 px-4 py-2">{username}</td>
                       <td className="border border-gray-300 px-4 py-2">{email}</td>
                       <td className="border border-gray-300 px-4 py-2">{department}</td>
                       <td className="border border-gray-300 px-4 py-2">
                          <Manage onEdit={()=> handleEdit(employee)} 
                                  onView={()=> handleView(employee)}
                                  onDelete={()=> handleDelete(employee)}/>
                        </td>
                    </tr>
                 )
              })}
          </tbody>
      </table>

      

      {editModal && <EditModal user={currentEmployee} isOpen={editModal} onClose={onCloseEdit}/>}

      {deleteModal && <DeleteModal user={currentEmployee} isOpen={deleteModal} onClose={onCloseDelete}/>}

      {viewModal && <ViewModal user={currentEmployee} isOpen={viewModal} onClose={onCloseView}/>} 
    </div>
  )
}

export default ExistingEmployees
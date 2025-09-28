import { useEffect, useState } from "react";
import { getEmployee } from "../../services/employee/api";
import Heading from "../../components/ui/Heading";
import UserCard from "../../components/ui/UserCard";
import EditModal from "../../components/modals/EditModal";
import DeleteModal from "../../components/modals/DeleteModal";
import ViewModal from "../../components/modals/ViewModal";


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
    <div className="min-h-screen bg-gray-50 p-6">
   
      <div className="mb-8">
        <Heading label="Your Existing Employees" />
      </div>

      
      {employees.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {employees.map((employee, index) => (
              <UserCard 
                key={employee.id || index} 
                user={{...employee, role: 'employee'}} 
                index={index} 
                showActions={true} 
                onEdit={() => handleEdit(employee)}
                onView={() => handleView(employee)}
                onDelete={() => handleDelete(employee)}
              />
            ))}
          </div>
          
          
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total Employees: <span className="font-semibold text-purple-600">{employees.length}</span></span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                All employees loaded successfully
              </span>
            </div>
          </div>
        </div>
      )}

     
      {employees.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-500">There are no employees to display at the moment.</p>
        </div>
      )}

    
      {editModal && (
        <EditModal 
          user={currentEmployee} 
          isOpen={editModal} 
          onClose={onCloseEdit}
        />
      )}
      {deleteModal && (
        <DeleteModal 
          user={currentEmployee} 
          isOpen={deleteModal} 
          onClose={onCloseDelete}
        />
      )}
      {viewModal && (
        <ViewModal 
          user={currentEmployee} 
          isOpen={viewModal} 
          onClose={onCloseView}
        />
      )}
    </div>
  );
}

export default ExistingEmployees
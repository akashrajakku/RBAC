import NewEmployee from '../employee/NewEmployee';
import ExistingEmployees from '../employee/ExistingEmployees';

function ManageEmployees({employeeActivity}) {
  return (
    <div>
      {employeeActivity==='new' && <NewEmployee />}
      {employeeActivity==='existing' && <ExistingEmployees />}
    </div>
  )
}

export default ManageEmployees
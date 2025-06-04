import NewEmployee from './NewEmployee';
import ExistingEmployees from './ExistingEmployees';

function ManageEmployees({employeeActivity}) {
  return (
    <div>
      {employeeActivity==='new' && <NewEmployee />}
      {employeeActivity==='existing' && <ExistingEmployees />}
    </div>
  )
}

export default ManageEmployees
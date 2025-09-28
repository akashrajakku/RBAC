import ExistingManagers from "../manager/ExistingManagers"
import NewManager from "../manager/NewManager"

function ManageManagers({managerActivity}) {
  return (
    <div>
      {managerActivity==='new' && <NewManager />}
      {managerActivity==='existing' && <ExistingManagers />}
    </div>
  )
}

export default ManageManagers
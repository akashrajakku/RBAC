import ExistingManagers from "./ExistingManagers"
import NewManager from "./NewManager"

function ManageManagers({managerActivity}) {
  return (
    <div>
      {managerActivity==='new' && <NewManager />}
      {managerActivity==='existing' && <ExistingManagers />}
    </div>
  )
}

export default ManageManagers
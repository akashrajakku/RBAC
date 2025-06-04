

function Navbar({ setActiveTab, setManagerActivity, setEmployeeActivity}) {
    
    return (
        <div className="w-full text-white flex justify-evenly p-3 border-b-2 border-gray-700">
            <div className="flex justify-center items-center gap-1.5 relative group hover:cursor-pointer">
                <div className="text-xl p-2 font-semibold hover:cursor-pointer" onClick={() => setActiveTab('managers')}>
                    Manage Managers
                </div>

                <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>

                <div className="absolute left-0 -bottom-[110px] w-56 bg-white border rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-1000">
                    <ul className="p-0.5">
                        <li className="px-4 py-2 hover:bg-blue-200 text-black cursor-pointer text-md"
                            onClick={() => {
                                setActiveTab('managers')
                                setManagerActivity("new");
                            }}

                        >Add New Managers</li>
                        <li className="px-4 py-2 hover:bg-blue-200 text-black cursor-pointer text-md"
                            onClick={() => {
                                setActiveTab('managers')
                                setManagerActivity("existing");
                            }}
                        >Manage Existing Managers</li>
                    </ul>
                </div>
            </div>

            <div className="flex justify-center items-center gap-1.5 relative group hover:cursor-pointer">
                <div className="text-xl p-2 font-semibold hover:cursor-pointer" onClick={() => setActiveTab('employees')}>
                    Manage Employees
                </div>

                <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                </svg>

                <div className="absolute left-0 -bottom-[110px] w-56 bg-white border rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-1000">
                    <ul className="p-0.5">
                        <li className="px-4 py-2 hover:bg-blue-200 text-black cursor-pointer text-md"
                            onClick={() => {
                                setActiveTab("employees");
                                setEmployeeActivity("new");
                            }}

                        >Add New Employees</li>
                        <li className="px-4 py-2 hover:bg-blue-200 text-black cursor-pointer text-md"
                            onClick={() => {
                                setActiveTab("employees");
                                setEmployeeActivity("existing");
                            }}
                        >Manage Existing Employees</li>
                    </ul>
                </div>
            </div>


            <div className="flex justify-center items-center gap-1.5">
                <div className="text-xl p-2 font-semibold hover:cursor-pointer" onClick={() => setActiveTab('getall')}>
                    Get All
                </div>
            </div>
        </div>
    )
}

export default Navbar
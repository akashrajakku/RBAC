const UserProfile = ({ user }) => {
  if (!user) return <div>No Employee data available.</div>;

  console.log("control reached here", user); 

  return (
    <div className="w-1/3 mx-auto p-10 bg-black border border-white rounded-xl shadow-md mt-20 flex flex-col items-center justify-center gap-5">
      <h2 className="text-2xl font-semibold text-center text-white">Employee Profile</h2>

      <div className="text-white">
        <p className="text-xl flex gap-3"><strong>Name:</strong> {user.username}</p>
        <p className="text-xl flex gap-3"><strong>Email:</strong> {user.email}</p>
        <p className="text-xl flex gap-3"><strong>Role:</strong> {user.role}</p>
        <p className="text-xl flex gap-3"><strong>Department:</strong> {user.department}</p>
      </div>
    </div>
  );
};

export default UserProfile;

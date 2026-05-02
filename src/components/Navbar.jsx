

// const Navbar = () => {
//   const token = localStorage.getItem("token");

//   const handleLogin = () => {
//     window.location.href = "http://localhost:5001/api/auth/github";
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
//   };

//   return (
//     <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between">
//       <h1 className="text-xl font-bold">GitHub API App</h1>

//       {token ? (
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       ) : (
//         <button
//           onClick={handleLogin}
//           className="bg-green-500 px-4 py-2 rounded"
//         >
//           Login with GitHub
//         </button>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ loggedIn: true });
    }
  }, []);

  const login = () => {
    window.location.href = "http://localhost:5001/api/auth/github";
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">GitHub Dashboard</h1>

      {user ? (
        <button
          onClick={logout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={login}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Login with GitHub
        </button>
      )}
    </nav>
  );
};

export default Navbar;
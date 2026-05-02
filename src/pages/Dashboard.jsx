import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/dashboard");
    }

    fetchUserData();
  }, [location.search]);

  const fetchUserData = async () => {
    try {
      const res = await API.get("/repos/kaustavvdeka");

      const repoData = res.data.data;
      setRepos(repoData);

      if (repoData.length > 0) {
        setUser(repoData[0].owner);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center gap-6 mb-8">
        <img
          src={user.avatar_url}
          alt="avatar"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{user.login}</h2>
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            View GitHub Profile
          </a>
        </div>
      </div>

      {/* Repo Grid */}
      <h3 className="text-xl font-semibold mb-4">Repositories</h3>

      {repos.length === 0 ? (
        <p>No repositories found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-lg">{repo.name}</h4>

              <p className="text-sm text-gray-600">
                {repo.description || "No description"}
              </p>

              <div className="flex justify-between mt-3 text-sm">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 mt-2 inline-block"
              >
                View Repo →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
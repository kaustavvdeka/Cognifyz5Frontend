const RepoCard = ({ repo }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold">{repo.name}</h2>
      <p className="text-gray-600 text-sm">{repo.description}</p>
      <a
        href={repo.html_url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 text-sm mt-2 inline-block"
      >
        View Repo
      </a>
    </div>
  );
};

export default RepoCard;
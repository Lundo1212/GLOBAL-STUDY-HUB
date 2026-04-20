export default function Universities() {
  const universities = [
    { name: "Harvard University", link: "https://harvard.edu" },
    { name: "MIT", link: "https://mit.edu" },
    { name: "Oxford University", link: "https://ox.ac.uk" }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold mb-6">Top Universities</h1>

      {universities.map((u, i) => (
        <div key={i} className="bg-white text-black p-4 mb-3 rounded flex justify-between">
          <span>{u.name}</span>
          <a href={u.link} target="_blank">
            Apply
          </a>
        </div>
      ))}

    </div>
  );
}
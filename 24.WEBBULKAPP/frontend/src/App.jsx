import { useState } from "react";

export default function App() {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0] ?? null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file (Name,Age columns)");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/users/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      alert(data.message);
      await loadData();
    } catch (err) {
      alert("Upload error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTableData(data);
    } catch (err) {
      alert("Error loading data: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>CSV → Insert into nirmaan_test01.users_s</h2>

      <div style={{ marginBottom: 12 }}>
        <input type="file" accept=".csv" onChange={handleFileSelect} />
        <button onClick={handleUpload} style={{ marginLeft: 10 }} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
        <button onClick={loadData} style={{ marginLeft: 10 }}>
          Refresh Table
        </button>
      </div>

      <div>
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Age</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr><td colSpan="3">No data</td></tr>
            ) : (
              tableData.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.age}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

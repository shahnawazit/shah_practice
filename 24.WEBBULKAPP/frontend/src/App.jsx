import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([]);

  const handleFileSelect = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/users/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);

    loadData();
  };

  const loadData = async () => {
    const res = await fetch("http://localhost:5000/api/users");
    const data = await res.json();
    setTableData(data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>CSV Upload → Insert into PostgreSQL</h2>

      {/* File select */}
      <input type="file" accept=".csv" onChange={handleFileSelect} />

      <button
        onClick={handleUpload}
        style={{ marginLeft: "10px", padding: "5px 15px" }}
      >
        Upload
      </button>

      <h3 style={{ marginTop: "30px" }}>Data from table</h3>

      <button onClick={loadData} style={{ marginBottom: "10px" }}>
        Refresh Table
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>

        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

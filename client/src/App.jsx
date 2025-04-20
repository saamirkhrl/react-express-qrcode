import React, { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState("");

  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    const data = await res.json();

    if (data) {
      console.log(data);
      setData(data);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter URL"
        onChange={(e) => {
          setText(e.target.value);
        }}
        value={text}
      />
      <button
        onClick={() => {
          fetchData();
        }}
      >
        Generate QR Code
      </button>

      {data ? (
        <div>
          <img src={`data:image/png;base64,${data.data}`} alt="QR Code" />
          <a href={`data:image/png;base64,${data.data}`} download="qrcode.png">
            Download QR Code Image
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default App;

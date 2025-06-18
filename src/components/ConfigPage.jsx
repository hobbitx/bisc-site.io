import React, { useState, useEffect } from "react";
import CardGrid from "./CardGrid";

export default function ConfigPage() {
  // Load cards from localStorage on mount
  const [raidCards, setRaidCards] = useState([]);
  const [dgCards, setDgCards] = useState([]);
  const [raidForm, setRaidForm] = useState({ title: "", desc: "", videoUrl: "" });
  const [dgForm, setDgForm] = useState({ title: "", desc: "", videoUrl: "" });
  const [raidEditIdx, setRaidEditIdx] = useState(null);
  const [dgEditIdx, setDgEditIdx] = useState(null);
  const [selectedType, setSelectedType] = useState("raid"); // 'raid' or 'dg'

  useEffect(() => {
    const raid = localStorage.getItem("raidCards");
    const dg = localStorage.getItem("dgCards");
    if (raid) setRaidCards(JSON.parse(raid));
    if (dg) setDgCards(JSON.parse(dg));
  }, []);

  function handleRaidChange(e) {
    const { name, value } = e.target;
    setRaidForm(f => ({ ...f, [name]: value }));
  }
  function handleDgChange(e) {
    const { name, value } = e.target;
    setDgForm(f => ({ ...f, [name]: value }));
  }
  function handleRaidSubmit(e) {
    e.preventDefault();
    if (!raidForm.title || !raidForm.desc) return;
    let newCards;
    if (raidEditIdx !== null) {
      newCards = raidCards.map((c, i) => (i === raidEditIdx ? raidForm : c));
    } else {
      newCards = [...raidCards, raidForm];
    }
    setRaidCards(newCards);
    localStorage.setItem("raidCards", JSON.stringify(newCards));
    setRaidForm({ title: "", desc: "", videoUrl: "" });
    setRaidEditIdx(null);
  }
  function handleDgSubmit(e) {
    e.preventDefault();
    if (!dgForm.title || !dgForm.desc) return;
    let newCards;
    if (dgEditIdx !== null) {
      newCards = dgCards.map((c, i) => (i === dgEditIdx ? dgForm : c));
    } else {
      newCards = [...dgCards, dgForm];
    }
    setDgCards(newCards);
    localStorage.setItem("dgCards", JSON.stringify(newCards));
    setDgForm({ title: "", desc: "", videoUrl: "" });
    setDgEditIdx(null);
  }
  function handleRaidDelete(idx) {
    const newCards = raidCards.filter((_, i) => i !== idx);
    setRaidCards(newCards);
    localStorage.setItem("raidCards", JSON.stringify(newCards));
    if (raidEditIdx === idx) {
      setRaidForm({ title: "", desc: "", videoUrl: "" });
      setRaidEditIdx(null);
    }
  }
  function handleDgDelete(idx) {
    const newCards = dgCards.filter((_, i) => i !== idx);
    setDgCards(newCards);
    localStorage.setItem("dgCards", JSON.stringify(newCards));
    if (dgEditIdx === idx) {
      setDgForm({ title: "", desc: "", videoUrl: "" });
      setDgEditIdx(null);
    }
  }
  function handleRaidEdit(idx) {
    setRaidForm(raidCards[idx]);
    setRaidEditIdx(idx);
    setSelectedType("raid");
  }
  function handleDgEdit(idx) {
    setDgForm(dgCards[idx]);
    setDgEditIdx(idx);
    setSelectedType("dg");
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <h2>Configuração de Cards</h2>
      {/* Slider Toggle */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <button
          onClick={() => setSelectedType("raid")}
          style={{
            padding: "10px 32px",
            fontSize: 18,
            fontWeight: "bold",
            background: selectedType === "raid" ? "#bdbdbd" : "#eee",
            border: "none",
            borderRadius: "16px 0 0 16px",
            cursor: "pointer"
          }}
        >
          Raid Cards
        </button>
        <button
          onClick={() => setSelectedType("dg")}
          style={{
            padding: "10px 32px",
            fontSize: 18,
            fontWeight: "bold",
            background: selectedType === "dg" ? "#bdbdbd" : "#eee",
            border: "none",
            borderRadius: "0 16px 16px 0",
            cursor: "pointer"
          }}
        >
          DG Cards
        </button>
      </div>
      {/* Only show the selected section */}
      {selectedType === "raid" && (
        <div>
          <form onSubmit={handleRaidSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            <input
              name="title"
              value={raidForm.title}
              onChange={handleRaidChange}
              placeholder="Title"
              required
              style={{ padding: 8, fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <textarea
              name="desc"
              value={raidForm.desc}
              onChange={handleRaidChange}
              placeholder="Description"
              required
              rows={3}
              style={{ padding: 8, fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <input
              name="videoUrl"
              value={raidForm.videoUrl}
              onChange={handleRaidChange}
              placeholder="YouTube Video URL (optional)"
              style={{ padding: 8, fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <button type="submit" style={{ padding: 10, fontSize: 16, borderRadius: 6, background: "#bdbdbd", border: "none", cursor: "pointer" }}>
              {raidEditIdx !== null ? "Update Raid Card" : "Add Raid Card"}
            </button>
          </form>
          <h4>Raid Card List</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {raidCards.map((card, idx) => (
              <li key={idx} style={{ marginBottom: 8, background: "#eee", borderRadius: 6, padding: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>
                  <b>{card.title}</b> - {card.desc} {card.videoUrl && (<a href={card.videoUrl} target="_blank" rel="noopener noreferrer">[Video]</a>)}
                </span>
                <span>
                  <button onClick={() => handleRaidEdit(idx)} style={{ marginRight: 8, padding: "4px 10px", borderRadius: 4, border: "none", background: "#bdbdbd", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => handleRaidDelete(idx)} style={{ padding: "4px 10px", borderRadius: 4, border: "none", background: "#e57373", color: "#fff", cursor: "pointer" }}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedType === "dg" && (
        <div>
          <form onSubmit={handleDgSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            <input
              name="title"
              value={dgForm.title}
              onChange={handleDgChange}
              placeholder="Title"
              required
              style={{ padding: 8, fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <textarea
              name="desc"
              value={dgForm.desc}
              onChange={handleDgChange}
              placeholder="Description"
              required
              rows={3}
              style={{ padding: 8, fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <input
              name="videoUrl"
              value={dgForm.videoUrl}
              onChange={handleDgChange}
              placeholder="YouTube Video URL (optional)"
              style={{ padding: 8, fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
            />
            <button type="submit" style={{ padding: 10, fontSize: 16, borderRadius: 6, background: "#bdbdbd", border: "none", cursor: "pointer" }}>
              {dgEditIdx !== null ? "Update DG Card" : "Add DG Card"}
            </button>
          </form>
          <h4>DG Card List</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {dgCards.map((card, idx) => (
              <li key={idx} style={{ marginBottom: 8, background: "#eee", borderRadius: 6, padding: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span>
                  <b>{card.title}</b> - {card.desc} {card.videoUrl && (<a href={card.videoUrl} target="_blank" rel="noopener noreferrer">[Video]</a>)}
                </span>
                <span>
                  <button onClick={() => handleDgEdit(idx)} style={{ marginRight: 8, padding: "4px 10px", borderRadius: 4, border: "none", background: "#bdbdbd", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => handleDgDelete(idx)} style={{ padding: "4px 10px", borderRadius: 4, border: "none", background: "#e57373", color: "#fff", cursor: "pointer" }}>Delete</button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 
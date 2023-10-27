import { useState } from "react";

export default function App() {
  const [items, setItmes] = useState([]);

  function handleAddItems(item) {
    setItmes((items) => [...items, item]);
  }

  function itemDelete(id) {
    setItmes((items) => items.filter((item) => item.id !== id));
  }

  function toggleItem(id) {
    setItmes((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <From onAdditems={handleAddItems} />
      <PackageList
        items={items}
        onDeleteItem={itemDelete}
        onToggleItem={toggleItem}
      />
      <Status items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🇮🇳 The TLA Traveller App 👜</h1>;
}

function From({ onAdditems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function formSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAdditems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={formSubmit}>
      <h3>what do you need for your 🔥 website?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
        {/* <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option> */}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>ADD</button>
    </form>
  );
}

function PackageList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Status({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        🖥️ you have {numItems} extension on your list, and your already purched{" "}
        {numPacked} ({percentage}%)
      </em>
    </footer>
  );
}

import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Kano",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Hiral",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Rathod",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add friend</Button>
      </div>
      <FormSpliteBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you own {friend.name}
          {Math.abs(friend.balance)}£
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          owes you {friend.name}
          {Math.abs(friend.balance)}£
        </p>
      )}

      {friend.balance === 0 && <p>you and {friend.name} are even</p>}
      <Button>Select</Button>
    </li>
  );
}

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label> Friend Name</label>
      <input type="text" />
      <label> Image URL</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}

function FormSpliteBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with x </h2>
      <label>💸 Bill value</label>
      <input type="text" />

      <label>😑 Your Expenses</label>
      <input type="text" />

      <label>🎁 X's expense</label>
      <input type="text" disabled />
      <label>Who is paying the bill</label>
      <select>
        <option value="user">you</option>
        <option value="friend">X</option>
      </select>
      <label>💸 Bill value</label>
      <input type="text" />

      <Button>Split Bill</Button>
    </form>
  );
}

import { useState } from "react";




function App() {
  const [addFriend, setAddFriend] = useState(false)
  const [newFriend, setNewFriend] = useState([])
  const [selectedFriend, setSelectedFriend] = useState(null)
 

  function ToggleFriend() {
    setAddFriend((show) => !show)
  }



  function AddNewFriend(friend) {
    setNewFriend((friends) => [...friends, friend])
  }

  function HandleSubmitFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null: friend))
    setAddFriend(false)
  }

  function OnSplitBill(value) {
    console.log(value)

    setNewFriend((friends) => friends.map((friend) => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value}: friend) )
  }


return (
  <div className="app">
    <div className="sidebar">
    <Logo />
    <Friends  newFriend={newFriend} setSelectedFriend={HandleSubmitFriend}selectedFriend = {selectedFriend}  />
    
    {addFriend && <FormAddFriend AddNewFriend = {AddNewFriend}  />}
    <Button onClick={ToggleFriend}>
      {addFriend ? "Close" : "Add Friend"}
    </Button>
    </div>
    {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}  OnSplitBill={ OnSplitBill} />}
  </div>
)
}

function Logo() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
}


function Friends ({newFriend, setSelectedFriend, selectedFriend}) {



return (
  <ul>
    {newFriend.map((friend) => <Friend friend={friend} name ={friend.name} image ={friend.image} key={friend.id} balance={friend.balance} id = {friend.id} setSelectedFriend={setSelectedFriend} selectedFriend={selectedFriend} />)}
 
  </ul>
)
}

function Friend({name, image, balance, setSelectedFriend, friend, selectedFriend}) {

   const isSelected = selectedFriend?.id === friend.id

  return (
    <li   className = {isSelected ? "selected" : ""}>
   <img src={image} alt={name}/>
    <h3>{name}</h3>
    {!balance ? <p>you and {name} are even</p>:balance === 0 ? <p>you and {name} are even</p>: balance < 0 ? <p className="red">you owe {name} {Math.abs(balance)}</p>: <p className="green">{name} owes you {balance} </p>}
   <Button onClick={()=> setSelectedFriend(friend)}> 
      {isSelected ? "Close" : "Select"}
    </Button>
  </li>
  
  )
}

function Button({children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>

}

function FormAddFriend({AddNewFriend}) {
const [listedName, setListedName] = useState("")
const [listedImage, setListedImage] = useState("")

  function HandleSubmit(e) {
    e.preventDefault();

    if (!listedName) return;

    const listedFriend = {name: listedName, image: listedImage, balance: 0, id: crypto.randomUUID() }
    console.log(listedFriend);
    AddNewFriend(listedFriend);

    setListedName("")
    setListedImage("")
    
  }

  return (
    <form className="form-add-friend"  >
      <label>Friend Name</label>
      <input type="text"  value={listedName} onChange={(e) => setListedName(e.target.value)}/>
      <label >Image Url</label>
      <input type="text" value={listedImage} onChange={(e) => setListedImage(e.target.value)}  />
      <Button onClick={ HandleSubmit}> Add</Button>
    </form>
  )
}

function FormSplitBill({selectedFriend,  OnSplitBill}) {
  const [bill, setBill] = useState("")
  const [expense, setExpense ] = useState("")
  const [paying, setPaying] = useState("you")

  const friendExpense = bill ? bill - expense: "";

  function handleBillSubmit(e) {
    e.preventDefault();

if (!bill || expense <= -1) return;
OnSplitBill(paying === "user" ? friendExpense: -expense )


    setBill("")
    setExpense("")
    setPaying("user")
  }



  return <form className="form-split-bill">
    <h2>Split a bill with {selectedFriend.name}</h2>

    <label>Bill Value</label>
    <input type="number" value={bill} onChange={((e) => setBill(Number(e.target.value)))}/>

    <label>Your Expense</label>
    <input type="number" value={expense} onChange={((e) => setExpense(Number(e.target.value) > bill ? expense: Number(e.target.value)))}/>

    <label>{selectedFriend.name} Expense</label>
    <input type="number" value={friendExpense} disabled/>

    <label>Who's paying the bill?</label>
    <select value={paying} onChange={((e) => setPaying(e.target.value))}>
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>

    <Button onClick={handleBillSubmit}> Split Bill</Button>
  </form>
}



export default App;

import './App.css';
import React, { useState } from 'react'

function App() {

  const [items, setItems] = useState([
    { name: 'btem 1', quantity: 1, isSelected: false, unit: null, price: 20, category: 'food'},
    { name: 'atem 2', quantity: 3, isSelected: true, unit: null, price: 10, category: 'others'},
    { name: 'etem 3', quantity: 2, isSelected: false, unit: null, price: 50, category: 'clothes'},
  ]);

  const [itemName, setName] = useState("");
  const [itemQuantity, setQuantity] = useState(1);
  const [categoryName, setCategory] = useState("");
  const [isAsc, setAsc] = useState(true);

  function handleChange(event){

    const value = event.target.value;
    const eventTargetName = event.target.name;
    console.log(event.target.name);

    switch (eventTargetName) {
      case 'item-name-input':
        setName(value);
        break;
      case 'item-quantity-input':
        setQuantity(value);
        break;
      case 'item-category-input':
        setCategory(value);
        break;
    }

    //setName(value);
    /*
    this.setState({ 
      [field]: event.target.value, 
      result: Number(param1) + Number(param2)
     });
    console.log(this.state.history[this.state.stepNumber].calculations[0]);
     */
  }

  function handleClick() {
    
    //const newItem = {itemName: itemName, quantity: itemQuantity, category: categoryName};

    setItems(prevItems => prevItems.concat([{
        name: itemName, quantity: itemQuantity, category: categoryName
      }]))

      console.log(items);
    
    /*
    const itms = this.state.itms.slice(0, this.state.stepNumber + 1);    
    const current = history[this.state.stepNumber];    
    const calculations = current.calculations.slice();    

    const param1 = this.state.param1;
    const sign = this.state.sign;
    const param2 = this.state.param2;
    const result = Number(param1) + Number(param2);
    
    calculations[0] = param1;
    calculations[1] = sign;
    calculations[2] = param2;
    calculations[3] = result;
    this.setState({
      history: history.concat([{
          calculations: calculations
      }]),      
      stepNumber: history.length,
    });
    console.log(this.state.history[this.state.stepNumber]);
  */
  }

  function deleteItem(index){
    setItems(prevItems => prevItems.splice(index, 1))
    console.log(items);
  }

  function sortItems(x){
    console.log(items);

    let sortedItems;

    switch (x) {
      case 'alphabetical':
        sortedItems = [...items].sort((a , b) => isAsc ? a.name > b.name : a.name < b.name);
        break;
      case 'category':
        sortedItems = [...items].sort((a , b) => a.category > b.category);
        break;
      case 'quantity':
        sortedItems = [...items].sort((a , b) => a.quantity > b.quantity);
        break;
    }
    setItems(sortedItems);
    console.log(sortedItems);
  }

  function Navbar(props) {
    return (
      <nav className='navbar'>
        <ul className='navbar-nav'> { props.children } </ul>
      </nav>
    );
  }
  
  function NavItem(props){
    
    const [open, setOpen] = useState(false);
  
    return(
      <li className='nav-item'>
        <a href='#' className='icon-button-and-text' onClick={() => setOpen(!open)}>
          {props.name}
        </a>
  
        {open && props.children}
      </li>
    );
  }
  
  function DropdownMenu(){
  
    function DropdownItem(props) {
      return (
        <button onClick={() => sortItems(props.sortBy)} className='menu-item'>
          <span className='icon-button'>{props.icon}</span>
          {props.children}
        </button>
      );
    }
  
    return (
      <div className='dropdown'>
        <DropdownItem sortBy = "alphabetical" >Alphabetical</DropdownItem>
        <DropdownItem sortBy = "category" >By category</DropdownItem>
        <DropdownItem sortBy = "quantity" >By quantity</DropdownItem>
        <DropdownItem sortBy = "oldest" >Oldest</DropdownItem>
        <DropdownItem sortBy = "newest" >Newest</DropdownItem>
      </div>
    );
  }

  return (
    <div className='app'>
      <div className='toolbar'>
        <div className='app-name'>
          <h1>Shopping List</h1>
        </div>
        <div className='add-item-form'>
          <form>
            <input 
                type = "text" 
                className='item-name-input' 
                name='item-name-input' 
                onChange={(event) => handleChange(event)}
            />
            <input 
                type = "number" 
                className='item-quantity-input' 
                name='item-quantity-input'  
                onChange={(event) => handleChange(event)}     
            />
            <input 
                type = "text" 
                className='item-category-input' 
                name='item-category-input'   
                onChange={(event) => handleChange(event)}         
            />
            <input type = "button" value = "Dodaj do listy" onClick={() => handleClick()} />
            <input type = "button" value = "sortuj Aflabetycznie" onClick={sortItems} />
          </form>
        </div>
        <div className='navbar'>
        <button onClick={() => setAsc(!isAsc)}>--------------------</button>
          <Navbar>
            <NavItem icon="🙃" name="Sortuj">
              <DropdownMenu/>
            </NavItem>
          </Navbar>
        </div>
      </div>
      <div className='list-container'>
        {items.map((item, index) =>
          <div className='item-container' key={index}>
            {console.log(index)}
            <div className='item-info'>
              <div>{item.name} {item.category} {item.quantity}</div>
              <div>
                <input type='button' value='❌' onClick={(index) => deleteItem(index)}></input>
              </div>
            </div>
          </div>  
        )}
      </div>
    </div>
  );



}

export default App;

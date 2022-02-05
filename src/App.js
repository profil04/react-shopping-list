import './App.css';
import React, { useState } from 'react'

function App() {

  const [items, setItems] = useState([
    { itemName: 'item 1', quantity: 1, isSelected: false, unit: null, price: 20, category: 'food'},
    { itemName: 'item 2', quantity: 3, isSelected: true, unit: null, price: 10, category: 'others'},
    { itemName: 'item 3', quantity: 2, isSelected: false, unit: null, price: 50, category: 'clothes'},
  ]);

  function handleChange(event, field){
    
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
                onChange={(event) => handleChange(event, "item-name-input")}
            />
            <input 
                type = "number" 
                className='item-quantity-input' 
                name='item-quantity-input' 
                onChange={(event) => handleChange(event, "item-quantity-input")}
            />
            <input 
                type = "text" 
                className='item-category-input' 
                name='item-category-input' 
                onChange={(event) => handleChange(event, "item-category-input")}
            />
          </form>
        </div>
        <div className='navbar'>
          <Navbar>
            <NavItem icon="🙃" name="Sortuj">
              <DropdownMenu/>
            </NavItem>
          </Navbar>
        </div>
      </div>
      <div className='list-container'>
        {items.map((item, index) =>
          <div className='item-container'>
            <div className='item-info'>
              <span>{item.itemName} {item.price} {item.category} {item.quantity}</span>
            </div>
          </div>  
        )}
      </div>
    </div>
  );
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
      <a href='#' className='menu-item'>
        <span className='icon-button'>{props.icon}</span>
        {props.children}
      </a>
    );
  }

  return (
    <div className='dropdown'>
      <DropdownItem icon='🙃'>Alphabetical</DropdownItem>
      <DropdownItem>By category</DropdownItem>
      <DropdownItem>By quantity</DropdownItem>
      <DropdownItem>Oldest</DropdownItem>
      <DropdownItem>Newest</DropdownItem>
    </div>
  );
}

export default App;

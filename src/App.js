import './App.css';
import React, { useState } from 'react'

function App() {

  const [items, setItems] = useState([
    { name: 'item 1', quantity: 1, isSelected: false, unit: null, price: 20, category: 'food'},
    { name: 'item 2', quantity: 3, isSelected: true, unit: null, price: 10, category: 'others'},
    { name: 'item 3', quantity: 2, isSelected: false, unit: null, price: 50, category: 'clothes'},
  ]);

  const [itemName, setName] = useState("");
  const [itemQuantity, setQuantity] = useState(1);
  const [categoryName, setCategory] = useState("");

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
          <div className='item-container' key={index}>
            <div className='item-info'>
              <span>{item.name} {item.category} {item.quantity}</span>
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

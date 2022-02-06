import './App.css';
import React, { useState } from 'react'

function App() {

  const [items, setItems] = useState([]);

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
    setItems(prevItems => prevItems.concat([{
        name: itemName, quantity: itemQuantity, category: categoryName
      }]))

      console.log(items);
  }

  function addBasicItems() {
    setItems(prevItems => prevItems.concat([{
        name: 'mleko', quantity: 3, category: 'spożywcze'
      }]))

      setItems(prevItems => prevItems.concat([{
        name: 'masło', quantity: 2, category: 'spożywcze'
      }]))

      setItems(prevItems => prevItems.concat([{
        name: 'ser żółty', quantity: 3, category: 'spożywcze'
      }]))

      setItems(prevItems => prevItems.concat([{
        name: 'spodnie', quantity: 1, category: 'ubrania'
      }]))

      setItems(prevItems => prevItems.concat([{
        name: 'bułki', quantity: 10, category: 'spożywcze'
      }]))

      setItems(prevItems => prevItems.concat([{
        name: 'chleb', quantity: 1, category: 'spożywcze'
      }]))

      setItems(prevItems => prevItems.concat([{
        name: 'papier toaletowy', quantity: 30, category: 'kosmetyki'
      }]))

      setItems(prevItems => prevItems.concat([{
        name: 'mydło', quantity: 4, category: 'kosmetyki'
      }]))
  }

  function deleteItem(index){
    console.log("index" + index)
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
        <DropdownItem sortBy = "alphabetical" >Alfabetycznie</DropdownItem>
        <DropdownItem sortBy = "category" >Po kategorii</DropdownItem>
        <DropdownItem sortBy = "quantity" >Po ilości</DropdownItem>
      </div>
    );
  }

  function AscIcon(props) {
    return <button onClick={() => setAsc(!isAsc)}>⬇️</button>;
  }
  
  function DescIcon(props) {
    return <button onClick={() => setAsc(!isAsc)}>⬆️</button>;
  }

  return (
    <div className='app'>
      <div className='toolbar'>
        <div className='app-name'>
          <h1>Shopping List</h1>
        </div>
        <div className='asc-desc-button'>
          {isAsc ? (
					<button onClick={() => setAsc(!isAsc)}>⬇️</button>
				) : (
          <button onClick={() => setAsc(!isAsc)}>⬆️</button>
				)}
      
        </div>
        <div className='navbar'>
          <Navbar>
            <NavItem name="Sortuj">
              <DropdownMenu/>
            </NavItem>
          </Navbar>
        </div>
      </div>
      <div className='add-item-form'>
          <form>
            Nazwa: 
            <input 
                type = "text" 
                className='item-name-input' 
                name='item-name-input' 
                onChange={(event) => handleChange(event)}
            /> <br/>
            Ilość: 
            <input 
                type = "number" 
                className='item-quantity-input' 
                name='item-quantity-input'  
                onChange={(event) => handleChange(event)}     
            /> <br/>
            Kategoria: 
            <input 
                type = "text" 
                className='item-category-input' 
                name='item-category-input'   
                onChange={(event) => handleChange(event)}         
            /> <br/>
            <input type = "button" value = "Dodaj do listy" onClick={() => handleClick()} />
            <input type = "button" value = "Dodaj podstawowe artykuły" onClick={() => addBasicItems()} />
          </form>
        </div>
      <div className='list-container'>
        {items.map((item, index) =>
          <div className='item-container' key={index}>
            <div className='item-info'>
              <div>{item.name} {item.quantity} szt, kategoria: {item.category}</div>
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

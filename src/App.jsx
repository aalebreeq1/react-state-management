import { useState } from 'react'

function App() {

  const [availableItems, setAvailableItems] = useState([
    {
      id: 1,
      name: "Black T shirt",
      price: 5
    },
    {
      id: 2,
      name: "Hanger Set",
      price: 8
    },
    {
      id: 3,
      name: "Thoub",
      price: 12
    },
    {
      id: 4,
      name: "Computer Bag",
      price: 20
    },
    {
      id: 5,
      name: "Couch",
      price: 50
    },
    {
      id: 6,
      name: "Gaming Chair",
      price: 70
    }
  ]
  )
  const [shoppingCart, setShoppingCart] = useState([])
  const [availableBalance, setAvailableBalance] = useState(100)
  const [warningMessage, setWarningMessage] = useState(null)

  function handleAddToCart(item) {
    if (availableBalance > item.price) {
      const filteredItems = availableItems.filter(items => items.id !== item.id)
      setAvailableItems(filteredItems)
      setShoppingCart([...shoppingCart, item])
      setAvailableBalance(availableBalance - item.price)
    }
    else {
      setWarningMessage("Insufficient funds. Your balance is too low to purchase this item")
      setTimeout(() => {
        setWarningMessage(null)
      }, 4000)
    }
  }

  function handleRemoveFromShoppingCart(item) {
    const updatedCart = shoppingCart.filter(items => items.id !== item.id)
    setShoppingCart(updatedCart)
    setAvailableItems([...availableItems, item])
    setAvailableBalance(availableBalance + item.price)
  }


  return (
    <>
      <h1>Sayed Hameds Closet</h1>
      <h2>Your Balance: {availableBalance}</h2>
      {warningMessage ? <p style={{ color: 'red' }}>{warningMessage}</p> : null}
      <h2>Available Items</h2>
      {
        availableItems.length === 0 ? (
          <p>No items available</p>
        ) : (
          availableItems.map((item) => (
            <div key={item.name}>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Price:</strong> {item.price} BHD</p>
              <button onClick={() => { handleAddToCart(item) }}>Add to Cart</button>
            </div>
          ))
        )
      }

      <h2>Shopping Cart</h2>
      {
        shoppingCart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          shoppingCart.map((item) => (
            <div key={item.name}>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Price:</strong> {item.price} BHD</p>
              <button onClick={() => handleRemoveFromShoppingCart(item)}>Remove from Cart</button>
            </div>
          ))
        )
      }


    </>
  )
}

export default App
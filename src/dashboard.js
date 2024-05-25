import React,{ useState } from 'react';
import NavigationHeader from './navbar'; // Assuming you have a NavigationHeader component
import ProductDisplay from './ProductDispaly';
import ShoppingCart from './ShoppingCart'; // Assuming you have a ShoppingCart component
import backgroundImage from './images/OIP.jpeg'

function DashboardPage() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProduct = prevCartItems.find(item => item.id === product.id);
      
      if (existingProduct) {
        return prevCartItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div style={styles.container}>
      {/* Render the NavigationHeader component */}
      <NavigationHeader />
      {/* Main content area */}
      <div style={styles.content}>
        {/* 70% area for ProductDisplay */}
        <div style={styles.productDisplay}>
        <ProductDisplay addToCart={addToCart} />
        </div>
        {/* 30% area for ShoppingCart */}
        <div style={styles.shoppingCart}>
        <ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />
        </div>
      </div>
    </div>
  );
}

const styles = {

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '64px', // Space for NavigationHeader
    padding: '20px', // Add some padding for better spacing
  },
  productDisplay: {
    width: '70%',
  },
  shoppingCart: {
    width: '30%',
    backgroundColor: '#ffffff', // White background color for the shopping cart area
    borderRadius: '8px', // Add some rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a subtle shadow for depth
    padding: '20px', // Add some padding for better spacing
  },
};

export default DashboardPage;

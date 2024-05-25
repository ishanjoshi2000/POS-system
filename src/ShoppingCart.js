import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ShoppingCart = ({cartItems, setCartItems}) => {

const handleDelete = (itemId) => {
  // Filter out the item with the given itemId
  const updatedCartItems = cartItems.filter(item => item.id !== itemId)
  setCartItems(updatedCartItems);
};

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter') {
      if (index === 3) { // Move to the next row if on the last cell
        const nextRow = index + 1;
        const nextCell = 0;
        document.getElementById(`cell-${nextRow}-${nextCell}`).focus();
      } else {
        const nextCell = index + 1;
        document.getElementById(`cell-${index}-${nextCell}`).focus();
      }
    } else if (e.key === 'Delete') {
      handleDelete(index + 1); // Delete row if Delete key is pressed
    }
  };
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Rate</TableCell>
            <TableCell align="center">Total</TableCell>
            <TableCell></TableCell> {/* Empty cell for delete button column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell id={`cell-${index}-0`} onKeyDown={(e) => handleKeyDown(e, index)} contentEditable>{item.name}</TableCell>
              <TableCell id={`cell-${index}-1`} onKeyDown={(e) => handleKeyDown(e, index)} contentEditable>{item.quantity}</TableCell>
              <TableCell id={`cell-${index}-2`} onKeyDown={(e) => handleKeyDown(e, index)} contentEditable>{item.rate}</TableCell>
              <TableCell>{item.quantity * item.rate}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShoppingCart;

import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button,
  TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ShoppingCart = ({ cartItems = [], setCartItems }) => {
  const [orderNo, setOrderNo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderNo = async () => {
      try {
        const response = await fetch('https://api.example.com/orderNo');
        const data = await response.json();
        setOrderNo(data.orderNo);
      } catch (error) {
        console.error('Error fetching order number:', error);
      }
    };

    fetchOrderNo();
    setLoading(false); // Set loading to false after order number has been fetched
  }, []);

  const handleDelete = (itemId) => {
    if (cartItems) {
      setCartItems(cartItems.filter(item => item.id !== itemId));
    }
  };

  const handleKeyDown = (e, rowIndex, cellIndex) => {
    const totalCells = 3;
    if (e.key === 'Enter') {
      if (cellIndex === totalCells - 1) {
        if (rowIndex === cartItems.length - 1) {
          document.getElementById('ok-button').focus();
        } else {
          const nextRow = rowIndex + 1;
          document.getElementById(`cell-${nextRow}-1`).focus();
        }
      } else {
        const nextCell = cellIndex + 1;
        document.getElementById(`cell-${rowIndex}-${nextCell}`).focus();
      }
    } else if (e.key === 'Delete') {
      handleDelete(cartItems[rowIndex].id);
    }
  };

  const handleRowChange = (e, rowIndex, key) => {
    const updatedItems = cartItems.map((item, index) => {
      if (index === rowIndex) {
        return { ...item, [key]: e.target.value };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const handleOkClick = () => {
    // Add your logic here for handling the OK button click
    console.log('OK button clicked');
  };

  const handleCancelClick = () => {
    // Add your logic here for handling the Cancel button click
    console.log('Cancel button clicked');
  };

  return (
    <Paper style={{ padding: '20px', height: 'calc(100% - 40px)', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <TextField
        label="Order No"
        value={orderNo}
        variant="outlined"
        fullWidth
        size="small" // Adjusted size to small
        style={{ marginBottom: '10px', width: '30%', marginLeft: 'auto', marginRight: 'auto' }}
        InputProps={{
          readOnly: true,
        }}
      />
      <TableContainer style={{ maxHeight: 'calc(100% - 90px)', overflowY: 'auto', borderRadius: '15px', border: '1px solid #ddd' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Rate</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">Loading...</TableCell>
              </TableRow>
            ) : (
              cartItems.map((item, rowIndex) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <TextField
                      id={`cell-${rowIndex}-1`}
                      value={item.quantity}
                      onChange={(e) => handleRowChange(e, rowIndex, 'quantity')}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id={`cell-${rowIndex}-2`}
                      value={item.rate}
                      onChange={(e) => handleRowChange(e, rowIndex, 'rate')}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                    />
                  </TableCell>
                  <TableCell>{item.quantity * item.rate}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
          <div style={{ textAlign: 'center', marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <Button id="ok-button" onClick={handleOkClick} variant="contained" color="primary">
        OK
      </Button>
      <Button id="cancel-button" onClick={handleCancelClick} variant="contained" color="secondary">
        Cancel
      </Button>
    </div>


    </Paper>
  );
};

export default ShoppingCart;

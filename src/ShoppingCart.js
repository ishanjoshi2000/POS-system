import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button,
  TextField, MenuItem, Select, FormControl, InputLabel
} from '@material-ui/core';
import Autocomplete from '@mui/material/Autocomplete';
import DeleteIcon from '@material-ui/icons/Delete';
import { NepaliDatePicker } from "nepali-datepicker-reactjs"

const ShoppingCart = ({ cartItems, setCartItems }) => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [panNo, setPanNo] = useState('');
  const [billSerialNo, setBillSerialNo] = useState(0);
  const [billType, setBillType] = useState('Cash');
  const [currentDate, setCurrentDate] = useState();

  useEffect(() => {
    // Fetch customer data
    const fetchCustomers = async () => {
      try {
        const response = await fetch('https://api.example.com/customers'); // Replace with your API endpoint
        const data = await response.json();
        setCustomers(data.customers);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    // Fetch last bill serial number
    const fetchLastSerialNo = async () => {
      try {
        const response = await fetch('https://api.example.com/lastBillSerial'); // Replace with your API endpoint
        const data = await response.json();
        setBillSerialNo(data.lastSerialNo + 1);
      } catch (error) {
        console.error('Error fetching last bill serial number:', error);
      }
    };

    fetchCustomers();
    fetchLastSerialNo();
  }, []);

  const handleDelete = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleKeyDown = (e, rowIndex, cellIndex) => {
    const totalCells = 3; // Number of cells before the OK button
    if (e.key === 'Enter') {
      if (cellIndex === totalCells - 1) { // If on the last cell (Rate)
        if (rowIndex === cartItems.length - 1) { // If on the last row
          document.getElementById('ok-button').focus(); // Move to the OK button
        } else {
          const nextRow = rowIndex + 1;
          document.getElementById(`cell-${nextRow}-1`).focus(); // Move to the Qty cell of the next row
        }
      } else {
        const nextCell = cellIndex + 1;
        document.getElementById(`cell-${rowIndex}-${nextCell}`).focus(); // Move to the next cell in the same row
      }
    } else if (e.key === 'Delete') {
      handleDelete(cartItems[rowIndex].id); // Delete row if Delete key is pressed
    }
  };

  const handleCustomerChange = (event, newValue) => {
    setSelectedCustomer(newValue);
    if (newValue) {
      // Assume API provides PAN no in customer data
      setPanNo(newValue.panNo);
    } else {
      setPanNo('');
    }
  };

  return (
    <Paper style={{ padding: '20px', height: '100%' }}>
      <div style={styles.header}>
        <Autocomplete
          options={customers}
          getOptionLabel={(option) => option.name}
          style={{ width: '100%', marginBottom: '20px' }}
          onChange={handleCustomerChange}
          renderInput={(params) => <TextField {...params} label="Customer Name" variant="outlined" />}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
          <TextField
            label="PAN No"
            value={panNo}
            variant="outlined"
            style={{ marginRight: '20px', width: 'calc(50% - 10px)' }}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Bill Serial No"
            value={billSerialNo}
            variant="outlined"
            style={{ marginRight: '20px', width: 'calc(50% - 10px)' }}
            InputProps={{
              readOnly: true,
            }}
          />
          <NepaliDatePicker
            className="nepali-date-picker"
            value={currentDate}
            onChange={(value) => setCurrentDate(value)}
            options={{ calenderLocale: "ne", valueLocale: "en" }}
            style={{ width: '100%' }}
          />
          <FormControl variant="outlined" style={{ width: '100%', marginTop: '20px' }}>
            <InputLabel>Bill Type</InputLabel>
            <Select
              value={billType}
              onChange={(e) => setBillType(e.target.value)}
              label="Bill Type"
            >
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Credit">Credit</MenuItem>
              <MenuItem value="FonePay">FonePay</MenuItem>
              <MenuItem value="Esewa">Esewa</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <TableContainer style={{ maxHeight: 'calc(100% - 180px)' }}>
        <Table stickyHeader>
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
            {cartItems.map((item, rowIndex) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell
                  id={`cell-${rowIndex}-1`}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 1)}
                  contentEditable
                >
                  {item.quantity}
                </TableCell>
                <TableCell
                  id={`cell-${rowIndex}-2`}
                  onKeyDown={(e) => handleKeyDown(e, rowIndex, 2)}
                  contentEditable
                >
                  {item.rate}
                </TableCell>
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
      <Button id="ok-button" variant="contained" color="primary" style={{ marginTop: '20px', float: 'left' }}>
        OK
      </Button>
      <Button id="cancel-button" variant="contained" color="primary" style={{ marginTop: '20px', float: 'right' }}>
        Cancel
      </Button>
    </Paper>
  );
};

const styles = {
  header: {
    marginBottom: '20px',
  },
};

export default ShoppingCart;

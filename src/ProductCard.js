import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, makeStyles, Tooltip, IconButton } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';


const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: '1rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0.1, 0.1)',
    borderRadius: '8px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
  },
  media: {
    height: 200,
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  },
  content: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  name: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  price: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    margin: '0.5rem 0',
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  button: {
    marginTop: '1rem',
  },
  actionIcons: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  actionIcon: {
    color: theme.palette.grey[500],
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const ProductCard = ({ product,addToCart }) => {
  const classes = useStyles();

  const MAX_NAME_LENGTH = 20; // Define the maximum length of the product name

  // Function to check if the product name is truncated
  const isNameTruncated = (name) => {
    return name.length > MAX_NAME_LENGTH;
  };

  // Function to truncate the product name if it exceeds the maximum length
  const truncateProductName = (name) => {
    if (isNameTruncated(name)) {
      return name.substring(0, MAX_NAME_LENGTH) + '...';
    }
    return name;
  };

  const handleAddToCart = () => {
    addToCart(product);

  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        component="img"
        alt={product.name}
        image={`http://127.0.0.1:8000${product.image}`}
      />
      <CardContent className={classes.content}>
       <Tooltip title={isNameTruncated(product.name) ? product.name : ''} arrow>
          <Typography className={classes.name} gutterBottom variant="h6" component="h2">
            {truncateProductName(product.name)} {/* Display truncated product name */}
          </Typography>
        </Tooltip>
        <Typography className={classes.price} variant="h6" component="p">
          Rs {product.sell_price}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          className={classes.button}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

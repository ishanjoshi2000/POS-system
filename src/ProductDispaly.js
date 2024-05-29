import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel, Input, makeStyles } from '@material-ui/core';
import ProductCard from './ProductCard';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  filterContainer: {
    marginBottom: theme.spacing(2),
    padding: `0 ${theme.spacing(5)}px`,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  formControl: {
    minWidth: 200,
  },
  searchBar: {
    marginLeft: theme.spacing(2),
  },
}));

const ProductDisplay = ({addToCart}) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Fetch categories from the API endpoint
    axios.get('http://127.0.0.1:8000/routes/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    fetchProducts(true);
  }, [selectedCategory, searchQuery]);

  const fetchProducts = (reset = false) => {
    let url = 'http://127.0.0.1:8000/routes/products/filter/';
    let params = {
      page: reset ? 1 : page,
      category: selectedCategory,
      q: searchQuery,
    };

    axios.get(url, { params })
      .then(response => {
        if (reset) {
          setProducts(response.data.products);
        } else {
          setProducts(prevProducts => [...prevProducts, ...response.data.products]);
        }
        setHasMore(response.data.products.length > 0);
        setPage(prevPage => reset ? 2 : prevPage + 1);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
    fetchProducts();
  }, [hasMore, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <div className={classes.filterContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value=""><em>All</em></MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Input
          placeholder="Search..."
          className={classes.searchBar}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <Grid container spacing={2}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductCard product={product} addToCart={addToCart} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductDisplay;

import { Box, Typography, Grid } from '@mui/material';
import * as React from 'react';
import { useEffect, useState, useRef, useCallback } from "react";
import ProductCard from './ProductCard';
import { Link as Route } from 'react-router-dom';
import { fakeData } from 'assets/placeHolder';
import { firstLetterUpperCase } from "utils/commonFunctions";
import { KureDatabase } from "request/KureDatabase";

function ProductItem({ category_name, on_category_page }) {
  const cssRouter = {
    lineHeight: 1.5,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#32BEB9',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      color: '#499e9b'
    }
  }

  const [storeId, setStoreId] = useState(localStorage.getItem("store_id") ? Number(localStorage.getItem("store_id")) : 2);
  const [productStore, setProductStore] = useState([]);
  const rowsPerPage = (on_category_page) ? 12 : 6;
  const [rowCurrent, setRowCurrent] = useState(rowsPerPage);
  const observer = useRef();
  const categoryName = React.useMemo(() => {
    return category_name.charAt(0).toUpperCase() + category_name.slice(1);
  }, [category_name])

  const lastProductElementRef = useCallback(node => {
    if (!on_category_page) {
      return;
    }
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setRowCurrent(prevRowCurrent => prevRowCurrent + rowsPerPage);
      }
    });

    if (node) {
      observer.current.observe(node);
    }
  }, []);

  useEffect(() => {
    // Listen for messages from the service worker using the BroadcastChannel API
    const channel = new BroadcastChannel('kure-app');
    channel.addEventListener('message', event => {
      let lcalStoreId = localStorage.getItem("store_id") ? Number(localStorage.getItem("store_id")) : 2
      db.productData().getFiltered('category_name', categoryName).then((products) => {
        const selectedProducts = products.filter((product) => {
          const filters = (product.store_id.split(",")).filter((id) => Number(id) === lcalStoreId)
          return filters.length > 0
        })
        console.log(selectedProducts)
        setProductStore(selectedProducts);
      });
    });
  }, []);

  const db = new KureDatabase();

  useEffect(() => {
    db.productData().getCount().then((count) => {
      if (count) {
        db.productData().getFiltered('category_name', categoryName).then((products) => {
          const selectedProducts = products.filter((product) => {
            const filters = (product.store_id.split(",")).filter((id) => Number(id) === storeId)
            return filters.length > 0
          })
          console.log(selectedProducts)
          setProductStore(selectedProducts);
        })
      }
    })
  }, [categoryName, storeId]);

  return (
    <Box sx={{ pb: '20px' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '1rem', px: '1rem' }}>
        <Typography variant="h3" sx={{ '&.MuiTypography-root': { fontSize: '35px', fontWeight: 500, lineHeight: 1.2, mb: '0.5rem' } }}>
          {firstLetterUpperCase(category_name)}
        </Typography>
        {!on_category_page &&
          <Route to={`/products/${category_name}`} style={{ textDecoration: 'none' }}>
            <Typography sx={cssRouter}>View All</Typography>
          </Route>
        }
      </Box>
      <Box sx={{ mb: '20px' }}>
        <Grid container rowSpacing={"20px"}>
          {productStore.length > 0 ?
            (
              productStore?.slice(0, rowCurrent).map((row, index) => {
                const itemProps = ((rowCurrent) === index + 1) ? { ref: lastProductElementRef } : {};
                return (
                  <Grid {...itemProps} key={index} item xs={12} sx={{ px: { xs: 2, sm: 2, md: 2 } }} md={4} sm={4} lg={2}>
                    <ProductCard key={index} data={row} />
                  </Grid>
                );
              })
            )
            :
            (
              fakeData[category_name]?.slice(0, rowCurrent).map((row, index) => {
                const itemProps = ((rowCurrent) === index + 1) ? { ref: lastProductElementRef } : {};
                return (
                  <Grid {...itemProps} key={index} item xs={12} sx={{ px: { xs: 2, sm: 2, md: 2 } }} md={4} sm={4} lg={2}>
                    <ProductCard key={index} data={row} />
                  </Grid>
                );
              })
            )
          }
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductItem;

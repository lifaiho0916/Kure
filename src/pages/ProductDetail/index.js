import { Box, Grid, Typography, OutlinedInput, Button, ButtonGroup, Skeleton, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import minusIcon from 'assets/images/icons/icon-minus-light.svg';
import plusIcon from 'assets/images/icons/icon-plus-light.svg';
import Image from 'components/Image/index';
import { KureDatabase } from "request/KureDatabase";

function ProductDetail() {
  const location = useLocation()
  const isOnline = navigator.onLine;
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState();
  const [loading, setLoading] = useState(true);
  const db = new KureDatabase();

  useEffect(() => {
    const fetchData = async () => {
      const newDB = new KureDatabase();
      const product_name = location.pathname.substring(1);

      const data = await newDB.productData().getFiltered('link', product_name);
      if (data.length) {
        setProductData(data[0]);
        setLoading(false);
      }
    };

    db.productData().getCount().then((count) => {
      if (count) fetchData().catch(console.error);
    })

    const channel = new BroadcastChannel('kure-app');
    channel.addEventListener('message', event => {
      console.log('Received message from service worker: ', event);
      fetchData().catch(console.error);
    });
  }, []);

  useEffect(() => {

  }, [])

  const handleDecreaseNumber = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <Box sx={{ m: '50px 0 100px', p: 0 }}>
      { // If offline show "offline" caption.
        isOnline &&
        <Box
          sx={{
            m: '0 1rem',
            mb: '1rem',
            p: '4px 8px',
            borderRadius: '8px',
            bgcolor: '#57c4c1',
            width: 'fit-content'
          }}
        >
          <Typography children="Offline" sx={{ fontStyle: 'italic', color: '#fff' }} />
        </Box>
      }
      <Grid
        container
        rowSpacing={1}
        sx={{ '&.MuiGrid-container': { m: '0 -16px 0 0', maxWidth: '100vw' } }}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12} sm={6} sx={{ '&.MuiGrid-item': { p: '0 1rem' } }}>
          <Box width="100%" height="100%">
            {productData?.product_image && !loading &&
              <Image onLoad={() => setLoading(false)} src={productData?.product_image} alt="" sx={{ height: "100%" }} />}
            {!productData?.product_image && loading &&
              <Skeleton variant="rectangular" height="100%" width="100%" sx={{ bgcolor: '#fff' }} />}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ '&.MuiGrid-item': { p: '0 1rem' } }}>
          <Typography
            component="h1"
            sx={{
              fontSize: '36px',
              fontWeight: 600,
              '&.MuiTypography-root': { mb: '20px', mt: { xs: '20px', sm: '0' } }
            }}
          >
            {!loading ? productData?.title : <Skeleton sx={{ bgcolor: '#f7f7f7' }} width="80%" />}
          </Typography>
          <Box sx={{ '& span': { fontSize: '22px', lineHeight: '30px', fontWeight: 'bold' }, display: 'flex' }}>
            <Typography
              component="span"
              sx={{ '&.MuiTypography-root': { textDecoration: 'line-through', mr: '30px', fontWeight: 400 } }}
            >
              $46.95
            </Typography>
            <Typography component="span" width="20%">{!loading ? productData?.retail_price :
              <Skeleton sx={{ bgcolor: '#f7f7f7' }} width="20%" />}</Typography>
          </Box>
          <Box mt="40px" mb="75px">
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: { xs: '20px', sm: '4px' } }}>
              <Typography
                children="Product Strain"
                sx={{ width: '250px', display: 'inline-block', fontSize: '1rem', fontWeight: 600 }}
                component="span"
              />
              {!loading ? <Typography children={productData?.strain} component="span" sx={{ fontSize: '1rem' }} /> :
                <Skeleton sx={{ bgcolor: '#f7f7f7' }} width="20%" />}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: { xs: '20px', sm: '4px' } }}>
              <Typography
                children="Product Type"
                sx={{ width: '250px', display: 'inline-block', fontSize: '1rem', fontWeight: 600 }}
                component="span"
              />
              {!loading ?
                <Typography children={productData?.category_name} component="span" sx={{ fontSize: '1rem' }} /> :
                <Skeleton sx={{ bgcolor: '#f7f7f7' }} width="20%" />}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: { xs: '20px', sm: '4px' } }}>
              <Typography
                children="Quantity on Hand"
                sx={{ width: '250px', display: 'inline-block', fontSize: '1rem', fontWeight: 600 }}
                component="span"
              />
              {!loading ? <Typography children={productData?.stock} component="span" sx={{ fontSize: '1rem' }} /> :
                <Skeleton sx={{ bgcolor: '#f7f7f7' }} width="20%" />}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: { xs: '20px', sm: '4px' } }}>
              <Typography
                children="Last Inventory Count Date"
                sx={{ width: '250px', display: 'inline-block', fontSize: '1rem', fontWeight: 600 }}
                component="span"
              />
              {!loading ?
                <Typography children={productData?.last_inventory_count_date} component="span"
                  sx={{ fontSize: '1rem' }} /> :
                <Skeleton sx={{ bgcolor: '#f7f7f7' }} width="20%" />}
            </Box>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box width="250px">
              <Typography
                component="p"
                children="QUANTITY"
                sx={{ '&.MuiTypography-root': { mb: '4px', fontSize: '10px' } }}
              />
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Box
                  width="40px"
                  height="40px"
                  sx={{ border: '1px solid #fff', cursor: 'pointer' }}
                  onClick={handleDecreaseNumber}
                >
                  <Image src={minusIcon} alt="" />
                </Box>
                <OutlinedInput
                  value={quantity}
                  sx={{
                    borderRadius: 0,
                    width: '55px',
                    height: '40px',
                    m: '0 5px',
                    color: '#fff',
                    textAlign: 'center',
                    '&:hover': { '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' } },
                    '& .MuiInputBase-input': {
                      textAlign: 'center'
                    },
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff' }
                  }}
                />
                <Box
                  width="40px"
                  height="40px"
                  sx={{ border: '1px solid #fff', cursor: 'pointer' }}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Image src={plusIcon} alt="" />
                </Box>
              </ButtonGroup>
            </Box>
            <Box>
              <Typography
                component="p"
                children="SUBTOTAL"
                sx={{ '&.MuiTypography-root': { mb: '4px', fontSize: '10px' } }}
              />
              <Typography component="p" sx={{ fontWeight: 600, fontSize: '22px', pt: '3px' }}
                children={productData?.retail_price} />
            </Box>
          </Box>
          <Button
            sx={{
              maxWidth: '350px',
              width: '100%',
              bgcolor: '#32BEB9',
              p: '7px',
              color: '#fff',
              borderRadius: 0,
              opacity: productData?.stock === 0 ? 0.5 : 1,
              m: '20px 0',
              '&:hover': { bgcolor: '#32BEB9' }
            }}
            disabled={productData?.stock === 0}
          >
            ADD TO CART
          </Button>
          <Typography component="p" sx={{ fontWeight: 'bolder' }} children="NOTE: WE ONLY ACCEPT CASH" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetail;

import {
  Box,
  Link,
  Card,
  CardActions,
  CardContent,
  Button,
  Skeleton,
  Typography
} from '@mui/material';
import configHomeRouter from 'routes/configRouterHome';
import { Link as Route } from 'react-router-dom';
import Image from 'components/Image/index';
import { useState } from "react";
import { resourceOrder } from "../../order/resourceOrder";

function ProductCard({ data }) {
  const [loading, setLoading] = useState(true);

  const order = resourceOrder();

  const handleOnloadImage = () => {
    setLoading(false);
  }

  const addToCart = (event) => {
    let pid = event.target.getAttribute('data-pid');
    let price = event.target.getAttribute('data-price');
    let title = event.target.getAttribute('data-title');
    order.addOrderItem(pid, 1, price, title).then((result) => {
      // console.log(result);
      order.getCurrentOrderItems().then((result) => {
        console.log(result)
      });
    });
  }

  return (
    <Card>
      <Box sx={{ height: { xs: '261px', sm: '184px', md: '184px', lg: '159px', xl: '200px' }, lineHeight: 0 }}>
        <Route
          //to={configHomeRouter.productDetail + `/${data.link}`}
          to={`/${data.link}`}
        >
          {data.product_image &&
            <Image onLoad={handleOnloadImage} alt="" sx={{ height: loading ? 0 : '100%' }} src={data.product_image} />}
          {data.product_image && loading && <Skeleton variant="rectangular" height="100%" width="100%" />}
          {!data.product_image && <Skeleton variant="rectangular" height="100%" width="100%" />}
        </Route>
      </Box>
      <CardContent sx={{ p: '10px', height: '96px' }}>{
        !loading ?
          <Typography component="span" sx={{
            color: '#878787',
            mb: '3px',
            display: 'block',
            height: '15px',
            letterSpacing: '1px',
            fontSize: '0.75rem',
            fontWeight: 100
          }}>
            {data.strain}
          </Typography> : <Skeleton sx={{ mb: '3px' }} width="60%" />}
        <Typography variant="body2" color="text.secondary">
          <Link
            component={Route}
            to={`/${data.link}`}
            //to={configHomeRouter.productDetail + `/${data.link}`}
            sx={{
              fontSize: '1rem',
              lineHeight: 1.5,
              textDecoration: 'none',
              color: '#000',
              fontWeight: 700,
              display: 'block',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
              '&:hover': { '&.MuiTypography-inherit': { color: '#32BEB9' } }
            }}
          >
            {data.title && !loading ? data.title : <Skeleton width="60%" />}
          </Link>
        </Typography>
        <Box sx={{
          p: loading ? 0 : '5px 0',
          color: '#000',
          fontSize: '0.875rem',
          '& .MuiTypography-root': { fontWeight: 700 }
        }}>
          {/*<Typography component="span" sx={{ mr: '5px', textDecoration: 'line-through' }}>*/}
          {/*    $11.95*/}
          {/*</Typography>*/}
          {data.retail_price && !loading ? <Typography component="span" children={data.retail_price} /> :
            <Skeleton width="10%" sx={{ lineHeight: 1.67 }} />}
        </Box>
      </CardContent>
      <CardActions sx={{ p: '10px', pt: 0 }}>
        {data.retail_price && !loading ?
          <Button
            sx={{
              width: '100%',
              color: '#fff',
              textTransform: 'uppercase',
              backgroundColor: '#32BEB9',
              border: '1px solid #32BEB9',
              height: '38px',
              textAlign: 'center',
              '&:hover': { backgroundColor: '#32BEB9' }
            }}
            onClick={addToCart}
            data-pid={data.variation_id}
            data-price={data.retail_price}
            data-title={data.title}
          >
            ADD TO CART
          </Button> :
          <Skeleton width="100%" sx={{ height: '38px' }} />
        }
      </CardActions>
    </Card>
  );
}

export default ProductCard;

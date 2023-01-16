import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductItem from "pages/home/ProductItem";

function CategoryProduct() {
  let { product_category } = useParams();
  // Pass on_category_page props when router catches category select event.
  return (
    <Box sx={{ maxWidth: '1804px', m: { lg: '0 auto' } }}>
      <ProductItem category_name={product_category} on_category_page/>
    </Box>
  );
}

export default CategoryProduct;

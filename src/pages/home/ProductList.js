import { Box } from '@mui/material';
import ProductItem from './ProductItem';
import { useParams } from 'react-router-dom';
import { ButtonCategories } from "pages/home/HeaderButtonSelect";

function ProductList({ buttonCategories }) {
  let { product_category } = useParams();

  return (
    <Box>
      {ButtonCategories.map((button, index) => {
        console.log('asdf');
        // If no product_category is selected, show all products.
        if (!product_category) {
          // !button.isHide is used to hide the 'all' category.
          return !button.isHide && <ProductItem key={index} category_name={button.label} all_products={true}/>;
        } else if (product_category === button.value) {
          // For our category pages, we'll only show the products that match the category.
          return <ProductItem key={index} category_name={button.label} all_products={false}/>;
        }
      })}
    </Box>
  );
}

export default ProductList;

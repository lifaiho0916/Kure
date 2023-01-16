import { Box } from '@mui/material';
import { ButtonCategories } from "pages/home/HeaderButtonSelect";
import ProductItem from "pages/home/ProductItem";

const FrontPage = () => {

  return (
    <Box sx={{ maxWidth: '1804px', m: { lg: '0 auto' } }}>
      <Box>
        {ButtonCategories.map((button, index) => {
          // For the 'all' section and maybe others, do not display it on the front page.
          if (!button.isHidden) {
            return <ProductItem key={index} category_name={button.value} on_category_page={false}/>;
          }
        })}
      </Box>
    </Box>
  );
}
export default FrontPage;

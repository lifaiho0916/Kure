import { useState, forwardRef, useEffect } from 'react';
import defaultImage from 'assets/images/kure_lm_default_product_image.jpg';
import { Box } from '@mui/material';

const Image = forwardRef(({ className, src, alt, sx, ...props }, ref) => {
  const [fallBack, setFallBack] = useState('');
  const handleImageError = () => {
    setFallBack(defaultImage);
  };
  
// if product image isn't available, show default image
  useEffect(() => {
    if(!src){
      handleImageError()
    }
  }, [src])

  return (
    <Box sx={sx}>
      <img
        width="100%"
        height="100%"
        className={className}
        ref={ref}
        src={fallBack || src}
        alt={alt}
        {...props}
        onError={handleImageError}
      />
    </Box>
  );
});

export default Image;

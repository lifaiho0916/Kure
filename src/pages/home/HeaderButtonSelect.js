import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';

export const ButtonCategories = [
  {
    label: 'All',
    value: '',
    isSelected: false,
    isHidden: true
  },
  {
    label: 'Promotions',
    value: 'promotions',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Accessories',
    value: 'accessories',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Apparel',
    value: 'apparel',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Cartridge',
    value: 'cartridge',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Concentrate',
    value: 'concentrate',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Edibles',
    value: 'edibles',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Flower',
    value: 'flower',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Glass',
    value: 'glass',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Hemp',
    value: 'hemp',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Preroll',
    value: 'preroll',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Seeds',
    value: 'seeds',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Tincture',
    value: 'tincture',
    isSelected: false,
    isHidden: false
  },
  {
    label: 'Topicals',
    value: 'topicals',
    isSelected: false,
    isHidden: false
  }
];

function HeaderButton() {

  //The original category value is the value stored in sessionStorage, if there is no value it will be underfine and the All button will be selected.
  const category_store = sessionStorage.getItem('category_name')
  const [category, setCategory] = useState(category_store);

  useEffect(() => {
    setCategory(category_store)
  }, [category_store])

  function onPageLoad() {
    if (!category) {
      resetButtons();
      // Ugly hack to set the 'all' button to 'selected' on page load. This is temporary anyway.
      ButtonCategories[0].isSelected = true;
    } else {
      ButtonCategories.forEach((button, index) => {
        if (button.value === category) {
          ButtonCategories[index].isSelected = true;
        }
      });
    }
  }

  /**
   * If there's a 'product_category' parameter, set the button to 'selected'. If not, set to 'all'.
   */
  onPageLoad();

  function resetButtons() {
    ButtonCategories.forEach((button) => (button.isSelected = false));
  }

  /**
   * When a button is clicked, set the button to 'selected' and reset the other buttons.
   * @param i
   */
  const onClickSetCategory = (i) => {
    resetButtons();
    ButtonCategories[i].isSelected = true;
    // each time you select a category, save it to sessionStorage and setCategory to re-render.
    sessionStorage.setItem('category_name', ButtonCategories[i].value)
    setCategory(ButtonCategories[i].value)
  };

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
      <ButtonGroup
        variant="contained"
        sx={{
          gap: '10px',
          overflow: 'auto',
          mx: { xs: 2 },
          boxShadow: 'none',
          '::-webkit-scrollbar': { display: 'none' }
        }}
        aria-label="Disabled elevation buttons">
        {ButtonCategories.map((button, index) => (
          <Link to={!button.value ? `/` : `/products/${button.value}`} key={index}
                style={{ textDecoration: 'none' }}>
            <Button
              onClick={() => onClickSetCategory(index)}
              sx={{
                '&.MuiButtonBase-root.MuiButton-contained': {
                  p: '5px 10px',
                  bgcolor: button.isSelected ? '#57c4c1' : 'transparent',
                  border: '1px solid #57c4c1',
                  borderRadius: '5px',
                  color: button.isSelected ? '#fff' : '#57c4c1',
                  fontSize: '0.875rem',
                  lineHeight: '1.75',
                  '&:hover': { color: button.isSelected ? '#fff' : '#499e9b' }
                }
              }}
            >
              {button.label}
            </Button>
          </Link>
        ))}
      </ButtonGroup>
    </Container>
  );
}

export default HeaderButton;

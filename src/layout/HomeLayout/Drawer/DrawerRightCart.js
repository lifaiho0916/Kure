import {
  Box,
  Grid,
  List,
  Stack,
  Typography,
  ListItem,
  Link,
  Divider,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ProductCart from './ProductCart';
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from 'store/reducers/menu';
import { useState, useEffect, useRef } from 'react';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Qr from "utils/Qr";
import { KureDatabase } from "request/KureDatabase";
import AuthLogin from "pages/authentication/auth-forms/AuthLogin";
import AuthRegister from "pages/authentication/auth-forms/AuthRegister";
import HeaderLogin from "pages/authentication/HeaderLogin";
import CheckoutAddressDelivery from "pages/home/CheckoutAddressDelivery";
import CheckoutAddressPickup from "pages/home/CheckoutAddressPickup";

function DrawerRightCart() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const refOne = useRef(null);
  const { drawerOpen } = useSelector((state) => state.menu);
  const [open, setOpen] = useState(drawerOpen);
  const cssDrawerRight = [
    {
      background: '#383737fa',
      display: 'block',
      position: 'fixed',
      top: '0',
      right: '-600px',
      height: '100vh',
      width: '98vw',
      maxWidth: '600px',
      minWidth: '250px',
      zIndex: '1100',
      margin: 0,
      padding: '38px',
      transition: 'all .3s ease-in',
      overflow: 'auto'
      // overflow: '-moz-scrollbars-none',
      // MsOverflowStyle: 'none'
    },
    open && { right: '0' }
  ];
  const cssH2 = {
    paddingBottom: '53px',
    fontSize: '36px',
    fontWeight: 'bold',
    lineHeight: '45px',
  };
  const setShowDrawer = () => {
    setOpen(!open);
    dispatch(openDrawer({ drawerOpen: !open }));

  };
  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
      dispatch(openDrawer({ drawerOpen: false }));
      setDisplayLoginForm(false);
      setDisplayRegisterForm(false);
      setDisplayChoiceDeliverButtons (true);
    }
  };

  const kureDBInitialData = new KureDatabase().initData;

  function summarizeTotals() {
    let summary = {
      subtotal: 0,
      discount: 0,
      tax: 0,
      shipping: 0,
      total: 0
    };

    kureDBInitialData.order_item.map((order_item, index) => {
      summary.subtotal = order_item.retail_price * order_item.quantity;

      order_item.adjustment.map((adjustment, index) => {
        if (adjustment.type === 'discount') {
          if (adjustment.discount_type === 'percent') {
            summary.discount += summary.subtotal * (adjustment.value / 100)
          }
          if (adjustment.discount_type === 'flat') {
            summary.discount += adjustment.value
          }
        }
        adjustment.type === 'tax' && (summary.tax += adjustment.value);
        adjustment.type === 'shipping' && (summary.shipping += adjustment.value);
      });

      // Summary subtotal: 100 * quantity
      // Apply discount: 10
      // Apply tax: (subtotal-discount) * tax_amount
      // Apply shipping: 18
      // Get total: (subtotal-discount) * tax_amount + shipping
      let subtotal_after_discounts = 0;

      subtotal_after_discounts = summary.subtotal - summary.discount;

      summary.total = subtotal_after_discounts + (subtotal_after_discounts * (summary.tax / 100));
      summary.total += summary.shipping;
    })

    //console.log(summary);
    //return summary;

  }

  summarizeTotals();

  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayCheckoutAddressForm, setDisplayCheckoutAddressForm] = useState(true);
  const [displayChoiceDeliverButtons, setDisplayChoiceDeliverButtons] = useState(true);
  const onClickLogin = () => {
    console.log('Login');
    setDisplayLoginForm(true);
  };
  const onClickRegister = () => {
    console.log('Register');
    setDisplayRegisterForm(true);
  };

  const [displayPickupForm, setDisplayPickupForm] = useState(false);
  const [displayDeliveryForm, setDisplayDeliveryForm] = useState(false);

  const onClickPickup=()=> {
    setDisplayDeliveryForm(false);
    setDisplayChoiceDeliverButtons(false);
    setDisplayPickupForm(true);
  }
  const onClickDelivery=()=> {
    setDisplayPickupForm(false);
    setDisplayChoiceDeliverButtons(false);
    setDisplayDeliveryForm(true);
  }

  return (
    <Grid sx={cssDrawerRight} ref={refOne}>
      <Stack direction="column" spacing={0} sx={cssH2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant={'h2'}>Hi There!</Typography>
          <HighlightOffIcon
            sx={{ width: '50px', minHeight: '50px', cursor: 'pointer' }}
            onClick={setShowDrawer}
          ></HighlightOffIcon>
        </Box>
        <Typography variant={'h2'}>Here is your shopping cart.</Typography>
      </Stack>
      <ProductCart open={open}/>
      <Divider component="li"/>

      <Box sx={{pt: '5px'}}>
        <Typography>
          <CancelOutlinedIcon color={'error'} fontSize={'small'}/>
          *WARNING: Products sold here can expose you to chemicals including Δ9-Tetrahydrocannabinol (Δ9 - THC),
          which
          are known
          to the State of California to cause birth defects or other reproductive harm. For more information go
          to:&nbsp;
          <Link href="https://www.P65Warnings.ca.gov" underline="hover">
            P65Warnings.ca.gov
          </Link>
        </Typography>
      </Box>

      {displayCheckoutAddressForm && displayChoiceDeliverButtons
          ?(
                <><Box>
                  <Typography variant={'h4'} sx={{fontWeight: '400'}}>
                    Are you picking up or is this a delivery?
                  </Typography>
                </Box>
                <Box sx={{pt: '5px'}} >
                  <Button
                      onClick={onClickPickup}
                      variant="outlined"
                      color="info"
                      fullWidth
                      sx={{
                        color: 'white',
                        mt: '24px',
                        border: '1px solid',
                        background: '#32beb9'
                      }}
                  >
                    I WANT TO PICK UP
                  </Button>
                  <Button
                      onClick={onClickDelivery}
                      variant="outlined"
                      color="info"
                      fullWidth
                      sx={{
                        color: 'white',
                        mt: '24px',
                        border: '1px solid',
                        background: '#32beb9'
                      }}
                  >
                    DELIVER MY ORDER
                  </Button>

                </Box></>

            ):(
                <Box sx={{pt: '5px'}}>
                  {displayDeliveryForm && <CheckoutAddressDelivery />}
                  {displayPickupForm && <CheckoutAddressPickup />}
                </Box>
            )
      }

     {/* {
        !displayLoginForm && !displayRegisterForm
            ? (
                <>
                  <Box sx={{pt: '60px'}}>
                    <Typography variant={'h2'} sx={{fontWeight: '400'}}>
                      Already have an account?
                    </Typography>
                    <Button
                        // href="/login"
                        onClick={() => onClickLogin()}
                        variant="outlined"
                        color="info"
                        fullWidth
                        sx={{
                          color: 'white',
                          mt: '24px',
                          border: '1px solid',
                          //'&:hover': {textDecoration: 'underline'},
                          background: '#32beb9'
                        }}
                    >
                      LOGIN
                    </Button>

                  </Box>
                  <Box sx={{ pt: '60px' }}>
                    <Typography variant={'h2'} sx={{ fontWeight: '400' }}>
                      Don't have an account?
                    </Typography>
                    <Button
                        //href="/register"
                        variant="outlined"
                        color="info"
                        onClick={() => onClickRegister()}
                        fullWidth
                        sx={{ color: 'white', mt: '24px', border: '1px solid', '&:hover': { textDecoration: 'underline' }, background: '#32beb9' }}
                    >
                      CREATE AN ACCOUNT
                    </Button>
                  </Box>
                </>
            ) :
            (
                <Box sx={{ pt: '60px' }}>
                  {
                      displayLoginForm && <HeaderLogin checkLayout={1} typeLayout={'panel'}/>
                  }
                  {
                      displayRegisterForm && <HeaderLogin checkLayout={2} typeLayout={'panel'} />
                  }
                </Box>
            )
      }*/}


    </Grid>
  );
}

export default DrawerRightCart;

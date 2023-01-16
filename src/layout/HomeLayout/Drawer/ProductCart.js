import iconTrash from 'assets/images/icons/icon-trash.svg';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {
  Box,
  Grid,
  List,
  Stack,
  Typography,
  ListItem,
  Link,
  OutlinedInput,
  Divider,
  Table,
  TableBody, TableRow, TableCell
} from '@mui/material';
import { useEffect, useState } from 'react';
import { KureDatabase } from 'request/KureDatabase';
import Qr from "utils/Qr";

const kureDBInitialData = new KureDatabase().initData;

function ProductCart({ open }) {
  // Our first array, we assume will start with quantity of one.
  const [orderItems, setOrderItems] = useState(kureDBInitialData.order_item);
  const [quantities, setQuantities] = useState(onPageLoadPrepQuantities());
  const [cartTotals, setCartTotals] = useState(kureDBInitialData.cart_totals);

  const cssImgProduct = {
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    objectFit: 'cover',
    background: '#f7f7f7',
    border: '1px solid',
    boxSizing: 'border-box',
  };
  const cssImgIcon = {
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    objectFit: 'cover',
    background: '#f7f7f7',
    border: '1px solid',
    boxSizing: 'border-box',
    cursor: 'pointer',
  };
  const cssBorder = {
    height: '30px',
    border: '1px solid #fff',
    cursor: 'pointer'
  };

  /**
   * When the cart loads, we need to know how many products are listed. Each requires we track the quantity. We prep
   * useState for quantities to ensure each product has its own quantity tracking.
   *
   * @returns {*[]}
   */
  function onPageLoadPrepQuantities() {
    let array = [];
    Object.keys(kureDBInitialData.order_item).map((key) => {
      array[key] = {
        quantity: 1,
      }
    });

    return array;
  }

  /**
   * On page load, quantify order item totals.
   */
  useEffect(() => {
    summarizeTotals();
  }, []);

  function monetizeToLocal(value) {
    return (value).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  function summarize(object, adjustment_type, adjustment_name, value) {
    if (!object.summary[adjustment_type]) {
      object.summary[adjustment_type] = [];
    }

    if (object.summary[adjustment_type][adjustment_name]) {
      object.summary[adjustment_type][adjustment_name] += value;
    } else {
      object.summary[adjustment_type][adjustment_name] = value;
    }
  }

  function sumAdjustment(type, order_item) {
    let value = 0;
    order_item.adjustment.map((adjustment, index) => {
      if (adjustment.type === type) {

        switch (adjustment.discount_type) {
          case 'percent':
            value += order_item.subtotal * (adjustment.value / 100);
            summarize(cartTotals, adjustment.type, adjustment.name, value);
            adjustment.total = value;
            break;

          case 'flat':
            value += adjustment.value;
            summarize(cartTotals, adjustment.type, adjustment.name, adjustment.value);
            adjustment.total = value;
            break;
        }
      }
    });
    return value;
  }

  function subtotalWithoutAdjustment(order_item) {
    let value = 0;
    value = order_item.retail_price * order_item.quantity;
    return value;
  }

  function applyDiscount(subtotal, totalDiscount) {
    let value = 0;
    value = subtotal - totalDiscount;
    return value;
  }

  function applyTaxes(subtotal, totalTaxes) {
    let value = 0;
    value = subtotal + totalTaxes;
    return value;
  }

  function totalWithAdjustment(subtotal, totalShipping) {
    let value = 0;
    value = subtotal + totalShipping;
    return value;
  }

  function initializeCart(object) {
    object.subtotal = 0;
    object.tax = 0;
    object.discount = 0;
    object.shipping = 0;
    object.total = 0;
    object.summary = [];
  }

  function summarizeTotals() {
    initializeCart(cartTotals);
    orderItems.map((order_item, index) => {

      order_item.subtotal = subtotalWithoutAdjustment(order_item);
      const totalDiscounts = sumAdjustment('discount', order_item);
      order_item.subtotal = applyDiscount(order_item.subtotal, totalDiscounts);
      const totalTaxes = sumAdjustment('tax', order_item);
      order_item.subtotal = applyTaxes(order_item.subtotal, totalTaxes);
      const totalShipping = sumAdjustment('shipping', order_item);
      order_item.subtotal = totalWithAdjustment(order_item.subtotal, totalShipping);

      // Summary subtotal: 100 * quantity
      // Apply discount: 10
      // Apply tax: (subtotal-discount) * tax_amount
      // Apply shipping: 18
      // Get total: (subtotal-discount) * tax_amount + shipping

      cartTotals.subtotal += subtotalWithoutAdjustment(order_item);
      cartTotals.discount += totalDiscounts;
      cartTotals.tax += totalTaxes;
      cartTotals.shipping += totalShipping;
      cartTotals.total += order_item.subtotal;
      summarize(cartTotals, 'total', 'Total', order_item.subtotal);

      //console.log(order_item);
    })
  }

  function taxPercentage(cartTotals) {
    let value = Math.round(((((cartTotals.subtotal - cartTotals.discount) / cartTotals.tax) + Number.EPSILON) * 100) / 100);
    return value;
  }

  const incrementDecrement = (index, direction) => {
    // We don't want the user to pass below 1. Simulate what the value of quantity would be if we applied
    // the count change or direction.
    if ((quantities[index].quantity + direction) !== 0) {
      quantities[index].quantity += direction;
      setQuantities([...quantities]);

      orderItems[index].quantity += direction;
      setOrderItems([...orderItems]);

      kureDBInitialData.order_item[index].quantity = quantities[index].quantity;
      summarizeTotals();
    }
  };

  return (
    <>
      {orderItems.map((order_item, index) => (
        <Box key={index}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <img src={iconTrash} alt="iconTrash" style={cssImgIcon} />
            <img src={iconTrash} alt="ProductImage" style={cssImgProduct}/>
            <Typography>{order_item.title}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <RemoveOutlinedIcon sx={cssBorder} onClick={(e) => incrementDecrement(index, -1)}/>
              <OutlinedInput
                value={order_item.quantity}
                sx={{
                  width: '40px',
                  height: '30px',
                  fontSize: '16px',
                  border: '1px solid',
                  borderRadius: '0px',
                  color: "white",
                  p: 0,
                  '& .MuiOutlinedInput-input': { p: '0', textAlign: 'center' }
                }}
              ></OutlinedInput>
              <AddOutlinedIcon sx={cssBorder} onClick={(e) => incrementDecrement(index, 1)}/>
            </Box>
            <Typography>{monetizeToLocal(order_item.retail_price * order_item.quantity)}</Typography>
          </Stack>
        </Box>
      ))}
      <Divider component="li"/>
      {/*<Qr open={open}/>*/}
      <Stack sx={{ pt: '18px'}}>
        <Table>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0, fontWeight: 'bold' } }}>
              <TableCell component="th" scope="row" sx={{color:'white', borderBottom: 'none', px: 0, py: '10' }}>
                Subtotal
              </TableCell>
              <TableCell align="right" sx={{color:'white', borderBottom: 'none', px: 0, py: '10' }}>
                {monetizeToLocal(cartTotals.subtotal)}
              </TableCell>
            </TableRow>
            {
              Object.keys(cartTotals.summary).map((key) => (
                Object.keys(cartTotals.summary[key]).map((name, index) => (
                  <TableRow key={key + index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0, fontWeight: 'bold' } }}>
                    {(key === 'tax')
                      ?
                      (<TableCell key={name + index} component="th" scope="row"
                                  sx={{color:'white', borderBottom: 'none', px: 0, py: '10' }}>
                        {name + " " + taxPercentage(cartTotals) + "%"}
                      </TableCell>)
                      :
                      (<TableCell key={name + index} component="th" scope="row"
                                  sx={{color:'white', borderBottom: 'none', px: 0, py: '10' }}>
                        {name}
                      </TableCell>)
                    }

                    <TableCell key={index} align="right" sx={{color:'white', borderBottom: 'none', px: 0, py: '10' }}>
                      {monetizeToLocal(cartTotals.summary[key][name])}
                    </TableCell>
                  </TableRow>
                ))
              ))
            }
          </TableBody>
        </Table>
      </Stack>
    </>
  );
}

export default ProductCart;

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  ButtonBase,
  FormHelperText,
  FormControl,
  BottomNavigation,
  BottomNavigationAction,
  Input
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import configHomeRouter from 'routes/configRouterHome';
import DrawerRight from '../Drawer/DrawerRight';
import { openDrawer } from 'store/reducers/menu';
import DrawerRightCart from '../Drawer/DrawerRightCart';
// import DrawerLeft from '../Drawer/DrawerLeft';
import SearchValue from 'components/SearchValue/index';
import Logo from './Logo/Logo';
import homeIcon from 'assets/images/icons/icon-home.svg';
import cartIcon from 'assets/images/icons/icon-cart.svg';
import emojiIcon from 'assets/images/icons/icon-emoji-sunglasses.svg';
import cameraIcon from 'assets/images/icons/cash-only-icon-two.png';
import logoTablets from 'assets/images/icons/isotype.png';
import { useNavigate } from 'react-router-dom';
import { Resource } from "../../../request/Resource";

function Header() {
  const resource = new Resource();

  const [storeId, setStoreId] = useState(localStorage.getItem("store_id") ? Number(localStorage.getItem("store_id")) : 2);
  const handleChange = (event) => {
    setStoreId(Number(event.target.value));
    localStorage.setItem("store_id", event.target.value)
    const channel = new BroadcastChannel('kure-app')
    channel.postMessage({ type: 'product_data', data: '', action: 'sync' })
  };

  const [showDrawerRight, setShowDrawerRight] = useState(false);
  //const [showDrawerLeft, setShowDrawerLeft] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [openSearchBox, setOpenSearchBox] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { drawerOpen } = useSelector((state) => state.menu);
  const [open, setOpen] = useState(drawerOpen);

  const style = {
    width: { xs: '28px', sm: '40px' },
    height: '40px'
  };

  let menu_anonymous = [
    {
      type: 'home',
      label: 'HOME',
      icon: <Box sx={style}><img src={homeIcon} alt="Home" width={'100%'} height={'100%'} /></Box>
    },
    {
      type: 'cart',
      label: 'CART',
      icon: <Box sx={style}><img src={cartIcon} alt="Home" width={'100%'} height={'100%'} /></Box>
    },
    {
      type: 'account',
      label: 'ACCOUNT',
      icon: <Box sx={style}><img src={emojiIcon} alt="Home" width={'100%'} height={'100%'} /></Box>
    }
  ];
  let menu_logged_in = [
    {
      type: 'home',
      label: 'HOME',
      icon: <Box sx={style}><img src={homeIcon} alt="Home" width={'100%'} height={'100%'} /></Box>
    },
    {
      type: 'cart',
      label: 'CART',
      icon: <Box sx={style}><img src={cartIcon} alt="Home" width={'100%'} height={'100%'} /></Box>
    },
    {
      type: 'account',
      label: resource.userGetName(),
      icon: <Box sx={style}><img src={emojiIcon} alt="Home" width={'100%'} height={'100%'} /></Box>
    }
  ];

  const menu = (resource.isLoggedIn()) ? menu_logged_in : menu_anonymous;

  // const [dataTitle, setDataTitle] = useState([
  //   {
  //     label: 'Accessories',
  //     value: 'Accessories'
  //   },
  //   {
  //     label: 'Apparel',
  //     value: 'Apparel'
  //   },
  //   {
  //     label: 'Cartridge',
  //     value: 'Cartridge'
  //   },
  //   {
  //     label: 'Concentrate',
  //     value: 'Concentrate'
  //   },
  //   {
  //     label: 'Edibles',
  //     value: 'Edibles'
  //   },
  //   {
  //     label: 'Flower',
  //     value: 'Flower'
  //   },
  //   {
  //     label: 'Glass',
  //     value: 'Glass'
  //   },
  //   {
  //     label: 'Hemp',
  //     value: 'Hemp'
  //   },
  //   {
  //     label: 'Preroll',
  //     value: 'Preroll'
  //   },
  //   {
  //     label: 'Seeds',
  //     value: 'Seeds'
  //   },
  //   {
  //     label: 'Tincture',
  //     value: 'Tincture'
  //   },
  //   {
  //     label: 'Topicals',
  //     value: 'Topicals'
  //   }
  // ]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  const checkShowDrawer = (type) => {
    if (type === 'account') {
      setShowDrawerRight(!showDrawerRight);
    } else if (type === 'cart') {
      setOpen(!open);
      dispatch(openDrawer({ drawerOpen: !open }));
    } else {
      navigate('/')
    }
  };

  return (
    <Box
      sx={{
        height: { sm: '166px', md: '120px', lg: '145px' },
        m: '15px',
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' }
      }}
    >
      <ButtonBase disableRipple component={Link} to={configHomeRouter.home} sx={{ '& img': { width: '100%' } }}>
        <Logo />
      </ButtonBase>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          backgroundImage: `url(${logoTablets})`,
          backgroundRepeat: 'no-repeat',
          position: 'absolute',
          backgroundPosition: 'top',
          opacity: '0.1',
          width: '100%',
          height: '100%'
        }}
      >

      </Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', sm: 'column', md: 'row' } }}>
          <Box sx={{ p: '10px 16px 10px 0px', display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Box sx={{ width: { xs: '40px', sm: '52px' }, height: { xs: '40px', sm: '52px' } }}>
              <img src={cameraIcon} style={{ width: '100%', height: '100%' }} alt="" />
            </Box>
            <FormControl sx={{ width: { xs: '180px', sm: 'auto' } }}>
              <FormHelperText sx={{ color: '#f7f7f7', fontSize: { xs: '0.875rem', sm: '1rem' } }}>Select
                store:</FormHelperText>
              <select
                value={storeId}
                onChange={handleChange}
                style={{
                  background: '#272727',
                  border: 0,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  color: '#f7f7f7',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                <option value={2}>Kure Wellness - Lake Mendocino</option>
                <option value={3}>Kure Wellness - Willits</option>
                <option value={4}>Kure Wellness - South Ukiah</option>
              </select>
            </FormControl>
          </Box>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#414242',
              borderRadius: '20px',
            }}
          >
            <Input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value)
                setOpenSearchBox(true)
              }}
              sx={{
                with: '250px',
                color: '#cecece',
                backgroundColor: '#414242',
                borderRadius: '20px 0 0 20px',
                fontSize: { xs: '0.75rem', sm: '1rem' },
                '& .MuiInputBase-input': {
                  p: '6px 12px 7px 12px',
                  height: { xs: '17px', sm: '33px' },
                  textTransform: 'uppercase',
                },
                '&::after': { borderBottom: 0 },
                '&::before': { borderBottom: 0 },
              }}
              placeholder="Search our products"
            />
            <Box sx={{ width: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <SearchIcon />
            </Box>

            {/* If have search value and openSearchBox just opened the search value box. */}
            {searchValue.length > 0 && openSearchBox &&
              <SearchValue setSearchValue={setSearchValue} setopenSearchBox={setOpenSearchBox} />}
          </Box>
        </Box>
      </Box>
      <Box sx={{ py: '10px' }}>
        <BottomNavigation sx={{ backgroundColor: 'transparent', gap: '10px' }}>
          {menu.map((item, index) => (
            <BottomNavigationAction
              key={index}
              label={item.label}
              icon={item.icon}
              sx={{
                p: 0,
                minWidth: 'auto',
                height: 'fit-content',
                fontSize: { xs: '0.75rem', sm: '1rem' },
                textTransform: 'uppercase',
                '&:hover': {
                  background: '#353535'
                },
                '& .MuiBottomNavigationAction-label': { color: '#fff', opacity: 1, mt: '5px', fontSize: '0.75rem' }
              }}
              onClick={() => checkShowDrawer(item.type)}
            />
          ))}
        </BottomNavigation>
      </Box>
      <DrawerRight showDrawerRight={showDrawerRight} setShowDrawerRight={setShowDrawerRight} />
      <DrawerRightCart />
      {/*<DrawerLeft showDrawerLeft={showDrawerLeft} setShowDrawerLeft={setShowDrawerLeft} dataTitle={dataTitle}/>*/}
    </Box>
  );
}

export default Header;

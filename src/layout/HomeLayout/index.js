import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from 'layout/HomeLayout/Header';
import Footer from 'layout/HomeLayout/Footer';
import GlobalStyle from 'Common/GlobalStyle/index';
import HeaderButton from "pages/home/HeaderButtonSelect";
import EmployeeActions from "components/EmployeeActions";

const HomeLayout = () => {
  return (
    <GlobalStyle>
      <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header/>
        <HeaderButton/>
        <EmployeeActions/>
        <Box sx={{ flex: 1 }}>
          <Outlet/>
        </Box>
        <Footer/>
      </Box>
    </GlobalStyle>
  );
};
export default HomeLayout;

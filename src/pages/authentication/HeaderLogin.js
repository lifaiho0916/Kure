import {Box, Button, Grid, Typography} from '@mui/material';
import {Link, useNavigate, useNavigation} from 'react-router-dom';
import configHomeRouter from 'routes/configRouterHome';
import AuthRegister from "pages/authentication/auth-forms/AuthRegister";
import {useEffect, useState} from "react";
import AuthLogin from "pages/authentication/auth-forms/AuthLogin";
import AuthReset from "pages/authentication/auth-forms/AuthReset";

function HeaderLogin({ checkLayout, typeLayout}) {
    const cssActive = {
        textAlign: 'center',
        backgroundColor: '#32beb9',
        display: 'flex',
        color: '#fff',
        // '&:hover': {
        //     textDecoration: 'underline'
        // }
    };
    const cssInactive = {
        textAlign: 'center',
        backgroundColor: '#414242',
        display: 'flex',
        // '&:hover': {
        //     textDecoration: 'underline',
        //     backgroundColor: '#32beb9'
        // }
    };
    const checkPage = (index) => {

        if (layoutShow === index ) {
            return cssActive;
        } else {
            return cssInactive;
        }
    };

    const [displayLoginForm, setDisplayLoginForm] = useState(false);
    const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
    const [displayResetForm, setDisplayResetForm] = useState(false);
    const [layoutShow, setLayoutShow] = useState();

    const navigate = useNavigate();
    const onClickLogin=(route)=> {
        initializeDisplayState();
        if (typeLayout === 'panel') {
            setDisplayLoginForm(true);
        } else {
            navigate({pathname: route})
        };
        setLayoutShow(1);
    }
    const onClickRegister=(route)=>{
        initializeDisplayState();
        if (typeLayout === 'panel') {
            setDisplayRegisterForm(true);
        } else {
            navigate({pathname: route})
        };
        setLayoutShow(2);
    }
    const onClickReset=(route)=>{
        initializeDisplayState();
        if (typeLayout === 'panel') {
            setDisplayResetForm(true);
        } else {
            navigate({pathname: route})
        };
        setLayoutShow(3);
    }

    const initializeDisplayState=()=>{
        setDisplayLoginForm(false);
        setDisplayRegisterForm(false);
        setDisplayResetForm(false);
    }

    useEffect(() => {
        checkLayout === 1 && (setDisplayLoginForm(true));
        checkLayout === 2 && (setDisplayRegisterForm(true));
        setLayoutShow(checkLayout);

    }, []);

    return (

        <Grid
            container
            item
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap:'10px',
            }}
            justifyContent="space-between"
        >

            <Grid item sx={checkPage(1)}>
                <Button
                    onClick={()=>{onClickLogin(configHomeRouter.login)}}
                    variant="body1"
                    sx={{ textDecoration: 'none', width: '100%', padding: '0.2em 1em', color: '#FFF' }}
                >
                    Log in
                </Button>
            </Grid>
            <Grid item sx={checkPage(2)}>
                <Button
                    onClick={()=>{onClickRegister(configHomeRouter.register)}}
                    variant="body1"
                    sx={{ textDecoration: 'none', width: '100%', padding: '0.2em 1em', color: '#FFF' }}
                >
                    Create new account
                </Button>
            </Grid>
            <Grid item sx={checkPage(3)}>
                <Button
                    onClick={()=>{onClickReset(configHomeRouter.reset)}}
                    variant="body1"
                    sx={{ textDecoration: 'none', width: '100%', padding: '0.2em 1em', color: '#FFF' }}
                >
                    Reset your password
                </Button>
            </Grid>

            {
                typeLayout === 'panel' &&(
                    <Box sx={{pt: '60px'}}>
                        {displayLoginForm && (<AuthLogin />)}
                        {displayRegisterForm  && (<AuthRegister />)}
                        {displayResetForm && (<AuthReset />)}
                    </Box>
                    )
            }

        </Grid>
    );
}

export default HeaderLogin;

import {Box, Button, OutlinedInput, Stack, TextField, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckoutAddressDelivery from "pages/home/CheckoutAddressDelivery";

const profile = [{
    name: 'fernanda',
    location: '123 One way street Ukiah CA 95490',
}]
function CheckoutAddressPickup({ typeLayout}) {

    const [displayDeliveryForm, setDisplayDeliveryForm] = useState(false);
    const [displayPickupForm, setDisplayPickupForm] = useState(true);
        const onClickSwitch=()=> {
            setDisplayDeliveryForm(true);
            setDisplayPickupForm(false);
        }

    return (
        <Box sx={{pt: '5px'}}>
        {
            displayPickupForm ?(
                <>
                    <Box>
                        <Typography variant={'h4'} sx={{fontWeight: '400'}}>
                            Where would you like to pick up your order?
                        </Typography>
                    </Box>
                    <Box sx={{pt: '20px'}}>
                        {profile.map((userProfile, id) =>(
                            <Stack key={id} direction={"row"}>
                                <LocationOnIcon></LocationOnIcon>
                                <OutlinedInput
                                    value= {userProfile.location}
                                    disabled
                                    sx={{
                                        width: '100%',
                                        height: '40px',
                                        fontSize: '16px',
                                        color: "white",
                                        p: 0,
                                        '& .MuiOutlinedInput-input': {p: '0', textAlign: 'center'}
                                    }}
                                ></OutlinedInput>
                            </Stack>
                        ))}

                        <Button
                            // href="/login"
                            //onClick={() => onClickLogin()}
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
                            I'LL USE THIS STORE
                        </Button>
                        <Button
                            // href="/login"
                            onClick={onClickSwitch}
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
                            SWITCH TO DELIVERY
                        </Button>
                    </Box>
                </>
            ):(
                <CheckoutAddressDelivery />
            )
        }
        </Box>
    );
}

export default CheckoutAddressPickup;

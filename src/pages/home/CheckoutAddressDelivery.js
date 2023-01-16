import {Box, Button, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography} from '@mui/material';
import {useEffect, useState} from "react";
import CheckoutAddressPickup from "pages/home/CheckoutAddressPickup";
import {Autocomplete} from "@mui/lab";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddressBookSelection from "pages/home/AddressBookSelection";

function CheckoutAddressDelivery({ typeLayout}) {
    const [displayDeliveryForm, setDisplayDeliveryForm] = useState(true);
    const [displayPickupForm, setDisplayPickupForm] = useState(false);
    const [displayEditAddressDelivery, setDisplayEditAddressDelivery] = useState(false);

    const onClickSwitch=()=> {
        setDisplayDeliveryForm(false);
        setDisplayPickupForm(true);
    }
    const onClickEditAddress =()=>{
        setDisplayEditAddressDelivery(true);
        setDisplayDeliveryForm(false);
        setDisplayPickupForm(false);
    }
    const profile = [{
        name: 'fernanda',
        location: '123 One way street Ukiah CA 95490',
    }]
    return (

        <Box sx={{pt: '5px'}}>
            {displayDeliveryForm ?(
                <>
                    <Box>
                        <Typography variant={'h4'} sx={{fontWeight: '400'}}>
                           Where do you want this to be delivered?
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
                    </Box>

                    <Box>
                        <Button
                            // href="/login"
                            onClick={() => onClickEditAddress()}
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
                            EDIT THIS ADDRESS
                        </Button>

                        <Stack direction={"row"}>

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
                                    background: '#32beb9'
                                }}
                            >
                                DELIVER TO THIS ADDRESS
                            </Button>

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
                                    background: '#32beb9'
                                }}
                            >
                                ADD NEW ADDRESS
                            </Button>
                        </Stack>
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
                                background: '#32beb9'
                            }}
                        >
                            I'LL PICK IT UP FROM THE STORE
                        </Button>
                    </Box>
                </>):(
                    displayEditAddressDelivery
                    ?(
                        <AddressBookSelection/>
                    ):(
                        <CheckoutAddressPickup />
                    )
                )}

        </Box>
    );
}

export default CheckoutAddressDelivery;

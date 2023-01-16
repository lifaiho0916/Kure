import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack, Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import Toast from "components/Toast";
import Required from "assets/images/icons/required.svg";

const cssStart = {
    fontSize: '1em',
    color: '#FFF',
    '&::after': {
        display: 'inline-block',
        width: '6px',
        height: '6px',
        margin: '0 0.3em',
        content: '""',
        verticalAlign: 'super',
        backgroundImage: `url(${Required})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '6px 6px'
    }
};
const cssShow = {
    display: 'list-item',
    ml: 4,
    pl: 0,
    py: 0,
    width: 'calc(100% - 32px)',
    color: '#FFF'
};
const AddressBookSelection = () => {

    const [messageToast, setMessageToast] = useState('');

    return (
        <>
            <Toast messageToast={messageToast} setMessageToast={setMessageToast}/>
            <Formik
                initialValues={{
                    address : '',
                    country : '',
                    zipcode : '',
                    state : '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    address: Yup.string().max(255).required('Address is required'),
                    state: Yup.string().max(255).required('State is required'),
                    zipcode: Yup.string().max(255).required('Zip Code is required'),
                    country: Yup.string().max(255).required('Country is required'),

                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    console.log("onSubmit");
                    /*resource.register(values.email, values.username, values.password).then((response) => {
                        console.log(response);
                    }).catch((error) => {
                        console.log(error);
                        setStatus({ success: false });
                        setErrors({ submit: error });
                        setSubmitting(false);
                    })*/
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Box sx={{pt: '5px'}}>
                                    <Typography variant={'h4'} sx={{fontWeight: '400'}}>
                                        What is the new address?
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>

                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup" sx={cssStart}>
                                        Address
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.address && errors.address)}
                                        id="address-checkout"
                                        type="address"
                                        value={values.username}
                                        name="address"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="address"
                                        sx={{ background: '#FFF' }}
                                        inputProps={{}}
                                        required={true}
                                    />
                                    {touched.address && errors.address && (
                                        <FormHelperText error id="helper-address-checkout">
                                            {errors.address}
                                        </FormHelperText>
                                    )}
                                    {/*<InputLabel sx={{ textOverflow: 'none', whiteSpace: 'inherit', color: '#FFF' }}>*/}
                                    {/*    Several special characters are allowed, including space, period (.), hyphen (-), apostrophe ('),*/}
                                    {/*    underscore (_), and the @ sign.*/}
                                    {/*</InputLabel>*/}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="state-checkout" sx={cssStart}>
                                        State
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.state && errors.state)}
                                        id="state-checkout"
                                        type="state"
                                        value={values.username}
                                        name="state"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="state"
                                        sx={{ background: '#FFF' }}
                                        inputProps={{}}
                                        required={true}
                                    />
                                    {touched.state && errors.state && (
                                        <FormHelperText error id="state-checkout">
                                            {errors.state}
                                        </FormHelperText>
                                    )}
                                    {/*<InputLabel sx={{ textOverflow: 'none', whiteSpace: 'inherit', color: '#FFF' }}>*/}
                                    {/*    Several special characters are allowed, including space, period (.), hyphen (-), apostrophe ('),*/}
                                    {/*    underscore (_), and the @ sign.*/}
                                    {/*</InputLabel>*/}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup" sx={cssStart}>
                                        ZIP Code
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.zipcode && errors.zipcode)}
                                        id="zipcode-checkout"
                                        type="zipcode"
                                        value={values.username}
                                        name="zipcode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="zipcode"
                                        sx={{ background: '#FFF' }}
                                        inputProps={{}}
                                        required={true}
                                    />
                                    {touched.zipcode && errors.zipcode && (
                                        <FormHelperText error id="helper-text-zipcode-checkout">
                                            {errors.zipcode}
                                        </FormHelperText>
                                    )}
                                    {/*<InputLabel sx={{ textOverflow: 'none', whiteSpace: 'inherit', color: '#FFF' }}>*/}
                                    {/*    Several special characters are allowed, including space, period (.), hyphen (-), apostrophe ('),*/}
                                    {/*    underscore (_), and the @ sign.*/}
                                    {/*</InputLabel>*/}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="email-signup" sx={cssStart}>
                                        Country
                                    </InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.country && errors.country)}
                                        id="country-checkout"
                                        type="country"
                                        value={values.username}
                                        name="country"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="country"
                                        sx={{ background: '#FFF' }}
                                        inputProps={{}}
                                        required={true}
                                    />
                                    {touched.country && errors.country && (
                                        <FormHelperText error id="helper-text-country-checkout">
                                            {errors.country}
                                        </FormHelperText>
                                    )}
                                    {/*<InputLabel sx={{ textOverflow: 'none', whiteSpace: 'inherit', color: '#FFF' }}>*/}
                                    {/*    Several special characters are allowed, including space, period (.), hyphen (-), apostrophe ('),*/}
                                    {/*    underscore (_), and the @ sign.*/}
                                    {/*</InputLabel>*/}
                                </Stack>
                            </Grid>

                            {errors.submit && (
                                <Grid item xs={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <AnimateButton>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color = 'info'
                                        sx={{ background: '#32beb9' }}
                                    >
                                        Save address
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default AddressBookSelection;

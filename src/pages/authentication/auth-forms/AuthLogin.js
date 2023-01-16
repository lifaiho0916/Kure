import React, { useEffect, useState } from 'react';
import { Resource } from "request/Resource";
import Required from 'assets/images/icons/required.svg';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import AnimateButton from 'components/@extended/AnimateButton';
import { useNavigate } from "react-router-dom";

const resource = new Resource();

const AuthLogin = () => {
  const navigate = useNavigate();
  const [keepMeSignedIn, setKeepMeSignedIn] = useState(localStorage.getItem('keep_me_signed_in') === 'true');

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null
        }}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          resource.login(values.username, values.password).then((response) => {
            resource.oAuthTokenSave(response.data);
            setStatus({ success: true });
            resource.userGetProfileData().then((user_data) => {
              // We'll use this later on to determine if we should close their session when the browser is closed.
              localStorage.setItem('keep_me_signed_in', keepMeSignedIn ? 'true' : 'false');

              localStorage.setItem(resource.config.user_info, JSON.stringify(user_data.data[0]));

              // Send our subscription request.
              resource.savePushMessagingSubscription(user_data.data[0]);

              // Redirect to the front page.
              navigate('/');
            }).catch((error) => {
              console.log(error);
            });
          }).catch((error) => {
            console.log(error);
            // setStatus({ success: false });
            // setErrors({ submit: error });
            // setSubmitting(false);
          });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="email-login"
                    sx={{
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
                    }}
                  >
                    Username
                  </InputLabel>
                  <OutlinedInput
                    id="username-login"
                    type="username"
                    value={values.username}
                    name="username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter username"
                    fullWidth
                    sx={{ background: '#FFF' }}
                    error={Boolean(touched.username && errors.username)}
                  />
                  <Typography sx={{ fontSize: '0.85em', color: '#FFF' }}>Enter your Kure Wellness username.</Typography>
                  {touched.username && errors.username && (
                    <FormHelperText error id="standard-weight-helper-text-email-login">
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel
                    htmlFor="password-login"
                    sx={{
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
                    }}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    sx={{ background: '#FFF' }}
                    // endAdornment={
                    //     <InputAdornment position="end">
                    //         <IconButton
                    //             aria-label="toggle password visibility"
                    //             onClick={handleClickShowPassword}
                    //             onMouseDown={handleMouseDownPassword}
                    //             edge="end"
                    //             size="large"
                    //         >
                    //             {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                    //         </IconButton>
                    //     </InputAdornment>
                    // }
                    placeholder="Enter password"
                  />
                  <Typography sx={{ fontSize: '0.85em', color: '#FFF' }}>
                    Enter the password that accompanies your username.
                  </Typography>
                  {touched.password && errors.password && (
                    <FormHelperText error id="standard-weight-helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={keepMeSignedIn}
                        onChange={(event) => setKeepMeSignedIn(event.target.checked)}
                        name="checked"
                        color="primary"
                        size="small"
                      />
                    }
                    label={
                      <Typography variant="h6" sx={{ color: '#FFF' }}>
                        Keep me sign in
                      </Typography>
                    }
                  />
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
                    Login
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

export default AuthLogin;

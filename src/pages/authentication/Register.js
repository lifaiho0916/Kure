import { Grid, Stack } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import HeaderLogin from './HeaderLogin';
import AuthRegister from "./auth-forms/AuthRegister";

const Register = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <HeaderLogin checkLayout={2}/>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthRegister/>
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Register;

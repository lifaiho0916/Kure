import { Grid, Stack, Typography } from '@mui/material';
import AuthLogin from './auth-forms/AuthLogin';
import AuthWrapper from './AuthWrapper';
import HeaderLogin from './HeaderLogin';

const Login = () => (
  <AuthWrapper>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
          <HeaderLogin checkLayout={1}/>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <AuthLogin/>
      </Grid>
    </Grid>
  </AuthWrapper>
);

export default Login;

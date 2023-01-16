import { Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import HeaderLogin from './HeaderLogin';
import AuthReset from './auth-forms/AuthReset';

function ResetPassword() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline"
                 sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <HeaderLogin checkLayout={3}/>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthReset/>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

export default ResetPassword;

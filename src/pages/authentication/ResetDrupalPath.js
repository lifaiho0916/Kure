import { Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import HeaderLogin from './HeaderLogin';
import AuthPasswordReset from './auth-forms/AuthPasswordReset';

function ResetDrupalPath() {
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
          <AuthPasswordReset/>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

export default ResetDrupalPath;

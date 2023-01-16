import { Grid, Stack, Typography } from '@mui/material';
import AuthWrapper from './AuthWrapper';
import { useNavigate, useParams } from "react-router-dom";
import { Resource } from "../../request/Resource";
import { useEffect } from "react";

const resource = new Resource();

function VerifyDrupalPath() {
  const navigate = useNavigate();
  const cssShow = {
    ml: 4,
    pl: 0,
    py: 0,
    width: 'calc(100% - 32px)',
    color: '#FFF'
  };
  const { uid, timestamp, hash } = useParams();

  useEffect(() => {
    resource.verifyUserEmail(uid, timestamp, hash)
    .then((response) => {
      console.log(response.data);
      resource.oAuthTokenSave(response.data);
      // resource.getCurrentUserProfile()
      // .then((response) => {
      //   if (response) {
      //     // Save their username.
      //     localStorage.setItem(resource.config.user_info, response.data[0].name);
      //
      //     navigate('/');
      //   }
      // });
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="baseline"
                 sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            {/*<HeaderLogin checkLayout={3}/>*/}
          </Stack>
        </Grid>
        <Grid item xs={12} sx={cssShow}>
          <div>Please wait, while we are verifying account details ...</div>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}

export default VerifyDrupalPath;

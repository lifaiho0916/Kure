// import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, ButtonBase, Typography, Grid, } from '@mui/material';
import Logo from '../Header/Logo/Logo';
import configHomeRouter from 'routes/configRouterHome';
import ContentFooter from './ContentFooter';

import phoneIcon from 'assets/images/icons/phone.svg';
import mailIcon from 'assets/images/icons/mail.svg';
import licenseIcon from 'assets/images/icons/license.svg';
import locationIcon from 'assets/images/icons/location.svg';
import facebookIcon from 'assets/images/icons/like.svg';
import twitterIcon from 'assets/images/icons/tiwterIcon.svg';
import instagramIcon from 'assets/images/icons/instagram.svg';

function Footer() {
  const footerContents = [
    {
      title: 'Contact us',
      data: [
        {
          text: '(707) 621-5390',
          icon: phoneIcon,
          link: false
        },
        {
          text: 'info@kuremendocino.com',
          icon: mailIcon,
          link: true
        },
        {
          text: 'License no: C12-0000152-LIC',
          icon: licenseIcon,
          link: false
        },
        {
          text: '800 Lake Mendocino Dr Ukiah, CA 95482',
          icon: locationIcon,
          link: false
        }
      ]
    },
    {
      title: 'Connect with us',
      data: [
        {
          text: 'Like us on Facebook',
          icon: facebookIcon,
          link: true
        },
        {
          text: 'Follow us on Twitter',
          icon: twitterIcon,
          link: true
        },
        {
          text: 'Find us on Instagram',
          icon: instagramIcon,
          link: true
        }
      ]
    },
    {
      title: 'Company',
      data: [
        {
          text: 'About us',
          icon: null,
          link: true
        },
        {
          text: 'Farm stories',
          icon: null,
          link: true
        },
        {
          text: 'Mendo Fever article',
          icon: null,
          link: true
        },
        {
          text: 'Press release',
          icon: null,
          link: true
        }
      ]
    }
  ];
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Box sx={{ width: { xs: '100%', sm: '40%', lg: 'auto' } }}>
          <Box m={'10px'}>
            <ButtonBase
              component={Link}
              to={configHomeRouter.home}
              sx={{ pl: '1rem', '& img': { width: '225px', height: '113px' } }}
            >
              <Logo checkfooter={true}/>
            </ButtonBase>
          </Box>
          <Typography component="p" sx={{ '&.MuiTypography-root': { mb: '1rem', ml: '10px' } }}>
            © 2022 Kure Wellness
          </Typography>
        </Box>
        {footerContents.map((content, index) => (
          <ContentFooter content={content} key={index}/>
        ))}
      </Box>
    </Box>
  );
}

export default Footer;

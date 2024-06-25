import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ p: 2, backgroundColor: '#f5f5f5', marginTop: 'auto' }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Bản quyền © '}
        <a href="https://yourwebsite.com" style={{ textDecoration: 'none', color: 'inherit' }}>
          Your Website
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
};

export default Footer;

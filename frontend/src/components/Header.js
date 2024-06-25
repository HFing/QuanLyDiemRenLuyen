import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" style={{ backgroundColor: '#1e5245' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1, color: '#dbf5ee' }}>
          Quản Lý Điểm Rèn Luyện
        </Typography>
        <Button
          color="inherit"
          onClick={() => navigate('/')}
          sx={{
            color: '#70d8bd',
            '&:hover': {
              backgroundColor: '#3da58a',
              color: '#ffffff',
            },
          }}
        >
          Trang chủ
        </Button>
        <Button
          color="inherit"
          onClick={handleLogout}
          sx={{
            color: '#94e2cd',
            '&:hover': {
              backgroundColor: '#4cceac',
              color: '#ffffff',
            },
          }}
        >
          Đăng Xuất
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { LockOpen as LockOpenIcon, MailOutline as MailOutlineIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from "@mui/icons-material";
import Header from "../components/Header";
import { login } from "../services/authService";

const colors = {
  primary: "#3da58a",
  secondary: "#1e5245",
  tertiary: "#2e7c67",
  quaternary: "#0f2922",
  highlight1: "#4cceac",
  highlight2: "#70d8bd",
  highlight3: "#94e2cd",
  highlight4: "#b7ebde",
  background: "#dbf5ee",
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.data[0]);
      localStorage.setItem("user", JSON.stringify(data.data[1]));
      localStorage.setItem("userRole", data.data[1].nguoiDung.role);
      navigate("/");
    } catch (error) {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: colors.background }}
    >
      <Header />
      <Container maxWidth="sm" style={{ flex: "1 0 auto", padding: "2rem", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h4" gutterBottom style={{ color: colors.quaternary }}>
          Đăng Nhập
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          InputLabelProps={{ style: { color: colors.secondary } }}
          InputProps={{
            startAdornment: <MailOutlineIcon style={{ color: colors.primary }} />,
            style: { color: colors.quaternary },
            sx: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.primary },
                '&:hover fieldset': { borderColor: colors.highlight1 },
                '&.Mui-focused fieldset': { borderColor: colors.secondary },
              },
            },
          }}
        />
        <TextField
          label="Mật Khẩu"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          InputLabelProps={{ style: { color: colors.secondary } }}
          InputProps={{
            startAdornment: <LockOpenIcon style={{ color: colors.primary }} />,
            style: { color: colors.quaternary },
            sx: {
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: colors.primary },
                '&:hover fieldset': { borderColor: colors.highlight1 },
                '&.Mui-focused fieldset': { borderColor: colors.secondary },
              },
            },
          }}
        />
        <Box mt={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleLogin}
            sx={{
              backgroundColor: colors.primary,
              color: "#fff",
              '&:hover': { backgroundColor: colors.highlight1 },
              padding: "0.75rem",
              fontSize: "1rem",
            }}
            startIcon={<LockOpenIcon />}
          >
            Đăng Nhập
          </Button>
        </Box>
        {/* <Box mt={2}>
          <Typography variant="body2" style={{ textAlign: "center" }}>
            Bạn quên mật khẩu? <a href="#">Lấy lại mật khẩu</a>
          </Typography>
        </Box> */}
      </Container>
    </div>
  );
};

export default LoginPage;

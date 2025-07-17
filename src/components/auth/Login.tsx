import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirigir aquí si el login es exitoso
      navigate("/dashboard");
    } catch (err: any) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "linear-gradient(350deg, #FFA580 45%, #FF4151 55%)",
      }}
    >
      {/* Logo en la esquina superior izquierda */}
      <Box
        sx={{
          position: "absolute",
          top: 36,
          left: "20vh",
          zIndex: 1,
          width: "20vh",
          height: "20vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src={require("../../assets/icon-rojo.png")}
          alt="FindLo Logo"
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          maxWidth: 410,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 1,
            width: "100%",
            backgroundColor: "#FFF",
            boxShadow: "0 6px 24px rgba(45,45,45,0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Typography
                variant="h5"
                sx={{ color: "#2D2D2D", fontWeight: 700 }}
              >
                Inicio de Sesión
              </Typography>
              <Typography sx={{ color: "#6B7280", mb: 1 }}>
                Bienvenidos
              </Typography>
              <TextField
                label="Usuario / Correo Electrónico"
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: "#6B7280" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Contraseña"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "#6B7280" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#4ADE80",
                        "&.Mui-checked": { color: "#4ADE80" },
                      }}
                    />
                  }
                  label="Recuérdame"
                  sx={{ color: "#6B7280" }}
                />
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "#4ADE80", fontSize: 14 }}
                >
                  Olvide mi Contraseña
                </Link>
              </Stack>
              {error && (
                <Alert severity="error" sx={{ fontSize: 14 }}>
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  background: "#4ADE80",
                  color: "#fff",
                  fontWeight: "bold",
                  py: 1.2,
                  fontSize: 16,
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(74,222,128,0.08)",
                  "&:hover": {
                    background: "#22c55e",
                  },
                }}
              >
                INICIO
              </Button>
            </Stack>
          </form>
          <Typography
            sx={{
              color: "#FFA580",
              mt: 3,
              textAlign: "center",
              fontSize: 13,
              letterSpacing: 1,
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")}
          >
            REGÍSTRATE POR PRIMERA VEZ
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;

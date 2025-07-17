import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

function getPasswordStrength(pwd: string): string {
  if (pwd.length >= 8 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd))
    return "Strong";
  if (pwd.length >= 6) return "Medium";
  return "Weak";
}

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policy, setPolicy] = useState(false);
  const [error, setError] = useState("");
  const [strength, setStrength] = useState("Weak");
  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setStrength(getPasswordStrength(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!policy) {
      setError("Debes aceptar la política de privacidad.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      // Redirige a login u otra página
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error en el registro.");
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
            backgroundColor: "#F9FAFB",
            boxShadow: "0 6px 24px rgba(45,45,45,0.06)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Typography
                variant="h5"
                sx={{ color: "#2D2D2D", fontWeight: 700, textAlign: "center" }}
              >
                Negocio
              </Typography>
              <Typography sx={{ color: "#6B7280", mb: 1, textAlign: "center" }}>
                Hey there! Let's get started.
              </Typography>
              <TextField
                label="Name"
                type="text"
                required
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlinedIcon sx={{ color: "#6B7280" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Username or email"
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
                label="Password"
                type="password"
                required
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "#6B7280" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Typography sx={{ fontSize: 13, color: "#2D2D2D", mt: -1 }}>
                Password Strength:{" "}
                <span
                  style={{
                    color:
                      strength === "Strong"
                        ? "#4ADE80"
                        : strength === "Medium"
                        ? "#FFA580"
                        : "#FF4151",
                    fontWeight: 600,
                  }}
                >
                  {strength}
                </span>
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={policy}
                    onChange={(e) => setPolicy(e.target.checked)}
                    sx={{
                      color: "#4ADE80",
                      "&.Mui-checked": { color: "#4ADE80" },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 15, color: "#2D2D2D" }}>
                    I agree with{" "}
                    <Link href="#" sx={{ color: "#4ADE80" }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                sx={{ ml: 1, alignItems: "center" }}
              />
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
                  background: "#14ADEB",
                  color: "#fff",
                  fontWeight: "bold",
                  py: 1.2,
                  fontSize: 16,
                  borderRadius: 3,
                  boxShadow: "0 2px 8px rgba(74,222,128,0.08)",
                  "&:hover": {
                    background: "#19c6f9",
                  },
                }}
              >
                Sign up
              </Button>
            </Stack>
          </form>
          <Typography
            sx={{
              color: "#6B7280",
              mt: 3,
              textAlign: "center",
              fontSize: 15,
            }}
          >
            Existing User?{" "}
            <span
              style={{ color: "#4ADE80", cursor: "pointer", fontWeight: 600 }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Register;

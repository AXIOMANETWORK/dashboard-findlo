import React from "react";
import { Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import HomeIcon from "@mui/icons-material/Home";
import MailIcon from "@mui/icons-material/Mail";
import ListAltIcon from "@mui/icons-material/ListAlt";
import StorefrontIcon from "@mui/icons-material/Storefront";
import MessageIcon from "@mui/icons-material/Message";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const sideMenu = [
  { text: "Home", icon: <HomeIcon sx={{ color: "#4ADE80" }} />, path: "/dashboard" },
  { text: "Inbox", icon: <MailIcon sx={{ color: "#FF4151" }} />, path: null },
  { text: "Catalogo", icon: <ListAltIcon sx={{ color: "#14ADEB" }} />, path: "/dashboard/catalogo" },
  {
    text: "Registro de Negocios",
    icon: <StorefrontIcon sx={{ color: "#FFA580" }} />,
    path: "/dashboard/negocios",
  },
  { text: "Mensajes", icon: <MessageIcon sx={{ color: "#6B7280" }} />, path: null },
  { text: "Calender", icon: <CalendarMonthIcon sx={{ color: "#FACC15" }} />, path: null },
  { text: "Usuario", icon: <PersonIcon sx={{ color: "#2D2D2D" }} />, path: null },
  { text: "Settings", icon: <SettingsIcon sx={{ color: "#6B7280" }} />, path: null },
];

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", background: "#F9FAFB" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 220,
          background: "#fff",
          boxShadow: "2px 0 16px rgba(45,45,45,0.06)",
          px: 2,
          pt: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={require("../../assets/icon-rojo.png")}
            alt="FindLO"
            style={{ height: 38, width: "auto", objectFit: "contain" }}
          />
          <Typography variant="h6" sx={{ fontWeight: 800, color: "#2D2D2D" }}>
            FindLO
          </Typography>
          <IconButton sx={{ ml: "auto" }}>
            <MenuIcon />
          </IconButton>
        </Box>
        <List sx={{ mt: 4 }}>
          {sideMenu.map((item) => {
            const active = item.path !== null && location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => item.path && navigate(item.path)}
                  sx={{
                    borderRadius: 2,
                    background: active ? "#F1F7FE" : "none",
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      sx: {
                        color: active ? "#4ADE80" : "#2D2D2D",
                        fontWeight: active ? 700 : 500,
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      {/* Main content area, cada ruta hija pone su propio header/contenido */}
      <Box sx={{ flex: 1, bgcolor: "#F9FAFB" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;

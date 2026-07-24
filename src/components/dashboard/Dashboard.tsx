import React from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Paper,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 18000 },
  { name: "Mar", value: 16000 },
  { name: "Apr", value: 22000 },
  { name: "May", value: 26000 },
  { name: "Jun", value: 32000 },
  { name: "Jul", value: 40000 },
];

const ordersData = [
  { name: "Mon", value: 15 },
  { name: "Tue", value: 25 },
  { name: "Wed", value: 20 },
  { name: "Thu", value: 28 },
  { name: "Fri", value: 30 },
  { name: "Sat", value: 22 },
  { name: "Sun", value: 17 },
];

const Dashboard: React.FC = () => {
  return (
    <>
      {/* Header */}
      <Box
          sx={{
            background: "#FF4151",
            borderBottomLeftRadius: 36,
            borderBottomRightRadius: 36,
            pb: 3,
            px: 5,
            pt: 2,
            minHeight: 170,
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Search"
              size="small"
              sx={{
                bgcolor: "#fff",
                borderRadius: 2,
                width: 320,
                boxShadow: "0 2px 8px rgba(45,45,45,0.06)",
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#6B7280" }} />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ flex: 1 }} />
            <IconButton sx={{ color: "#fff" }}>
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <HelpOutlineIcon />
            </IconButton>
            <Avatar src="https://randomuser.me/api/portraits/women/44.jpg" />
            <Typography sx={{ color: "#fff", fontWeight: 700 }}>
              Arya Stark
            </Typography>
          </Box>
          <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 800 }}>
              Home
            </Typography>
            <Typography sx={{ color: "#fff", opacity: 0.8, fontSize: 15 }}>
              Home &nbsp; - &nbsp; Dashboard
            </Typography>
          </Box>
          <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
            <Paper
              sx={{
                p: 2,
                minWidth: 170,
                borderRadius: 2,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(45,45,45,0.08)",
              }}
            >
              <Typography fontWeight={700} fontSize={12} color="#6B7280">
                TOTAL TRAFFIC
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography variant="h6" fontWeight={800}>
                  123,456
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: 40,
                    minHeight: 40,
                    p: 0,
                    borderRadius: "50%",
                    bgcolor: "#4ADE80",
                    color: "#fff",
                    fontWeight: 800,
                    boxShadow: "none",
                  }}
                >
                  <span style={{ fontSize: 22 }}>↑</span>
                </Button>
              </Box>
              <Typography
                sx={{ color: "#4ADE80", fontWeight: 700, fontSize: 13, mt: 1 }}
              >
                +3.48%{" "}
                <span style={{ color: "#6B7280", fontWeight: 400 }}>
                  Since last month
                </span>
              </Typography>
            </Paper>
            <Paper
              sx={{
                p: 2,
                minWidth: 170,
                borderRadius: 2,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(45,45,45,0.08)",
              }}
            >
              <Typography fontWeight={700} fontSize={12} color="#6B7280">
                NEW USERS
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography variant="h6" fontWeight={800}>
                  2,345
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: 40,
                    minHeight: 40,
                    p: 0,
                    borderRadius: "50%",
                    bgcolor: "#FF4151",
                    color: "#fff",
                    fontWeight: 800,
                    boxShadow: "none",
                  }}
                >
                  <span style={{ fontSize: 22 }}>↓</span>
                </Button>
              </Box>
              <Typography
                sx={{ color: "#FF4151", fontWeight: 700, fontSize: 13, mt: 1 }}
              >
                -3.48%{" "}
                <span style={{ color: "#6B7280", fontWeight: 400 }}>
                  Since last month
                </span>
              </Typography>
            </Paper>
            <Paper
              sx={{
                p: 2,
                minWidth: 170,
                borderRadius: 2,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(45,45,45,0.08)",
              }}
            >
              <Typography fontWeight={700} fontSize={12} color="#6B7280">
                SALES
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography variant="h6" fontWeight={800}>
                  924
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: 40,
                    minHeight: 40,
                    p: 0,
                    borderRadius: "50%",
                    bgcolor: "#6B7280",
                    color: "#fff",
                    fontWeight: 800,
                    boxShadow: "none",
                  }}
                >
                  <span style={{ fontSize: 22 }}>$</span>
                </Button>
              </Box>
              <Typography
                sx={{ color: "#4ADE80", fontWeight: 700, fontSize: 13, mt: 1 }}
              >
                +3.48%{" "}
                <span style={{ color: "#6B7280", fontWeight: 400 }}>
                  Since last month
                </span>
              </Typography>
            </Paper>
            <Paper
              sx={{
                p: 2,
                minWidth: 170,
                borderRadius: 2,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(45,45,45,0.08)",
              }}
            >
              <Typography fontWeight={700} fontSize={12} color="#6B7280">
                Vigencia de tu Plan
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography variant="h6" fontWeight={800}>
                  6 meses
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: 40,
                    minHeight: 40,
                    p: 0,
                    borderRadius: "50%",
                    bgcolor: "#14ADEB",
                    color: "#fff",
                    fontWeight: 800,
                    boxShadow: "none",
                  }}
                >
                  <span style={{ fontSize: 22 }}>⎯</span>
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
        {/* Main Content */}
        <Box sx={{ px: 5, py: 4 }}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Paper sx={{ p: 3, borderRadius: 3, flex: 1 }}>
              <Typography fontWeight={700} color="#6B7280" fontSize={14}>
                OVERVIEW
              </Typography>
              <Typography variant="h6" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
                Sales Value
              </Typography>
              <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#6B7280",
                    color: "#fff",
                    fontWeight: 700,
                    boxShadow: "none",
                  }}
                >
                  Month
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    bgcolor: "#fff",
                    color: "#6B7280",
                    fontWeight: 700,
                    boxShadow: "none",
                    border: "2px solid #6B7280",
                  }}
                >
                  Week
                </Button>
              </Box>
              <ResponsiveContainer width="100%" height={160}>
                <LineChart data={salesData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6B7280"
                    strokeWidth={3}
                  />
                  <CartesianGrid stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
            <Paper sx={{ p: 3, borderRadius: 3, minWidth: 320 }}>
              <Typography fontWeight={700} color="#6B7280" fontSize={14}>
                PERFORMANCE
              </Typography>
              <Typography variant="h6" fontWeight={800} sx={{ mt: 1, mb: 2 }}>
                Total Orders
              </Typography>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={ordersData}>
                  <Bar dataKey="value" fill="#FF4151" barSize={22} />
                  <CartesianGrid stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        </Box>
    </>
  );
};

export default Dashboard;

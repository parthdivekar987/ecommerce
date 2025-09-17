import React from "react";
import { TrendingUp } from "@mui/icons-material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const salesData = [
  {
    stats: "245k",
    title: "Sales",
    color: "#ffc300",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "12.5k",
    title: "Customers",
    color: "#38b000",
    icon: <AccountBoxIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "1.54k",
    title: "Products",
    color: "#d00000",
    icon: <SmartphoneIcon sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "88k",
    title: "Revenue",
    color: "#4361ee",
    icon: <CurrencyRupeeIcon sx={{ fontSize: "1.75rem" }} />,
  },
];

const renderState = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          variant="rounded"
          sx={{
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "white",
            background: `${item.color}`,
          }}
        >
          {item.icon}
        </Avatar>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const MonthlyOverView = () => {
  return (
    <Card
      sx={{
        // --- THEME CHANGES ADDED HERE ---
        backgroundColor: '#242424', // Dark background
        color: 'white',             // White text
        // ---------------------------------
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: 10,
        },
      }}
    >
      <Box sx={{ px: 3, pt: 3, pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.7rem",
              mb: 0.5,
            }}
          >
            Monthly OverView
          </Typography>
          <IconButton size="small" sx={{ color: 'white' }}> {/* Ensure icon is also white */}
            <MoreVertIcon />
          </IconButton>
        </Box>

        {/* --- SUBTITLE COLOR ADJUSTED FOR DARK BACKGROUND --- */}
        <Typography variant="body2" sx={{ color: "#BDBDBD", fontWeight: 800 }}>
          <Box component="span" sx={{ fontWeight: 800, mr: 1 }}>
            total 48.5% growth
          </Box>
          😎This Month
        </Typography>
      </Box>

      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={5} sx={{ mt: 1 }}>
          {renderState()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverView;
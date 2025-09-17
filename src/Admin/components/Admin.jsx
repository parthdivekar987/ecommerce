import { useTheme } from "@mui/material/styles";
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import PersonIcon from "@mui/icons-material/Person";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AdminDashboard from "./AdminDashboard";
import CreateProductForm from "./CreateProductForm";
import ProductsTable from "./ProductsTable";
import OrdersTable from "./OrdersTable";
import CustomersTable from "./CustomersTable";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EmailIcon from "@mui/icons-material/Email";
import InboxIcon from "@mui/icons-material/Inbox";
import CategoryIcon from "@mui/icons-material/Category";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import CampaignIcon from "@mui/icons-material/Campaign";
import AddIcon from "@mui/icons-material/Add";


const menu = [
  { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
  { name: "Products", path: "/admin/products", icon: <CategoryIcon /> },
  { name: "Customers", path: "/admin/customers", icon: <PersonIcon /> },
  { name: "Orders", path: "/admin/orders", icon: <CampaignIcon /> },
  { name: "AddProduct", path: "/admin/product/create", icon: <AddIcon /> },
  //{name:"", path:"/admin"},
];

const Admin = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const navigate = useNavigate();

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // border:"1px solid blue",
        height: "100%",
      }}
    >
      <>
        {/* {isLargeScreen & <Toolbar />} */}
        <List>
          {menu.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => navigate(item.path)}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <div className="relative flex h-[100vh]">
        <CssBaseline />
        <div className="w-[15%] border border-r-gray-900 h-full fixed top-0">
          {drawer}
          </div>

        <div className="w-[85%] h-full ml-[17%] ">
          <Routes>
            <Route path="/" element={<AdminDashboard />}></Route>
            <Route path="/product/create" element={<CreateProductForm />}></Route>
            <Route path="/products" element={<ProductsTable />}></Route>
            <Route path="/orders" element={<OrdersTable />}></Route>
            <Route path="/customers" element={<CustomersTable />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin
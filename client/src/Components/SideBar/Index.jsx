import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    backgroundColor: "#1a1a2e",
    borderRight: "none",
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ selected }) => ({
  "&:hover": {
    backgroundColor: "#3a3a5e",
    color: "#ffffff",
  },
  backgroundColor: selected ? "#800000" : "transparent",
  color: selected ? "#ffffff" : "#b0b0b0",
}));

export default function SideBar() {
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const navigate = useNavigate();

  const handleNavigation = (index, path) => {
    setSelectedIndex(index);
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledDrawer variant="permanent" open={open}>
        <Divider />
        <List>
          {[
            {
              text: "Dashboard",
              icon: <DashboardIcon sx={{ color: "white" }} />,
              path: "/admin-dashboard",
            },
            {
              text: "Admin",
              icon: <PersonIcon sx={{ color: "white" }} />,
              path: "/admin-details",
            },
            {
              text: "Users",
              icon: <PeopleIcon sx={{ color: "white" }} />,
              path: "/users-details",
            },
            {
              text: "Posts",
              icon: <PostAddIcon sx={{ color: "white" }} />,
              path: "/posts-details",
            },
          ].map((item, index) => (
            <ListItem
              key={item.text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleNavigation(index, item.path)}
            >
              <StyledListItemButton selected={selectedIndex === index}>
                <ListItemIcon sx={{ minWidth: 0, justifyContent: "center" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ marginLeft: "10px" }} />
              </StyledListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => handleNavigation(4, "/login")}
          >
            <StyledListItemButton
              selected={selectedIndex === 4}
              sx={{
                marginTop: "450px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                }}
              >
                <LogoutIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ marginLeft: "10px" }} />
            </StyledListItemButton>
          </ListItem>
        </List>
      </StyledDrawer>
    </Box>
  );
}

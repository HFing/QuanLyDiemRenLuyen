import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  Menu as MenuIcon,
  EventAvailable as EventAvailableIcon,
  BarChart as BarChartIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

const Sidebar = ({ selectedItem, handleItemClick }) => {
  const [isOpen, setIsOpen] = useState(true);

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

  const drawerStyles = {
    width: isOpen ? 300 : 0,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: isOpen ? 250 : 0,
      boxSizing: "border-box",
      position: "sticky",
      top: 0,
      height: "calc(100vh - 65px)",
      color: colors.highlight4,
      backgroundColor: colors.quaternary,
      transition: "width 0.3s",
    },
  };

  const listItemStyles = {
    "&.Mui-selected": {
      backgroundColor: colors.primary,
      color: "#fff",
      "& .MuiListItemIcon-root": {
        color: "#fff",
      },
    },
    "&:hover": {
      backgroundColor: colors.highlight1,
      color: "#fff",
      "& .MuiListItemIcon-root": {
        color: "#fff",
      },
    },
  };

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="left"
        open={isOpen}
        sx={drawerStyles}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem
            button
            selected={selectedItem === "Bảng tin"}
            onClick={() => handleItemClick("Bảng tin")}
            sx={listItemStyles}
          >
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Bảng tin" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === "Đăng ký hoạt động ngoại khóa"}
            onClick={() => handleItemClick("Đăng ký hoạt động ngoại khóa")}
            sx={listItemStyles}
          >
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary="Đăng ký hoạt động" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === "Xem điểm rèn luyện"}
            onClick={() => handleItemClick("Xem điểm rèn luyện")}
            sx={listItemStyles}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Xem điểm rèn luyện" />
          </ListItem>
        </List>
      </Drawer>

      {!isOpen && (
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: "fixed",
            top: 76,
            left: 16,
            zIndex: 1300,
            backgroundColor: colors.background,
            boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <MenuIcon style={{ fontSize: "24px", color: colors.quaternary }} />
        </IconButton>
      )}
    </div>
  );
};

export default Sidebar;

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
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Apartment as ApartmentIcon,
  BarChart as BarChartIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  Class as ClassIcon,
  CalendarToday as CalendarTodayIcon,
  EventNote as EventNoteIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  LibraryBooks as LibraryBooksIcon,
  EventAvailable as EventAvailableIcon,
} from "@mui/icons-material";

const Sidebar = ({ selectedItem, handleItemClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  const userRole = localStorage.getItem("userRole");

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
      width: 300,
      boxSizing: "border-box",
      position: "sticky",
      top: 0,
      height: "calc(100vh - 65px)",
      color: colors.highlight4,
      backgroundColor: colors.quaternary,
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
        variant={isOpen ? "persistent" : "temporary"}
        anchor="left"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={drawerStyles}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <IconButton onClick={() => setIsOpen(!isOpen)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          {userRole === "CTSV" && (
            <ListItem
              button
              selected={selectedItem === "Quản lý trợ lý sinh viên"}
              onClick={() => handleItemClick("Quản lý trợ lý sinh viên")}
              sx={listItemStyles}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý trợ lý sinh viên" />
            </ListItem>
          )}
          <ListItem
            button
            selected={selectedItem === "Quản lý sinh viên"}
            onClick={() => handleItemClick("Quản lý sinh viên")}
            sx={listItemStyles}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý sinh viên" />
          </ListItem>
          {userRole === "CTSV" && (
            <ListItem
              button
              selected={selectedItem === "Quản lý khoa"}
              onClick={() => handleItemClick("Quản lý khoa")}
              sx={listItemStyles}
            >
              <ListItemIcon>
                <ApartmentIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý khoa" />
            </ListItem>
          )}
          <ListItem
            button
            selected={selectedItem === "Thống kê điểm rèn luyện"}
            onClick={() => handleItemClick("Thống kê điểm rèn luyện")}
            sx={listItemStyles}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Thống kê điểm rèn luyện" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === "Quản lý hoạt động"}
            onClick={() => handleItemClick("Quản lý hoạt động")}
            sx={listItemStyles}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý hoạt động" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === "Quản lý quy chế điểm"}
            onClick={() => handleItemClick("Quản lý quy chế điểm")}
            sx={listItemStyles}
          >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý quy chế điểm" />
          </ListItem>
          {userRole === "CTSV" && (
            <>
              <ListItem
                button
                selected={selectedItem === "Quản lý lớp"}
                onClick={() => handleItemClick("Quản lý lớp")}
                sx={listItemStyles}
              >
                <ListItemIcon>
                  <ClassIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý lớp" />
              </ListItem>

              <ListItem
                button
                selected={selectedItem === "Quản lý năm học"}
                onClick={() => handleItemClick("Quản lý năm học")}
                sx={listItemStyles}
              >
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý năm học" />
              </ListItem>
              <ListItem
                button
                selected={selectedItem === "Quản lý học kì"}
                onClick={() => handleItemClick("Quản lý học kì")}
                sx={listItemStyles}
              >
                <ListItemIcon>
                  <EventAvailableIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý học kì" />
              </ListItem>
              <ListItem
                button
                selected={selectedItem === "Quản lý học kì năm học"}
                onClick={() => handleItemClick("Quản lý học kì năm học")}
                sx={listItemStyles}
              >
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Quản lý học kì năm học" />
              </ListItem>
            </>
          )}
          <ListItem
            button
            selected={selectedItem === "Quản lý hoạt động sinh viên"}
            onClick={() => handleItemClick("Quản lý hoạt động sinh viên")}
            sx={listItemStyles}
          >
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý hoạt động sinh viên" />
          </ListItem>
          <ListItem
            button
            selected={selectedItem === "Quản lý bài viết"}
            onClick={() => handleItemClick("Quản lý bài viết")}
            sx={listItemStyles}
          >
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lý bài viết" />
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

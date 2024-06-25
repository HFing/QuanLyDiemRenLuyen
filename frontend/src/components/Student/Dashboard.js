import React, { useState } from "react";

import RegisterActivity from "./RegisterActivity";
import { Box, Container } from "@mui/material";
import Sidebar from "./Sidebar";
import DiemRenLuyen from "../CTSV/DiemRenLuyen";
import BangTinPage from "./BangTinPage";

const StudentDashboard = () => {
  const [selectedItem, setSelectedItem] = useState("Bảng tin");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderSelectedItem = () => {
    switch (selectedItem) {
      case "Bảng tin":
        return <BangTinPage />;
      case "Đăng ký hoạt động ngoại khóa":
        return <RegisterActivity />;
      case "Xem điểm rèn luyện":
        return <DiemRenLuyen />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", height: "calc(100vh - 65px)" }}>
      <Sidebar selectedItem={selectedItem} handleItemClick={handleItemClick} />
      <Box sx={{ flexGrow: 1, height: "100%", overflow: "auto" }}>
        <Container>{renderSelectedItem()}</Container>
      </Box>
    </Box>
  );
};

export default StudentDashboard;

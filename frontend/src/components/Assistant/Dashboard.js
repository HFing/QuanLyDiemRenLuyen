import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Sidebar from "../CTSV/Sidebar";
// import ManageTroLySinhVien from "../CTSV/ManageTroLySinhVien";
import ManageKhoa from "../CTSV/ManageKhoa";
import ManageQuyCheDiem from "../CTSV/ManageQuyCheDiem";
import ManageHoatDong from "../CTSV/ManageHoatDong";
import ManageHocKi from "../CTSV/ManageHocKi";
import ManageHocKiNamHoc from "../CTSV/ManageHocKiNamHoc";
import ManageLop from "../CTSV/ManageLop";
import ManageNamHoc from "../CTSV/ManageNamHoc";
import ManageSinhVien from "../CTSV/ManageSinhVien";
import SinhVienHoatDongManagement from "../CTSV/SinhVienHoatDongManagement";
import DiemRenLuyen from "../CTSV/DiemRenLuyen";
import ManagePosts from "../CTSV/ManagePosts";

const AssistantDashboard = () => {
  const [selectedItem, setSelectedItem] = useState("Quản lý sinh viên");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderSelectedItem = () => {
    switch (selectedItem) {
      // case "Quản lý trợ lý sinh viên":
      //   return <ManageTroLySinhVien />;
      case "Quản lý bài viết":
        return <ManagePosts />;
      case "Quản lý sinh viên":
        return <ManageSinhVien />;
      case "Quản lý khoa":
        return <ManageKhoa />;
      case "Thống kê điểm rèn luyện":
        return <DiemRenLuyen />;
      case "Quản lý hoạt động":
        return <ManageHoatDong />;
      case "Quản lý quy chế điểm":
        return <ManageQuyCheDiem />;
      case "Quản lý lớp":
        return <ManageLop />;
      case "Quản lý năm học":
        return <ManageNamHoc />;
      case "Quản lý học kì":
        return <ManageHocKi />;
      case "Quản lý học kì năm học":
        return <ManageHocKiNamHoc />;
      case "Quản lý hoạt động sinh viên":
        return <SinhVienHoatDongManagement />;
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

export default AssistantDashboard;

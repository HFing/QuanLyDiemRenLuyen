import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import Sidebar from "./Sidebar";
import ManageTroLySinhVien from "./ManageTroLySinhVien";
import ManageKhoa from "./ManageKhoa";
import ManageQuyCheDiem from "./ManageQuyCheDiem";
import ManageHoatDong from "./ManageHoatDong";
import ManageHocKi from "./ManageHocKi";
import ManageHocKiNamHoc from "./ManageHocKiNamHoc";
import ManageLop from "./ManageLop";
import ManageNamHoc from "./ManageNamHoc";
import ManageSinhVien from "./ManageSinhVien";
import SinhVienHoatDongManagement from "./SinhVienHoatDongManagement";
import DiemRenLuyen from "./DiemRenLuyen";
import ManagePosts from "./ManagePosts";

const CTSVDashboard = () => {
  const [selectedItem, setSelectedItem] = useState("Quản lý trợ lý sinh viên");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderSelectedItem = () => {
    switch (selectedItem) {
      case "Quản lý trợ lý sinh viên":
        return <ManageTroLySinhVien />;
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
      case "Quản lý bài viết":
        return <ManagePosts />;
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

export default CTSVDashboard;

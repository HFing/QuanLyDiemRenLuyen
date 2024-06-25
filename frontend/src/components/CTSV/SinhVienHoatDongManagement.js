import React, { useState, useEffect } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Pagination from "@mui/material/Pagination";
const primaryColor = "#3da58a";
const secondaryColor = "#1e5245";
const hoverColor = "#4cceac";
const textColor = "#0f2922";
const backgroundColor = "#dbf5ee";

const buttonStyle = {
  backgroundColor: primaryColor,
  color: "#fff",
  marginBottom: "10px",
  "&:hover": {
    backgroundColor: hoverColor,
  },
};

const tableHeaderStyle = {
  backgroundColor: secondaryColor,
  color: "#fff",
};

const hoverRowStyle = {
  "&:hover": {
    backgroundColor: hoverColor,
  },
};

const SinhVienHoatDongManagement = () => {
  const [sinhVienHoatDongList, setSinhVienHoatDongList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [sinhVienHoatDong, setSinhVienHoatDong] = useState({
    trangThai: true,
    hoatDong: { id: "" },
    sinhVien: { id: "" },
  });
  const [hoatDongList, setHoatDongList] = useState([]);
  const [sinhVienList, setSinhVienList] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  useEffect(() => {
    fetchSinhVienHoatDongList();
    fetchHoatDongList();
    fetchSinhVienList();
  }, []);

  const fetchSinhVienHoatDongList = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/sinh-vien-hoat-dong",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setSinhVienHoatDongList(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchHoatDongList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/hoat-dong", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHoatDongList(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchSinhVienList = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/sinh-vien", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSinhVienList(data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenEditDialog = (sinhVienHoatDong) => {
    setSinhVienHoatDong(sinhVienHoatDong);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAddSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/sinh-vien-hoat-dong",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sinhVienHoatDong),
        }
      );
      if (response.ok) {
        fetchSinhVienHoatDongList();
        handleCloseAddDialog();
      } else {
        console.error("Failed to add data");
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/sinh-vien-hoat-dong",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(sinhVienHoatDong),
        }
      );
      if (response.ok) {
        fetchSinhVienHoatDongList();
        handleCloseEditDialog();
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteSinhVienHoatDong = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/sinh-vien-hoat-dong/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        fetchSinhVienHoatDongList();
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // Pagination calculation
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sinhVienHoatDongList.slice(startIndex, endIndex);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản lý sinh viên tham gia hoạt động</h1>
      <Button
        variant="contained"
        style={buttonStyle}
        onClick={handleOpenAddDialog}
      >
        Thêm mới sinh viên hoạt động
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={tableHeaderStyle}>
              <TableCell>ID</TableCell>
              <TableCell>Hoạt động</TableCell>
              <TableCell>Sinh viên</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((sinhVienHoatDong, index) => (
              <TableRow key={sinhVienHoatDong.id} sx={{
                "&:hover": {
                  backgroundColor: "#2e7c67",
                },
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
              }}>
                <TableCell>{sinhVienHoatDong.id}</TableCell>
                <TableCell>{sinhVienHoatDong.hoatDong.ten}</TableCell>
                <TableCell>
                  {sinhVienHoatDong.sinhVien.nguoiDung.firstName +
                    " " +
                    sinhVienHoatDong.sinhVien.nguoiDung.lastName}
                </TableCell>
                <TableCell>
                  <Select
                    disabled
                    value={sinhVienHoatDong.trangThai}
                    onChange={(e) =>
                      setSinhVienHoatDong({
                        ...sinhVienHoatDong,
                        trangThai: e.target.value,
                      })
                    }
                  >
                    <MenuItem value={true}>Hoạt động</MenuItem>
                    <MenuItem value={false}>Không hoạt động</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditDialog(sinhVienHoatDong)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    onClick={() =>
                      handleDeleteSinhVienHoatDong(sinhVienHoatDong.id)
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(sinhVienHoatDongList.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa sinh viên hoạt động</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <Select
              value={sinhVienHoatDong.trangThai}
              onChange={(e) =>
                setSinhVienHoatDong({
                  ...sinhVienHoatDong,
                  trangThai: e.target.value,
                })
              }
            >
              <MenuItem value={true}>Hoạt động</MenuItem>
              <MenuItem value={false}>Không hoạt động</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <Select
              value={sinhVienHoatDong.hoatDong.id}
              onChange={(e) =>
                setSinhVienHoatDong({
                  ...sinhVienHoatDong,
                  hoatDong: { id: e.target.value },
                })
              }
            >
              {hoatDongList.map((hoatDong) => (
                <MenuItem key={hoatDong.id} value={hoatDong.id}>
                  {hoatDong.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <Select
              value={sinhVienHoatDong.sinhVien.id}
              onChange={(e) =>
                setSinhVienHoatDong({
                  ...sinhVienHoatDong,
                  sinhVien: { id: e.target.value },
                })
              }
            >
              {sinhVienList.map((sinhVien) => (
                <MenuItem key={sinhVien.id} value={sinhVien.id}>
                  {sinhVien.nguoiDung.firstName +
                    " " +
                    sinhVien.nguoiDung.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} style={{ color: primaryColor }}>
            Hủy
          </Button>
          <Button onClick={handleEditSubmit} style={{ color: primaryColor }}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm mới sinh viên hoạt động</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <Select
              value={sinhVienHoatDong.trangThai}
              onChange={(e) =>
                setSinhVienHoatDong({
                  ...sinhVienHoatDong,
                  trangThai: e.target.value,
                })
              }
            >
              <MenuItem value={true}>Hoạt động</MenuItem>
              <MenuItem value={false}>Không hoạt động</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <Select
              value={sinhVienHoatDong.hoatDong.id}
              onChange={(e) =>
                setSinhVienHoatDong({
                  ...sinhVienHoatDong,
                  hoatDong: { id: e.target.value },
                })
              }
            >
              {hoatDongList.map((hoatDong) => (
                <MenuItem key={hoatDong.id} value={hoatDong.id}>
                  {hoatDong.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <Select
              value={sinhVienHoatDong.sinhVien.id}
              onChange={(e) =>
                setSinhVienHoatDong({
                  ...sinhVienHoatDong,
                  sinhVien: { id: e.target.value },
                })
              }
            >
              {sinhVienList.map((sinhVien) => (
                <MenuItem key={sinhVien.id} value={sinhVien.id}>
                  {sinhVien.nguoiDung.firstName +
                    " " +
                    sinhVien.nguoiDung.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} style={{ color: primaryColor }}>
            Hủy
          </Button>
          <Button
            onClick={handleAddSubmit}
            style={{ color: primaryColor }}
            startIcon={<CloudUploadIcon />}
          >
            Thêm mới
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SinhVienHoatDongManagement;

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
  Paper,
} from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
const RegisterActivity = () => {
  const [sinhVienHoatDongList, setSinhVienHoatDongList] = useState([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const [sinhVienHoatDong, setSinhVienHoatDong] = useState({
    trangThai: true,
    hoatDong: { id: "" },
    sinhVien: user,
  });
  const [hoatDongList, setHoatDongList] = useState([]);

  // Fetch initial data
  useEffect(() => {
    fetchSinhVienHoatDongList();
    fetchHoatDongList();
  }, []);

  // Fetch sinh vien hoat dong list
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

  // Fetch hoat dong list
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

  // Handler for opening/closing add dialog
  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  // Handler for adding new sinh vien hoat dong
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
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // Pagination calculation
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sinhVienHoatDongList.slice(startIndex, endIndex);
  return (
    <div>
      <h1>Đăng ký hoạt động</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        sx={{ backgroundColor: "#3da58a", color: "#fff", "&:hover": { backgroundColor: "#4cceac" } }}
      >
        Đăng ký hoạt động ngoại khóa
      </Button>

      <TableContainer sx={{ marginTop: "1rem" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Tên hoạt động</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData
              .filter((svhd) => svhd.sinhVien.id === user.id)
              .map((svhd, index) => (
                <TableRow
                  key={svhd.id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#2e7c67",
                    },
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
                  }}
                >
                  <TableCell align="center">{svhd.hoatDong.ten}</TableCell>
                  <TableCell align="center">
                    <Select
                      value={true}
                      disabled
                      onChange={(e) =>
                        setSinhVienHoatDong({
                          ...sinhVienHoatDong,
                          trangThai: e.target.value,
                        })
                      }
                    >
                      <MenuItem value={true}>Hoạt động</MenuItem>
                    </Select>
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
      {/* Dialog for adding new sinh vien hoat dong */}
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Đăng ký hoạt động ngoại khóa mới</DialogTitle>

        <DialogContent>
          <FormControl fullWidth margin="dense">
            <Select
              value={sinhVienHoatDong.trangThai}
              disabled
              onChange={(e) =>
                setSinhVienHoatDong({
                  ...sinhVienHoatDong,
                  trangThai: e.target.value,
                })
              }
            >
              <MenuItem value={true}>Hoạt động</MenuItem>
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
              {hoatDongList
                .filter(
                  (hoatDong) =>
                    !sinhVienHoatDongList
                      .filter((svhd) => svhd.sinhVien.id === user.id)
                      .some((svhd) => svhd.hoatDong.id === hoatDong.id)
                )
                .map((hoatDong) => (
                  <MenuItem key={hoatDong.id} value={hoatDong.id}>
                    {hoatDong.ten}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Hủy
          </Button>
          <Button
            onClick={handleAddSubmit}
            color="primary"
            startIcon={<CloudUploadIcon />}
            sx={{ backgroundColor: "#3da58a", color: "#fff", "&:hover": { backgroundColor: "#4cceac" } }}
          >
            Đăng ký
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisterActivity;

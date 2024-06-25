import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from '@mui/icons-material/Delete';

const ManageHoatDong = () => {
  const [hoatDongList, setHoatDongList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedHoatDong, setSelectedHoatDong] = useState(null);
  const [ten, setTen] = useState("");
  const [moTa, setMoTa] = useState("");
  const [diem, setDiem] = useState("");
  const [dieuId, setDieuId] = useState("");
  const [hocKiNamHocId, setHocKiNamHocId] = useState("");
  const [khoaId, setKhoaId] = useState("");
  const [troLyId, setTroLyId] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [dieuOptions, setDieuOptions] = useState([]);
  const [hocKiNamHocOptions, setHocKiNamHocOptions] = useState([]);
  const [khoaOptions, setKhoaOptions] = useState([]);
  const [troLyOptions, setTroLyOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHoatDongList();
    fetchDieuOptions();
    fetchHocKiNamHocOptions();
    fetchKhoaOptions();
    fetchTroLyOptions();
  }, []);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const fetchHoatDongList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/hoat-dong",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHoatDongList(response.data.data);
    } catch (error) {
      console.error("Error fetching hoat dong:", error);
    }
  };

  const fetchDieuOptions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/dieu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDieuOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching dieu options:", error);
    }
  };

  const fetchHocKiNamHocOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/hoc-ki-nam-hoc",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHocKiNamHocOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching hoc ki nam hoc options:", error);
    }
  };

  const fetchKhoaOptions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/khoa", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKhoaOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching khoa options:", error);
    }
  };

  const fetchTroLyOptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/tro-ly-sinh-vien",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTroLyOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching tro ly options:", error);
    }
  };

  const handleOpenEditDialog = (hoatDong) => {
    setSelectedHoatDong(hoatDong);
    setEditDialogOpen(true);
    setTen(hoatDong.ten);
    setMoTa(hoatDong.moTa);
    setDiem(hoatDong.diem);
    setDieuId(hoatDong.dieu.id);
    setHocKiNamHocId(hoatDong.hocKiNamHoc.id);
    setKhoaId(hoatDong.khoa.id);
    setTroLyId(hoatDong.troLy.id);
    setStatus(hoatDong.status || "ACTIVE");
  };

  const handleCloseEditDialog = () => {
    setTen("");
    setMoTa("");
    setDiem("");
    setDieuId("");
    setHocKiNamHocId("");
    setKhoaId("");
    setTroLyId("");
    setStatus("ACTIVE");
    setEditDialogOpen(false);
    setSelectedHoatDong(null);
  };

  const handleEditSubmit = async () => {
    try {
      if (
        !ten ||
        !moTa ||
        !diem ||
        !dieuId ||
        !hocKiNamHocId ||
        !khoaId ||
        !troLyId
      ) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.put(
        `http://localhost:8080/api/hoat-dong`,
        {
          ...selectedHoatDong,
          ten,
          moTa,
          diem,
          dieu: { id: dieuId },
          hocKiNamHoc: { id: hocKiNamHocId },
          khoa: { id: khoaId },
          troLy: { id: troLyId },
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hoat dong updated");
      fetchHoatDongList();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating hoat dong:", error);
    }
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const handleAddSubmit = async () => {
    try {
      if (
        !ten ||
        !moTa ||
        !diem ||
        !dieuId ||
        !hocKiNamHocId ||
        !khoaId ||
        !troLyId
      ) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/hoat-dong",
        {
          ten,
          moTa,
          diem,
          dieu: { id: dieuId },
          hocKiNamHoc: { id: hocKiNamHocId },
          khoa: { id: khoaId },
          troLy: { id: troLyId },
          status: "ACTIVE",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hoat dong added");
      fetchHoatDongList();
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding hoat dong:", error);
    }
  };
  const handleDeleteHoatDong = async (hoatDongId) => {
    try {
      await axios.delete(`http://localhost:8080/api/hoat-dong/${hoatDongId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Hoat Dong deleted');
      fetchHoatDongList();
    } catch (error) {
      console.error('Error deleting hoat dong:', error);
    }
  };
  // const handleDeleteHoatDong = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/api/hoat-dong/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("Hoat dong deleted");
  //     fetchHoatDongList();
  //   } catch (error) {
  //     console.error("Error deleting hoat dong:", error);
  //   }
  // };
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = hoatDongList.slice(startIndex, endIndex);
  return (
    <div>
      <h1>Quản lý hoạt động</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        style={{
          marginBottom: "10px",
          backgroundColor: "#3da58a",
          color: "#ffffff",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#2e7c67";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#3da58a";
        }}
      >
        <AddIcon /> Thêm hoạt động
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Điểm</TableCell>
              <TableCell>Điều</TableCell>
              <TableCell>Học kì - Năm học</TableCell>
              <TableCell>Khoa</TableCell>
              <TableCell>Trợ lý</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((hoatDong, index) => (
              <TableRow key={hoatDong.id} sx={{
                "&:hover": {
                  backgroundColor: "#2e7c67",
                },
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
              }}>
                <TableCell>{hoatDong.id}</TableCell>
                <TableCell>{hoatDong.ten}</TableCell>
                <TableCell>{hoatDong.moTa}</TableCell>
                <TableCell>{hoatDong.diem}</TableCell>
                <TableCell>{hoatDong.dieu.dieu}</TableCell>
                <TableCell>
                  {hoatDong.hocKiNamHoc.hocKi.hocKi +
                    " - " +
                    hoatDong.hocKiNamHoc.namHoc.namHoc}
                </TableCell>
                <TableCell>{hoatDong.khoa.ten}</TableCell>
                <TableCell>
                  {hoatDong.troLy.nguoiDung.firstName +
                    " " +
                    hoatDong.troLy.nguoiDung.lastName}
                </TableCell>
                <TableCell>{hoatDong.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(hoatDong)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteHoatDong(hoatDong.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer><Pagination
        count={Math.ceil(hoatDongList.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />


      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa hoạt động</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên"
            fullWidth
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Mô tả"
            fullWidth
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Điểm"
            fullWidth
            value={diem}
            onChange={(e) => setDiem(e.target.value)}
          />
          <Select
            margin="dense"
            label="Điều"
            fullWidth
            value={dieuId}
            onChange={(e) => setDieuId(e.target.value)}
          >
            {dieuOptions.map((dieu) => (
              <MenuItem key={dieu.id} value={dieu.id}>
                {dieu.dieu}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Học kì năm học"
            fullWidth
            value={hocKiNamHocId}
            onChange={(e) => setHocKiNamHocId(e.target.value)}
          >
            {hocKiNamHocOptions.map((hocKiNamHoc) => (
              <MenuItem key={hocKiNamHoc.id} value={hocKiNamHoc.id}>
                {hocKiNamHoc.hocKi.hocKi + " - " + hocKiNamHoc.namHoc.namHoc}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Khoa"
            fullWidth
            value={khoaId}
            onChange={(e) => setKhoaId(e.target.value)}
          >
            {khoaOptions.map((khoa) => (
              <MenuItem key={khoa.id} value={khoa.id}>
                {khoa.ten}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Trợ lý"
            fullWidth
            value={troLyId}
            onChange={(e) => setTroLyId(e.target.value)}
          >
            {troLyOptions.map((troLy) => (
              <MenuItem key={troLy.id} value={troLy.id}>
                {troLy.nguoiDung.firstName + " " + troLy.nguoiDung.lastName}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Trạng thái"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm hoạt động</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên"
            fullWidth
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Mô tả"
            fullWidth
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Điểm"
            fullWidth
            value={diem}
            onChange={(e) => setDiem(e.target.value)}
          />
          <Select
            margin="dense"
            label="Điều"
            fullWidth
            value={dieuId}
            onChange={(e) => setDieuId(e.target.value)}
          >
            {dieuOptions.map((dieu) => (
              <MenuItem key={dieu.id} value={dieu.id}>
                {dieu.dieu}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Học kì năm học"
            fullWidth
            value={hocKiNamHocId}
            onChange={(e) => setHocKiNamHocId(e.target.value)}
          >
            {hocKiNamHocOptions.map((hocKiNamHoc) => (
              <MenuItem key={hocKiNamHoc.id} value={hocKiNamHoc.id}>
                {hocKiNamHoc.hocKi.hocKi + " " + hocKiNamHoc.namHoc.namHoc}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Khoa"
            fullWidth
            value={khoaId}
            onChange={(e) => setKhoaId(e.target.value)}
          >
            {khoaOptions.map((khoa) => (
              <MenuItem key={khoa.id} value={khoa.id}>
                {khoa.ten}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Trợ lý"
            fullWidth
            value={troLyId}
            onChange={(e) => setTroLyId(e.target.value)}
          >
            {troLyOptions.map((troLy) => (
              <MenuItem key={troLy.id} value={troLy.id}>
                {troLy.nguoiDung.firstName + " " + troLy.nguoiDung.lastName}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Trạng thái"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageHoatDong;

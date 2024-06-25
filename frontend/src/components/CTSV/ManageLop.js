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
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
const colors = {
  primary: "#3da58a",
  primaryDark: "#1e5245",
  primaryLight: "#2e7c67",
  secondary: "#0f2922",
  accent: "#4cceac",
  accentLight: "#70d8bd",
  background: "#94e2cd",
  backgroundLight: "#b7ebde",
  backgroundLighter: "#dbf5ee",
};

const buttonStyle = {
  backgroundColor: colors.primary,
  color: colors.backgroundLighter,
  marginBottom: "10px",
};

const buttonHoverStyle = {
  backgroundColor: colors.primaryDark,
  color: colors.backgroundLighter,
};

const ManageLop = () => {
  const [lopList, setLopList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedLop, setSelectedLop] = useState(null);
  const [tenLop, setTenLop] = useState("");
  const [khoaId, setKhoaId] = useState("");
  const [khoaOptions, setKhoaOptions] = useState([]);
  const [status, setStatus] = useState("ACTIVE");
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  useEffect(() => {
    fetchLopList();
    fetchKhoaList();
  }, []);

  const fetchLopList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/lop", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLopList(response.data.data);
    } catch (error) {
      console.error("Error fetching lop:", error);
    }
  };

  const fetchKhoaList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/khoa", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKhoaOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching khoa:", error);
    }
  };

  const handleOpenEditDialog = (lop) => {
    setSelectedLop(lop);
    setEditDialogOpen(true);
    setTenLop(lop.ten);
    setKhoaId(lop.khoa.id);
    setStatus(lop.status || "ACTIVE");
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedLop(null);
    setTenLop("");
    setKhoaId("");
    setStatus("ACTIVE");
  };

  const handleEditSubmit = async () => {
    try {
      if (!tenLop || !khoaId) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.put(
        `http://localhost:8080/api/lop`,
        {
          ...selectedLop,
          ten: tenLop,
          khoa: { id: khoaId },
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Lop updated");
      fetchLopList();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating lop:", error);
    }
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setTenLop("");
    setKhoaId("");
    setStatus("ACTIVE");
  };

  const handleAddSubmit = async () => {
    try {
      if (!tenLop || !khoaId) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/lop",
        {
          ten: tenLop,
          khoa: { id: khoaId },
          status: "ACTIVE",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Lop added");
      fetchLopList();
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding lop:", error);
    }
  };

  const handleDeleteLop = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/lop/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Lop deleted");
      fetchLopList();
    } catch (error) {
      console.error("Error deleting lop:", error);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // Pagination calculation
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = lopList.slice(startIndex, endIndex);
  return (
    <div>
      <h1>Quản lý lớp</h1>
      <Button
        variant="contained"
        style={buttonStyle}
        onClick={handleOpenAddDialog}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = colors.primaryDark)
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = colors.primary)
        }
      >
        <AddIcon /> Thêm lớp
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: colors.primaryLight }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên lớp</TableCell>
              <TableCell>Khoa ID</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((lop, index) => (
              <TableRow
                key={lop.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2e7c67",
                  },
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
                }}
              >
                <TableCell>{lop.id}</TableCell>
                <TableCell>{lop.ten}</TableCell>
                <TableCell>{lop.khoa.ten}</TableCell>
                <TableCell>{lop.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(lop)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteLop(lop.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>      <Pagination
        count={Math.ceil(lopList.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa lớp</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên lớp"
            value={tenLop}
            onChange={(e) => setTenLop(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Khoa ID</InputLabel>
            <Select value={khoaId} onChange={(e) => setKhoaId(e.target.value)}>
              {khoaOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Trạng thái</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm lớp mới</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên lớp"
            value={tenLop}
            onChange={(e) => setTenLop(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Khoa ID</InputLabel>
            <Select value={khoaId} onChange={(e) => setKhoaId(e.target.value)}>
              {khoaOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Trạng thái</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageLop;

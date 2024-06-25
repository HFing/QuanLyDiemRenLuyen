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

const ManageQuyCheDiem = () => {
  const [quyCheList, setQuyCheList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedQuyChe, setSelectedQuyChe] = useState(null);
  const [dieu, setDieu] = useState("");
  const [diemToiDa, setDiemToiDa] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchQuyCheList();
  }, []);

  const fetchQuyCheList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/dieu", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQuyCheList(response.data.data);
    } catch (error) {
      console.error("Error fetching quy che diem:", error);
    }
  };

  const handleOpenEditDialog = (quyChe) => {
    setSelectedQuyChe(quyChe);
    setEditDialogOpen(true);
    setDieu(quyChe.dieu);
    setDiemToiDa(quyChe.diemToiDa);
    setStatus(quyChe.status || "ACTIVE");
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedQuyChe(null);
    setDieu("");
    setDiemToiDa("");
    setStatus("ACTIVE");
  };

  const handleEditSubmit = async () => {
    try {
      if (!dieu || !diemToiDa) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.put(
        `http://localhost:8080/api/dieu`,
        { ...selectedQuyChe, dieu, diemToiDa, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Quy che diem updated");
      fetchQuyCheList();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating quy che diem:", error);
    }
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setDieu("");
    setDiemToiDa("");
    setStatus("ACTIVE");
  };

  const handleAddSubmit = async () => {
    try {
      if (!dieu || !diemToiDa) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/dieu",
        {
          dieu,
          diemToiDa,
          status: "ACTIVE",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Quy che diem added");
      fetchQuyCheList();
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding quy che diem:", error);
    }
  };
  const handleDeleteQuyChe = async (quyCheId) => {
    try {
      await axios.delete(`http://localhost:8080/api/dieu/${quyCheId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Hoc ki deleted');
      fetchQuyCheList();
    } catch (error) {
      console.error('Error deleting hoc ki:', error);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // Pagination calculation
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = quyCheList.slice(startIndex, endIndex);
  return (
    <div>
      <h1>Quản lý quy chế điểm</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddDialog}
        sx={{
          marginBottom: "10px",
          backgroundColor: "#3da58a",
          "&:hover": {
            backgroundColor: "#2e7c67",
          },
        }}
      >
        <AddIcon /> Thêm quy chế điểm
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#b7ebde" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Điều</TableCell>
              <TableCell>Điểm tối đa</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((quyChe, index) => (
              <TableRow
                key={quyChe.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2e7c67",
                  },
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
                }}
              >
                <TableCell>{quyChe.id}</TableCell>
                <TableCell>{quyChe.dieu}</TableCell>
                <TableCell>{quyChe.diemToiDa}</TableCell>
                <TableCell>{quyChe.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(quyChe)}>
                    <EditIcon sx={{ color: "#1e5245" }} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteQuyChe(quyChe.id)}>
                    <DeleteIcon sx={{ color: "#1e5245" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  <Pagination
        count={Math.ceil(quyCheList.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Sửa quy chế điểm</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Điều"
            type="text"
            fullWidth
            value={dieu}
            onChange={(e) => setDieu(e.target.value)}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            margin="dense"
            label="Điểm tối đa"
            type="number"
            fullWidth
            value={diemToiDa}
            onChange={(e) => setDiemToiDa(e.target.value)}
            sx={{ marginBottom: "10px" }}
          />
          <Select
            margin="dense"
            label="Trạng thái"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            sx={{ marginBottom: "10px" }}
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} sx={{ color: "#1e5245" }}>
            Hủy bỏ
          </Button>
          <Button onClick={handleEditSubmit} sx={{ color: "#3da58a" }}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm quy chế điểm mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Điều"
            type="text"
            fullWidth
            value={dieu}
            onChange={(e) => setDieu(e.target.value)}
            sx={{ marginBottom: "10px" }}
          />
          <TextField
            margin="dense"
            label="Điểm tối đa"
            type="number"
            fullWidth
            value={diemToiDa}
            onChange={(e) => setDiemToiDa(e.target.value)}
            sx={{ marginBottom: "10px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} sx={{ color: "#1e5245" }}>
            Hủy bỏ
          </Button>
          <Button onClick={handleAddSubmit} sx={{ color: "#3da58a" }}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageQuyCheDiem;

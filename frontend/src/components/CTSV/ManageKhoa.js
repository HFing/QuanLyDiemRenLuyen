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
import { styled } from "@mui/system";
import { createKhoa, getAllKhoa, updateKhoa } from "../../services/authService";
import Pagination from "@mui/material/Pagination";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

// Define color palette
const colors = {
  primary: "#3da58a",
  primaryDark: "#1e5245",
  primaryLight: "#2e7c67",
  dark: "#0f2922",
  accent1: "#4cceac",
  accent2: "#70d8bd",
  accent3: "#94e2cd",
  accent4: "#b7ebde",
  accent5: "#dbf5ee",
};

// Styled components
const StyledButton = styled(Button)({
  backgroundColor: colors.primary,
  color: "#ffffff",
  "&:hover": {
    backgroundColor: colors.primaryDark,
  },
  marginBottom: 8,
});

const StyledIconButton = styled(IconButton)({
  color: colors.primary,
  "&:hover": {
    color: colors.primaryDark,
  },
});

const ManageKhoa = () => {
  const [khoaList, setKhoaList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedKhoa, setSelectedKhoa] = useState(null);
  const [ten, setTen] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchKhoaList();
  }, [page]); // Trigger fetchKhoaList when page changes

  const fetchKhoaList = async () => {
    try {
      const data = (await getAllKhoa(token)).data;
      setKhoaList(data);
    } catch (error) {
      console.error("Error fetching khoa:", error);
    }
  };

  const handleOpenEditDialog = (khoa) => {
    setEditDialogOpen(true);
    setSelectedKhoa(khoa);
    setTen(khoa.ten);
    setStatus(khoa.status);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedKhoa(null);
    setTen("");
    setStatus("ACTIVE");
  };

  const handleEditSubmit = async () => {
    try {
      await updateKhoa(token, { ...selectedKhoa, ten, status });
      console.log("Khoa updated");
      fetchKhoaList();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating khoa:", error);
    }
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setTen("");
  };

  const handleAddSubmit = async () => {
    try {
      await createKhoa(token, ten, status); // Ensure status is provided or use default
      console.log("Khoa added");
      fetchKhoaList();
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding khoa:", error);
    }
  };
  const handleDeleteKHoa = async (khoaId) => {
    try {
      await axios.delete(`http://localhost:8080/api/khoa/${khoaId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Khoa deleted');
      fetchKhoaList();
    } catch (error) {
      console.error('Error deleting khoa:', error);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // Pagination calculation
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = khoaList.slice(startIndex, endIndex);
  return (
    <div>
      <h1>Quản lý Khoa</h1>
      <StyledButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenAddDialog}
      >
        Thêm khoa
      </StyledButton>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên khoa</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((khoa, index) => (
              <TableRow key={khoa.id} sx={{
                "&:hover": {
                  backgroundColor: "#2e7c67",
                },
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
              }}>
                <TableCell>{khoa.id}</TableCell>
                <TableCell>{khoa.ten}</TableCell>
                <TableCell>{khoa.status}</TableCell>
                <TableCell>
                  <StyledIconButton onClick={() => handleOpenEditDialog(khoa)}>
                    <EditIcon />
                  </StyledIconButton>
                  <StyledIconButton onClick={() => handleDeleteKHoa(khoa.id)}>
                    <DeleteIcon />
                  </StyledIconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(khoaList.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Sửa thông tin khoa</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên khoa"
            type="text"
            fullWidth
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
          <Select
            margin="dense"
            label="Trạng thái"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
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
        <DialogTitle>Thêm khoa mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên khoa"
            type="text"
            fullWidth
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
          <Select
            margin="dense"
            label="Trạng thái"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
          >
            <MenuItem value="ACTIVE">ACTIVE</MenuItem>
            <MenuItem value="INACTIVE">INACTIVE</MenuItem>
          </Select>
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

export default ManageKhoa;

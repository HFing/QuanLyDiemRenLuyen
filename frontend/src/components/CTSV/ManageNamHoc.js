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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
const colors = {
  primary: "#3da58a",
  secondary: "#1e5245",
  hover: "#2e7c67",
  dark: "#0f2922",
  light: "#4cceac",
  lighter: "#70d8bd",
  lightest: "#94e2cd",
  background: "#b7ebde",
  border: "#dbf5ee",
};

const ManageNamHoc = () => {
  const [namHocList, setNamHocList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedNamHoc, setSelectedNamHoc] = useState(null);
  const [namHoc, setNamHoc] = useState("");
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  useEffect(() => {
    fetchNamHocList();
  }, []);

  const fetchNamHocList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/nam-hoc", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNamHocList(response.data.data);
    } catch (error) {
      console.error("Error fetching nam hoc:", error);
    }
  };

  const handleOpenEditDialog = (namHoc) => {
    setSelectedNamHoc(namHoc);
    setEditDialogOpen(true);
    setNamHoc(namHoc.namHoc);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedNamHoc(null);
    setNamHoc("");
  };

  const handleEditSubmit = async () => {
    try {
      if (!namHoc) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.put(
        `http://localhost:8080/api/nam-hoc`,
        {
          ...selectedNamHoc,
          namHoc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Nam hoc updated");
      fetchNamHocList();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating nam hoc:", error);
    }
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setNamHoc("");
  };

  const handleAddSubmit = async () => {
    try {
      if (!namHoc) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/nam-hoc",
        {
          namHoc,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Nam hoc added");
      fetchNamHocList();
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding nam hoc:", error);
    }
  };

  const handleDeleteNamHoc = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/nam-hoc/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Nam hoc deleted");
      fetchNamHocList();
    } catch (error) {
      console.error("Error deleting nam hoc:", error);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // Pagination calculation
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = namHocList.slice(startIndex, endIndex);
  return (
    <div>
      <h1>Quản lý năm học</h1>
      <Button
        variant="contained"
        onClick={handleOpenAddDialog}
        style={{ marginBottom: "10px", backgroundColor: colors.primary, color: "#fff" }}
      >
        <AddIcon /> Thêm năm học
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: colors.light }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Năm học</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((namHoc, index) => (
              <TableRow
                key={namHoc.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2e7c67",
                  },
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
                }}
              >
                <TableCell>{namHoc.id}</TableCell>
                <TableCell>{namHoc.namHoc}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(namHoc)} style={{ color: colors.secondary }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteNamHoc(namHoc.id)} style={{ color: colors.secondary }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(namHocList.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa năm học</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Năm học"
            value={namHoc}
            onChange={(e) => setNamHoc(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} style={{ color: colors.primary }}>
            Hủy bỏ
          </Button>
          <Button onClick={handleEditSubmit} style={{ color: colors.primary }}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm năm học mới</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Năm học"
            value={namHoc}
            onChange={(e) => setNamHoc(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} style={{ color: colors.primary }}>
            Hủy bỏ
          </Button>
          <Button onClick={handleAddSubmit} style={{ color: colors.primary }}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageNamHoc;

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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
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

const ManageHocKiNamHoc = () => {
  const [hocKiNamHocList, setHocKiNamHocList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedHocKiNamHoc, setSelectedHocKiNamHoc] = useState(null);
  const [hocKiId, setHocKiId] = useState("");
  const [namHocId, setNamHocId] = useState("");
  const [hocKiOptions, setHocKiOptions] = useState([]);
  const [namHocOptions, setNamHocOptions] = useState([]);
  const [status, setStatus] = useState("ACTIVE");
  const token = localStorage.getItem("token");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  useEffect(() => {
    fetchHocKiNamHocList();
    fetchHocKiList();
    fetchNamHocList();
  }, []);

  const fetchHocKiList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hoc-ki", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHocKiOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching hoc ki nam hoc:", error);
    }
  };

  const fetchNamHocList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/nam-hoc", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNamHocOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching hoc ki nam hoc:", error);
    }
  };

  const fetchHocKiNamHocList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/hoc-ki-nam-hoc",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHocKiNamHocList(response.data.data);
    } catch (error) {
      console.error("Error fetching hoc ki nam hoc:", error);
    }
  };

  const handleOpenEditDialog = (hocKiNamHoc) => {
    setSelectedHocKiNamHoc(hocKiNamHoc);
    setEditDialogOpen(true);
    setHocKiId(hocKiNamHoc.hocKi.id);
    setNamHocId(hocKiNamHoc.namHoc.id);
    setStatus(hocKiNamHoc.status || "ACTIVE");
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedHocKiNamHoc(null);
    setHocKiId("");
    setNamHocId("");
    setStatus("ACTIVE");
  };

  const handleEditSubmit = async () => {
    try {
      if (!hocKiId || !namHocId) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.put(
        `http://localhost:8080/api/hoc-ki-nam-hoc`,
        {
          ...selectedHocKiNamHoc,
          hocKi: { id: hocKiId },
          namHoc: { id: namHocId },
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hoc ki nam hoc updated");
      fetchHocKiNamHocList();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating hoc ki nam hoc:", error);
    }
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setHocKiId("");
    setNamHocId("");
    setStatus("ACTIVE");
  };

  const handleAddSubmit = async () => {
    try {
      if (!hocKiId || !namHocId) {
        console.error("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      await axios.post(
        "http://localhost:8080/api/hoc-ki-nam-hoc",
        {
          hocKi: { id: hocKiId },
          namHoc: { id: namHocId },
          status: "ACTIVE",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Hoc ki nam hoc added");
      fetchHocKiNamHocList();
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding hoc ki nam hoc:", error);
    }
  };

  const handleDeleteHocKiNamHoc = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/hoc-ki-nam-hoc/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Hoc ki nam hoc deleted");
      fetchHocKiNamHocList();
    } catch (error) {
      console.error("Error deleting hoc ki nam hoc:", error);
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // Pagination calculation
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = hocKiNamHocList.slice(startIndex, endIndex);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Quản lý học kì năm học</h1>
      <Button
        variant="contained"
        style={buttonStyle}
        onClick={handleOpenAddDialog}
      >
        <AddIcon /> Thêm học kì năm học
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{ backgroundColor: primaryColor, color: textColor }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Học kì ID</TableCell>
              <TableCell>Năm học ID</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((hocKiNamHoc, index) => (
              <TableRow key={hocKiNamHoc.id} sx={{
                "&:hover": {
                  backgroundColor: "#2e7c67",
                },
                backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
              }}>
                <TableCell>{hocKiNamHoc.id}</TableCell>
                <TableCell>{hocKiNamHoc.hocKi.hocKi}</TableCell>
                <TableCell>{hocKiNamHoc.namHoc.namHoc}</TableCell>
                <TableCell>{hocKiNamHoc.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(hocKiNamHoc)}>
                    <EditIcon style={{ color: secondaryColor }} />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteHocKiNamHoc(hocKiNamHoc.id)}
                  >
                    <DeleteIcon style={{ color: secondaryColor }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(hocKiNamHocList.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa học kì năm học</DialogTitle>
        <DialogContent>
          <Select
            margin="dense"
            label="Học kì ID"
            value={hocKiId}
            onChange={(e) => setHocKiId(e.target.value)}
            fullWidth
          >
            {hocKiOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.hocKi}
              </MenuItem>
            ))}
          </Select>
          <Select
            margin="dense"
            label="Năm học ID"
            value={namHocId}
            onChange={(e) => setNamHocId(e.target.value)}
            fullWidth
          >
            {namHocOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.namHoc}
              </MenuItem>
            ))}
          </Select>
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
        <DialogTitle>Thêm học kì năm học mới</DialogTitle>
        <DialogContent>
          <Select
            margin="dense"
            label="Học kì ID"
            value={hocKiId}
            onChange={(e) => setHocKiId(e.target.value)}
            fullWidth
          >
            {hocKiOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.hocKi}
              </MenuItem>
            ))}
          </Select>

          <Select
            margin="dense"
            label="Năm học ID"
            value={namHocId}
            onChange={(e) => setNamHocId(e.target.value)}
            fullWidth
          >
            {namHocOptions.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.namHoc}
              </MenuItem>
            ))}
          </Select>
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

export default ManageHocKiNamHoc;

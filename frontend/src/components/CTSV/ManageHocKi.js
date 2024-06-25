import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
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

const ManageHocKi = () => {
  const [hocKiList, setHocKiList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedHocKi, setSelectedHocKi] = useState(null);
  const [hocKi, setHocKi] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const token = localStorage.getItem('token');
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  useEffect(() => {
    fetchHocKiList();
  }, []);

  const fetchHocKiList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/hoc-ki', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHocKiList(response.data.data);
    } catch (error) {
      console.error('Error fetching hoc ki:', error);
    }
  };

  const handleOpenEditDialog = (hocKi) => {
    setSelectedHocKi(hocKi);
    setEditDialogOpen(true);
    setHocKi(hocKi.hocKi);
    setStatus(hocKi.status || 'ACTIVE');
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedHocKi(null);
    setHocKi('');
    setStatus('ACTIVE');
  };

  const handleEditSubmit = async () => {
    try {
      if (!hocKi) {
        console.error('Vui lòng điền đầy đủ thông tin.');
        return;
      }

      await axios.put(
        `http://localhost:8080/api/hoc-ki`,
        {
          ...selectedHocKi,
          hocKi,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Hoc ki updated');
      fetchHocKiList();
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating hoc ki:', error);
    }
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setHocKi('');
    setStatus('ACTIVE');
  };

  const handleAddSubmit = async () => {
    try {
      if (!hocKi) {
        console.error('Vui lòng điền đầy đủ thông tin.');
        return;
      }

      await axios.post(
        'http://localhost:8080/api/hoc-ki',
        {
          hocKi,
          status: 'ACTIVE',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Hoc ki added');
      fetchHocKiList();
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding hoc ki:', error);
    }
  };
  const handleDeleteHocKi = async (hocKiId) => {
    try {
      await axios.delete(`http://localhost:8080/api/hoc-ki/${hocKiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Hoc ki deleted');
      fetchHocKiList();
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
  const paginatedData = hocKiList.slice(startIndex, endIndex);
  return (
    <div>
      <h1>Quản lý học kì</h1>
      <Button
        variant="contained"
        onClick={handleOpenAddDialog}
        style={{ marginBottom: '10px', backgroundColor: colors.primary, color: '#fff' }}
      >
        <AddIcon /> Thêm học kì
      </Button>

      <TableContainer component={Paper} style={{ border: `1px solid ${colors.border}` }}>
        <Table>
          <TableHead style={{ backgroundColor: colors.light }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tên học kì</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((hocKi, index) => (
              <TableRow
                key={hocKi.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2e7c67",
                  },
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
                }}
              >
                <TableCell>{hocKi.id}</TableCell>
                <TableCell>{hocKi.hocKi}</TableCell>
                <TableCell>{hocKi.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(hocKi)} style={{ color: colors.secondary }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteHocKi(hocKi.id)} style={{ color: colors.secondary }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(hocKiList.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa học kì</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tên học kì"
            type="text"
            fullWidth
            value={hocKi}
            onChange={(e) => setHocKi(e.target.value)}
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
          <Button onClick={handleCloseEditDialog} style={{ color: colors.primary }}>
            Hủy bỏ
          </Button>
          <Button onClick={handleEditSubmit} style={{ color: colors.primary }}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm học kì mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên học kì"
            type="text"
            fullWidth
            value={hocKi}
            onChange={(e) => setHocKi(e.target.value)}
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

export default ManageHocKi;

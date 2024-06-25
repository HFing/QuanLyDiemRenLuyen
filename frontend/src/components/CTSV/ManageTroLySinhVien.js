import React, { useState, useEffect } from "react";
import axios from "axios";
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
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Avatar,
  IconButton,
  Paper,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";

const ManageTroLySinhVien = () => {
  const [troLySinhVienList, setTroLySinhVienList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [khoaList, setKhoaList] = useState([]);
  const [troLySinhVien, setTroLySinhVien] = useState({
    khoa: { id: "" },
    nguoiDung: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      role: "TLSV",
      avatar: "avt_default",
      status: "ACTIVE",
    },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTroLySinhVienList();
    fetchKhoaList();
  }, []);

  const fetchTroLySinhVienList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/tro-ly-sinh-vien",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setTroLySinhVienList(response.data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchKhoaList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/khoa", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setKhoaList(response.data.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenEditDialog = (troLySinhVien) => {
    setTroLySinhVien(troLySinhVien);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setTroLySinhVien({
      khoa: { id: "" },
      nguoiDung: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        role: "TLSV",
        avatar: "avt_default",
        status: "ACTIVE",
      },
    });
    setEditDialogOpen(false);
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setTroLySinhVien({
      khoa: { id: "" },
      nguoiDung: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        role: "TLSV",
        avatar: "avt_default",
        status: "ACTIVE",
      },
    });
    setAddDialogOpen(false);
  };

  const handleAddSubmit = async () => {
    try {
      let avatarUrl = troLySinhVien.nguoiDung.avatar;
      if (selectedFile) {
        avatarUrl = await uploadAvatar(selectedFile);
      }

      const troLySinhVienData = {
        ...troLySinhVien,
        nguoiDung: {
          ...troLySinhVien.nguoiDung,
          avatar: avatarUrl,
        },
      };
      const response = await axios.post(
        "http://localhost:8080/api/tro-ly-sinh-vien",
        troLySinhVienData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        fetchTroLySinhVienList();
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
      let avatarUrl = troLySinhVien.nguoiDung.avatar;
      if (selectedFile) {
        avatarUrl = await uploadAvatar(selectedFile);
      }

      const troLySinhVienData = {
        ...troLySinhVien,
        nguoiDung: {
          ...troLySinhVien.nguoiDung,
          avatar: avatarUrl,
        },
      };

      const response = await axios.put(
        `http://localhost:8080/api/tro-ly-sinh-vien`,
        troLySinhVienData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        fetchTroLySinhVienList();
        handleCloseEditDialog();
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleDeleteTroLySinhVien = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/tro-ly-sinh-vien/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        fetchTroLySinhVienList();
      } else {
        console.error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:8080/api/files",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error("Error uploading avatar:", error);
      return null;
    }
  };

  const renderDialogContent = () => (
    <>
      <TextField
        fullWidth
        label="Họ"
        value={troLySinhVien.nguoiDung.firstName}
        onChange={(e) =>
          setTroLySinhVien({
            ...troLySinhVien,
            nguoiDung: {
              ...troLySinhVien.nguoiDung,
              firstName: e.target.value,
            },
          })
        }
        margin="dense"
      />
      <TextField
        fullWidth
        label="Tên"
        value={troLySinhVien.nguoiDung.lastName}
        onChange={(e) =>
          setTroLySinhVien({
            ...troLySinhVien,
            nguoiDung: {
              ...troLySinhVien.nguoiDung,
              lastName: e.target.value,
            },
          })
        }
        margin="dense"
      />
      <TextField
        fullWidth
        label="Email"
        value={troLySinhVien.nguoiDung.email}
        onChange={(e) =>
          setTroLySinhVien({
            ...troLySinhVien,
            nguoiDung: {
              ...troLySinhVien.nguoiDung,
              email: e.target.value,
            },
          })
        }
        margin="dense"
      />
      <TextField
        fullWidth
        label="Địa chỉ"
        value={troLySinhVien.nguoiDung.address}
        onChange={(e) =>
          setTroLySinhVien({
            ...troLySinhVien,
            nguoiDung: {
              ...troLySinhVien.nguoiDung,
              address: e.target.value,
            },
          })
        }
        margin="dense"
      />
      <TextField
        fullWidth
        label="Số điện thoại"
        value={troLySinhVien.nguoiDung.phoneNumber}
        onChange={(e) =>
          setTroLySinhVien({
            ...troLySinhVien,
            nguoiDung: {
              ...troLySinhVien.nguoiDung,
              phoneNumber: e.target.value,
            },
          })
        }
        margin="dense"
      />
      <FormControl fullWidth margin="dense">
        <InputLabel>Khoa</InputLabel>
        <Select
          value={troLySinhVien.khoa.id}
          onChange={(e) =>
            setTroLySinhVien({
              ...troLySinhVien,
              khoa: { id: e.target.value },
            })
          }
        >
          {khoaList.map((khoa) => (
            <MenuItem key={khoa.id} value={khoa.id}>
              {khoa.ten}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <input type="file" onChange={handleFileChange} />
    </>
  );

  // Calculate start and end index for pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = troLySinhVienList.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Quản lý Trợ lý sinh viên</h1>
      <Button
        variant="contained"
        color="primary"
        sx={{ bgcolor: "#3da58a", "&:hover": { bgcolor: "#1e5245" } }}
        onClick={handleOpenAddDialog}
        startIcon={<AddIcon />}
      >
        Thêm Trợ lý sinh viên
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Họ</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Địa chỉ</TableCell>
              <TableCell align="center">Số điện thoại</TableCell>
              <TableCell align="center">Khoa</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell align="center">Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((troLySinhVien, index) => (
              <TableRow key={troLySinhVien.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2e7c67",
                  },
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
                }}>
                <TableCell align="center">
                  {troLySinhVien.nguoiDung.firstName}
                </TableCell>
                <TableCell align="center">
                  {troLySinhVien.nguoiDung.lastName}
                </TableCell>
                <TableCell align="center">
                  {troLySinhVien.nguoiDung.email}
                </TableCell>
                <TableCell align="center">
                  {troLySinhVien.nguoiDung.address}
                </TableCell>
                <TableCell align="center">
                  {troLySinhVien.nguoiDung.phoneNumber}
                </TableCell>
                <TableCell align="center">{troLySinhVien.khoa.ten}</TableCell>
                <TableCell>
                  <Avatar
                    alt={troLySinhVien.nguoiDung.lastName}
                    src={troLySinhVien.nguoiDung.avatar}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenEditDialog(troLySinhVien)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTroLySinhVien(troLySinhVien.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(troLySinhVienList.length / itemsPerPage)}
        page={page}
        onChange={(event, value) => setPage(value)}
        color="primary"
        sx={{ marginTop: "20px", alignSelf: "center" }}
      />

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa Trợ lý sinh viên</DialogTitle>
        <DialogContent>{renderDialogContent()}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary" startIcon={<CancelIcon />}>
            Hủy
          </Button>
          <Button onClick={handleEditSubmit} color="primary" startIcon={<SaveIcon />}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm Trợ lý sinh viên</DialogTitle>
        <DialogContent>{renderDialogContent()}</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} color="primary" startIcon={<CancelIcon />}>
            Hủy
          </Button>
          <Button onClick={handleAddSubmit} color="primary" startIcon={<SaveIcon />}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageTroLySinhVien;

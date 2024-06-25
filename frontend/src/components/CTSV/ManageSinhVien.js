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
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { styled } from "@mui/system";

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
  color: '#ffffff',
  '&:hover': {
    backgroundColor: colors.primaryDark,
  },
  marginBottom: 8,
});

const StyledIconButton = styled(IconButton)({
  color: colors.primary,
  '&:hover': {
    color: colors.primaryDark,
  },
});

const StyledTableRow = styled(TableRow)({
  '&:hover': {
    backgroundColor: colors.accent5,
  },
});

const ManageSinhVien = () => {
  const [sinhVienList, setSinhVienList] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedSinhVien, setSelectedSinhVien] = useState(null);
  const [sinhVien, setSinhVien] = useState({
    lop: { id: "" },
    namHoc: { id: "" },
    nguoiDung: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      role: "SV",
      avatar: "avt_default",
      status: "ACTIVE",
    },
    avatarFile: null,
    status: "ACTIVE",
  });
  const [lopList, setLopList] = useState([]);
  const [namHocList, setNamHocList] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const itemsPerPage = 5; // Number of items per page
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSinhVienList();
    fetchLopList();
    fetchNamHocList();
  }, []);

  const fetchSinhVienList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/sinh-vien",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSinhVienList(response.data.data);
    } catch (error) {
      console.error("Error fetching sinh vien:", error);
    }
  };

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

  const handleOpenEditDialog = (sinhVien) => {
    setSelectedSinhVien(sinhVien);
    setEditDialogOpen(true);
    setSinhVien({
      ...sinhVien,
      lop: { id: sinhVien.lop.id },
      namHoc: { id: sinhVien.namHoc.id },
      nguoiDung: {
        ...sinhVien.nguoiDung,
      },
      avatarFile: null, // clear previous avatar file selection
      status: sinhVien.status,
    });
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedSinhVien(null);
    setSinhVien({
      lop: { id: "" },
      namHoc: { id: "" },
      nguoiDung: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        role: "SV",
        avatar: "avt_default",
        status: "ACTIVE",
      },
      avatarFile: null,
      status: "ACTIVE",
    });
  };

  const handleEditSubmit = async () => {
    try {
      const formData = new FormData();
      if (sinhVien.avatarFile) {
        formData.append("file", sinhVien.avatarFile);

        // Upload avatar first
        const avatarResponse = await axios.post(
          "http://localhost:8080/api/files",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const avatarUrl = avatarResponse.data.data;

        // Then update sinh vien data
        await axios.put(
          `http://localhost:8080/api/sinh-vien`,
          {
            ...selectedSinhVien,
            lop: { id: sinhVien.lop.id },
            namHoc: { id: sinhVien.namHoc.id },
            nguoiDung: {
              ...sinhVien.nguoiDung,
              avatar: avatarUrl,
            },
            status: sinhVien.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // No avatar file change, update without uploading avatar
        await axios.put(
          `http://localhost:8080/api/sinh-vien`,
          {
            ...selectedSinhVien,
            lop: { id: sinhVien.lop.id },
            namHoc: { id: sinhVien.namHoc.id },
            nguoiDung: {
              ...sinhVien.nguoiDung,
            },
            status: sinhVien.status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log("Sinh vien updated");
      fetchSinhVienList();
      handleCloseEditDialog();
    } catch (error) {
      console.error("Error updating sinh vien:", error);
    }
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setSinhVien({
      lop: { id: "" },
      namHoc: { id: "" },
      nguoiDung: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        role: "SV",
        avatar: "avt_default",
        status: "ACTIVE",
      },
      avatarFile: null,
    });
  };

  const handleAddSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", sinhVien.avatarFile);

      // Upload avatar first
      const avatarResponse = await axios.post(
        "http://localhost:8080/api/files",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const avatarUrl = avatarResponse.data.data;

      // Then add new sinh vien
      await axios.post(
        "http://localhost:8080/api/sinh-vien",
        {
          lop: { id: sinhVien.lop.id },
          namHoc: { id: sinhVien.namHoc.id },
          nguoiDung: {
            ...sinhVien.nguoiDung,
            avatar: avatarUrl,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Sinh vien added");
      fetchSinhVienList();
      handleCloseAddDialog();
    } catch (error) {
      console.error("Error adding sinh vien:", error);
    }
  };

  const handleDeleteSinhVien = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/sinh-vien/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Sinh vien deleted");
      fetchSinhVienList();
    } catch (error) {
      console.error("Error deleting sinh vien:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSinhVien((prevState) => ({
      ...prevState,
      nguoiDung: {
        ...prevState.nguoiDung,
        [name]: value,
      },
    }));
  };

  const handleLopChange = (event) => {
    setSinhVien((prevState) => ({
      ...prevState,
      lop: { id: event.target.value },
    }));
  };

  const handleNamHocChange = (event) => {
    setSinhVien((prevState) => ({
      ...prevState,
      namHoc: { id: event.target.value },
    }));
  };

  const handleStatusChange = (event) => {
    setSinhVien((prevState) => ({
      ...prevState,
      status: event.target.value,
    }));
  };

  const handleAvatarChange = (event) => {
    setSinhVien((prevState) => ({
      ...prevState,
      avatarFile: event.target.files[0],
    }));
  };

  // Pagination calculation
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sinhVienList.slice(startIndex, endIndex);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <h1>Quản lý sinh viên</h1>
      <StyledButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenAddDialog}
      >
        Thêm sinh viên
      </StyledButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Năm học</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((sinhVien, index) => (
              <TableRow key={sinhVien.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2e7c67",
                  },
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
                }}>
                <TableCell>{sinhVien.id}</TableCell>
                <TableCell>
                  <img
                    src={sinhVien.nguoiDung.avatar}
                    alt="Avatar"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{`${sinhVien.nguoiDung.firstName} ${sinhVien.nguoiDung.lastName}`}</TableCell>
                <TableCell>{sinhVien.nguoiDung.email}</TableCell>
                <TableCell>{sinhVien.lop.ten}</TableCell>
                <TableCell>{sinhVien.namHoc.namHoc}</TableCell>
                <TableCell>{sinhVien.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(sinhVien)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteSinhVien(sinhVien.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={Math.ceil(sinhVienList.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa sinh viên</DialogTitle>
        <DialogContent>
          <TextField
            name="lastName"
            label="Họ"
            value={sinhVien.nguoiDung.lastName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="firstName"
            label="Tên"
            value={sinhVien.nguoiDung.firstName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={sinhVien.nguoiDung.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="address"
            label="Địa chỉ"
            value={sinhVien.nguoiDung.address}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="phoneNumber"
            label="Số điện thoại"
            value={sinhVien.nguoiDung.phoneNumber}
            onChange={handleInputChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Lớp</InputLabel>
            <Select value={sinhVien.lop.id} onChange={handleLopChange}>
              {lopList.map((lop) => (
                <MenuItem key={lop.id} value={lop.id}>
                  {lop.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Năm học</InputLabel>
            <Select value={sinhVien.namHoc.id} onChange={handleNamHocChange}>
              {namHocList.map((namHoc) => (
                <MenuItem key={namHoc.id} value={namHoc.id}>
                  {namHoc.namHoc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select value={sinhVien.status} onChange={handleStatusChange}>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: "1rem" }}
          >
            Tải lên avatar
            <input type="file" hidden onChange={handleAvatarChange} />
          </Button>
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
        <DialogTitle>Thêm sinh viên</DialogTitle>
        <DialogContent>
          <TextField
            name="lastName"
            label="Họ"
            value={sinhVien.nguoiDung.lastName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="firstName"
            label="Tên"
            value={sinhVien.nguoiDung.firstName}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={sinhVien.nguoiDung.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="address"
            label="Địa chỉ"
            value={sinhVien.nguoiDung.address}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="phoneNumber"
            label="Số điện thoại"
            value={sinhVien.nguoiDung.phoneNumber}
            onChange={handleInputChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Lớp</InputLabel>
            <Select value={sinhVien.lop.id} onChange={handleLopChange}>
              {lopList.map((lop) => (
                <MenuItem key={lop.id} value={lop.id}>
                  {lop.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Năm học</InputLabel>
            <Select value={sinhVien.namHoc.id} onChange={handleNamHocChange}>
              {namHocList.map((namHoc) => (
                <MenuItem key={namHoc.id} value={namHoc.id}>
                  {namHoc.namHoc}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Trạng thái</InputLabel>
            <Select value={sinhVien.status} onChange={handleStatusChange}>
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            style={{ marginTop: "1rem" }}
          >
            Tải lên avatar
            <input type="file" hidden onChange={handleAvatarChange} />
          </Button>
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

export default ManageSinhVien;


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
  FormControl,
  InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from "@mui/material/Pagination";
import axios from "axios";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [ten, setTen] = useState('');
  const [noiDung, setNoiDung] = useState('');
  const [status, setStatus] = useState("ACTIVE");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Adjust as needed
  const token = localStorage.getItem("token");
  const [hoatDongId, setHoatDongId] = useState("");
  const [hoatDongOptions, setHoatDongOptions] = useState([]);
  useEffect(() => {
    fetchPosts();
    fetchHoatDongList();
  }, []);


  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bai-viet', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchHoatDongList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/hoat-dong", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHoatDongOptions(response.data.data);
    } catch (error) {
      console.error("Error fetching Hoat Dong:", error);
    }
  };

  const handleOpenEditDialog = async (post) => {
    setSelectedPost(post);
    setTen(post.ten);
    setNoiDung(post.noiDung);
    setHoatDongId(post.hoatDong.id);
    setStatus(post.status || "ACTIVE");
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedPost(null);
    setTen('');
    setNoiDung('');
    setHoatDongId("");
    setStatus("ACTIVE");
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/bai-viet`,
        {
          id: selectedPost.id,
          ten,
          noiDung,
          hoatDong: { id: hoatDongId }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Post updated');
      fetchPosts();
      handleCloseEditDialog();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleOpenAddDialog = () => {
    setAddDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
    setTen('');
    setNoiDung('');
  };

  const handleAddSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/bai-viet',
        {
          ten,
          noiDung,
          hoatDong: { id: hoatDongId }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Post added');
      fetchPosts();
      handleCloseAddDialog();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/bai-viet/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Post deleted');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };
  // Pagination calculation
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = posts.slice(startIndex, endIndex);
  return (
    <div>
      <h1>Quản lý bài viết</h1>
      <Button variant="contained" onClick={handleOpenAddDialog}>
        Thêm bài viết
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hoạt Động</TableCell>
              <TableCell>Tên bài viết</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((post, index) => (
              <TableRow key={post.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2e7c67",
                  },
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
                }}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.hoatDong.ten}</TableCell>
                <TableCell>{post.ten}</TableCell>
                <TableCell>{post.noiDung}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(post)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeletePost(post.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(posts.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "1rem", textAlign: "center" }}
      />
      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Sửa bài viết</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Hoat Dong ID</InputLabel>
            <Select value={hoatDongId} onChange={(e) => setHoatDongId(e.target.value)}>
              {hoatDongOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Tên bài viết"
            type="text"
            fullWidth
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Nội dung"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={noiDung}
            onChange={(e) => setNoiDung(e.target.value)}
          />
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

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onClose={handleCloseAddDialog}>
        <DialogTitle>Thêm bài viết mới</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="dense">
            <InputLabel>Hoat Dong ID</InputLabel>
            <Select value={hoatDongId} onChange={(e) => setHoatDongId(e.target.value)}>
              {hoatDongOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.ten}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Tên bài viết"
            type="text"
            fullWidth
            value={ten}
            onChange={(e) => setTen(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Nội dung"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={noiDung}
            onChange={(e) => setNoiDung(e.target.value)}
          />
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

export default ManagePosts;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, IconButton, TextField } from '@mui/material';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon, Comment as CommentIcon, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const BangTinPage = () => {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [perPage, setPerPage] = useState(5); // Số bài viết mỗi trang
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bai-viet', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data.data);
      setDisplayedPosts(response.data.data.slice(0, perPage)); // Hiển thị số bài viết đầu tiên
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchCommentsByPostId = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/comment/get-by-post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComments(response.data.data);
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
    }
  };

  const loadMorePosts = () => {
    const currentLength = displayedPosts.length;
    const nextPagePosts = posts.slice(currentLength, currentLength + perPage);
    setDisplayedPosts([...displayedPosts, ...nextPagePosts]); // Nối thêm bài viết vào danh sách đã hiển thị
  };

  const handlePostClick = async (postId) => {
    try {
      await fetchCommentsByPostId(postId);
      const selectedPost = posts.find(post => post.id === postId);
      setSelectedPost(selectedPost);
    } catch (error) {
      console.error('Error handling post click:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const likeFound = selectedPost.likeLst.find(like => like.nguoiDung.id === user.nguoiDung.id);

      if (likeFound) {
        await axios.delete(`http://localhost:8080/api/like/${likeFound.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:8080/api/like', {
          baiViet: { id: postId },
          nguoiDung: { id: user.nguoiDung.id },
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      if (!newComment) {
        console.error('Please enter a comment.');
        return;
      }

      await axios.post('http://localhost:8080/api/comment', {
        noiDung: newComment,
        baiViet: { id: selectedPost.id },
        nguoiDung: { id: user.nguoiDung.id },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchCommentsByPostId(selectedPost.id);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const handleEditComment = async () => {
    try {
      if (!editComment) {
        console.error('Please enter a comment.');
        return;
      }

      await axios.put(`http://localhost:8080/api/comment`, {
        id: editingCommentId,
        noiDung: editComment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchCommentsByPostId(selectedPost.id);
      setEditingCommentId(null);
      setEditComment('');
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:8080/api/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchCommentsByPostId(selectedPost.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const openEditDialog = (commentId, commentContent) => {
    setEditingCommentId(commentId);
    setEditComment(commentContent);
  };

  const closeEditDialog = () => {
    setEditingCommentId(null);
    setEditComment('');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Bảng tin
      </Typography>

      {/* Hiển thị danh sách bài viết */}
      <Box display="flex" flexDirection="column">
        {displayedPosts.map(post => (
          <Box key={post.id} border="1px solid #ccc" borderRadius="4px" p={2} mb={2}>
            <div onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer' }}>
              <Typography variant="h5">
                {post.ten}
              </Typography>
              <Typography variant="body1">
                {post.noiDung}
              </Typography>
            </div>

            {selectedPost && selectedPost.id === post.id && (
              <Box mt={2}>
                <Box display="flex" alignItems="center" mt={2}>
                  <IconButton onClick={() => handleLikePost(post.id)}>
                    {post.likeLst.some(like => like.nguoiDung.id === user.nguoiDung.id) ? (
                      <FavoriteIcon color="secondary" />
                    ) : (
                      <FavoriteBorderIcon color="secondary" />
                    )}
                  </IconButton>
                  <Typography>{post.likeLst.length} likes</Typography>
                  <IconButton>
                    <CommentIcon color="primary" />
                  </IconButton>
                  <Typography>{comments.length} comments</Typography>
                </Box>
                {/* Comment section */}
                <Box mt={2}>
                  <Typography variant="h6">Comments</Typography>
                  {comments.map(comment => (
                    <Box key={comment.id} border="1px solid #e0e0e0" borderRadius="4px" p={2} mt={1} sx={{ position: 'relative' }}>
                      {editingCommentId === comment.id ? (
                        <TextField
                          label="Edit comment"
                          fullWidth
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          variant="outlined"
                          margin="normal"
                        />
                      ) : (
                        <Typography variant="body2">{comment.noiDung}</Typography>
                      )}
                      <Box display="flex" alignItems="center" mt={1} sx={{ position: 'absolute', right: '10px', top: '5px' }}>
                        {editingCommentId === comment.id ? (
                          <>
                            <Button variant="contained" onClick={handleEditComment} color="primary" size="small">
                              Save
                            </Button>
                            <Button variant="contained" onClick={closeEditDialog} color="secondary" style={{ marginLeft: '10px' }} size="small">
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            {comment.nguoiDung.id === user.nguoiDung.id && (
                              <>
                                <IconButton onClick={() => openEditDialog(comment.id, comment.noiDung)} size="small">
                                  <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => handleDeleteComment(comment.id)} size="small">
                                  <DeleteIcon color="error" />
                                </IconButton>
                              </>
                            )}
                          </>
                        )}
                      </Box>
                    </Box>

                  ))}
                  <TextField
                    label="Add a comment"
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="outlined"
                    margin="normal"
                  />
                  <Button variant="contained" onClick={handleCommentSubmit} color="primary">
                    Comment
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        ))}
        {/* Nút Load More */}
        {displayedPosts.length < posts.length && (
          <Button variant="contained" onClick={loadMorePosts} color="primary" style={{ marginTop: '10px' }}>
            Load More
          </Button>
        )}
      </Box>
    </div>
  );
};

export default BangTinPage;

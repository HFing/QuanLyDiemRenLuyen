// authService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api";

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/authenticate`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

const createTroLySinhVien = async (token, userData, khoa) => {
  try {
    const response = await axios.post(
      `${API_URL}/tro-ly-sinh-vien`,
      {
        khoa,
        nguoiDung: userData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create TroLySinhVien error:", error);
    throw error;
  }
};

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/files`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};

const createKhoa = async (token, ten) => {
  try {
    const response = await axios.post(
      `${API_URL}/khoa`,
      {
        ten: ten,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create Khoa error:", error);
    throw error;
  }
};

const getAllKhoa = async (token) => {
  // Add token parameter
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(`${API_URL}/khoa`, config);
    console.log("Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching khoa:", error);
    throw error;
  }
};

const updateKhoa = async (token, userData) => {
  // Add token parameter
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const body = JSON.stringify(userData);

  try {
    const response = await axios.put(`${API_URL}/khoa`, body, config); // Correct endpoint URL
    console.log("Khoa updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating khoa:", error);
    throw error;
  }
};

const updateStatusKhoa = async (token, id) => {
  // Add token parameter
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.put(`${API_URL}/khoa/${id}`, null, config);
    console.log("Khoa status updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating khoa status:", error);
    throw error;
  }
};

const createSinhVien = async (token, userData, lop, namHoc) => {
  try {
    const response = await axios.post(
      `${API_URL}/sinh-vien`,
      {
        lop,
        namHoc,
        nguoiDung: userData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create SinhVien error:", error);
    throw error;
  }
};

const createLop = async (token, ten, khoa) => {
  try {
    const response = await axios.post(
      `${API_URL}/lop`,
      {
        ten: ten,
        khoa,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create Lop error:", error);
    throw error;
  }
};

const createNamHoc = async (token, namHoc) => {
  try {
    const response = await axios.post(
      `${API_URL}/nam-hoc`,
      {
        namHoc: namHoc,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Create NamHoc error:", error);
    throw error;
  }
};

export {
  login,
  createTroLySinhVien,
  uploadFile,
  createKhoa,
  createSinhVien,
  createLop,
  createNamHoc,
  getAllKhoa,
  updateKhoa,
  updateStatusKhoa,
};

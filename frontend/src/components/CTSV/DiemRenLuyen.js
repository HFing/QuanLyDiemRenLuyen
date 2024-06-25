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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import { getAllKhoa } from "../../services/authService";
import { styled } from "@mui/system";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import Pagination from "@mui/material/Pagination";
// import "./style.css";

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
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: colors.primary,
  color: "#ffffff",
  "&:hover": {
    backgroundColor: colors.primaryDark,
  },
  marginBottom: theme.spacing(1), // Add margin bottom
}));

const PaginationContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "16px", // Adjust margin top for pagination
});
const StyledTableRow = styled(TableRow)({
  "&:hover": {
    backgroundColor: colors.accent5,
  },
});

const DiemRenLuyen = () => {
  const [data, setData] = useState([]);
  const [filterType, setFilterType] = useState("toan-truong");
  const [filterValue, setFilterValue] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [page, setPage] = useState(1); // Current page state

  const token = localStorage.getItem("token");

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
      setFilterOptions(
        response.data.data.map((d) => {
          return {
            label: d.nguoiDung.firstName + " " + d.nguoiDung.lastName,
            value: d.id,
          };
        })
      );
    } catch (error) {
      console.error("Error fetching sinh vien:", error);
    }
  };

  const fetchKhoaList = async () => {
    try {
      const data = (await getAllKhoa(token)).data;
      setFilterOptions(
        data.map((d) => {
          return { label: d.ten, value: d.id };
        })
      );
    } catch (error) {
      console.error("Error fetching khoa:", error);
    }
  };

  const fetchLopList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/lop", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFilterOptions(
        response.data.data.map((d) => {
          return { label: d.ten, value: d.id };
        })
      );
    } catch (error) {
      console.error("Error fetching lop:", error);
    }
  };

  useEffect(() => {
    fetchData();

    switch (filterType) {
      case "toan-truong":
        setFilterOptions([]);
        break;
      case "khoa":
        fetchKhoaList();
        break;
      case "lop":
        fetchLopList();
        break;
      case "sinh-vien":
        fetchSinhVienList();
        break;
      default:
        break;
    }
  }, [filterType]);

  const fetchData = async () => {
    let url = "http://localhost:8080/api/diem-ren-luyen/";
    switch (filterType) {
      case "toan-truong":
        url += "toan-truong";
        break;
      case "khoa":
        url += `khoa/${filterValue}`;
        break;
      case "lop":
        url += `lop/${filterValue}`;
        break;
      case "sinh-vien":
        url += `sinh-vien/${filterValue}`;
        break;
      default:
        break;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
    setFilterValue("");
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Mã sinh viên", "Họ và tên", "Điểm rèn luyện", "Lớp", "Khoa"]],
      body: data.map((item) => [
        item.sinhVien.id,
        item.sinhVien.firstName + " " + item.sinhVien.lastName,
        item.diem,
        item.sinhVien.lop.ten,
        item.sinhVien.khoa.ten,
      ]),
    });
    doc.save("diem_ren_luyen.pdf");
  };

  const exportCSV = () => {
    const csv = Papa.unparse(
      data.map((item) => ({
        MaSinhVien: item.sinhVien.id,
        HoVaTen: item.sinhVien.firstName + " " + item.sinhVien.lastName,
        DiemRenLuyen: item.diem,
        Lop: item.sinhVien.lop.ten,
        Khoa: item.sinhVien.khoa.ten,
      }))
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "diem_ren_luyen.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const paginatedData = data.slice((page - 1) * 5, page * 5);

  return (
    <div>
      <h1>Điểm rèn luyện</h1>
      <FormControl fullWidth margin="dense">
        <InputLabel>Chọn loại thống kê</InputLabel>
        <Select value={filterType} onChange={handleFilterTypeChange}>
          <MenuItem value="toan-truong">Toàn trường</MenuItem>
          <MenuItem value="khoa">Theo khoa</MenuItem>
          <MenuItem value="lop">Theo lớp</MenuItem>
          <MenuItem value="sinh-vien">Theo sinh viên</MenuItem>
        </Select>
      </FormControl>
      {(filterType === "khoa" ||
        filterType === "lop" ||
        filterType === "sinh-vien") && (
          <FormControl fullWidth margin="dense">
            <InputLabel>Chọn {filterType}</InputLabel>
            <Select value={filterValue} onChange={handleFilterValueChange}>
              {filterOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      <StyledButton onClick={fetchData}>Lấy dữ liệu</StyledButton>
      <StyledButton onClick={exportPDF}>Xuất PDF</StyledButton>
      <StyledButton onClick={exportCSV}>Xuất CSV</StyledButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã sinh viên</TableCell>
              <TableCell>Họ và tên</TableCell>
              <TableCell>Điểm rèn luyện</TableCell>
              <TableCell>Lớp</TableCell>
              <TableCell>Khoa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={item.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2e7c67",
                  },
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#dbf5ee",
                }}>
                <TableCell>{item.sinhVien.id}</TableCell>
                <TableCell>
                  {item.sinhVien.firstName + " " + item.sinhVien.lastName}
                </TableCell>
                <TableCell>{item.diem}</TableCell>
                <TableCell>{item.sinhVien.lop.ten}</TableCell>
                <TableCell>{item.sinhVien.khoa.ten}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationContainer>
        <Pagination
          count={Math.ceil(data.length / 5)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </PaginationContainer>
    </div>
  );
};

export default DiemRenLuyen;

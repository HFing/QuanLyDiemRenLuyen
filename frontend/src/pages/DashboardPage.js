import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CTSVDashboard from '../components/CTSV/Dashboard';
import StudentDashboard from '../components/Student/Dashboard';
import AssistantDashboard from '../components/Assistant/Dashboard';
import Header from '../components/Header';
// import Footer from '../components/Footer';

const DashboardPage = () => {
  const userRole = localStorage.getItem('userRole');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: '1 0 auto' }}>
        <Routes>
          <Route path="/" element={<Navigate to={`/${userRole}`} />} />
          <Route path="/ctsv" element={<CTSVDashboard />} />
          <Route path="/sv" element={<StudentDashboard />} />
          <Route path="/tlsv" element={<AssistantDashboard />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default DashboardPage;

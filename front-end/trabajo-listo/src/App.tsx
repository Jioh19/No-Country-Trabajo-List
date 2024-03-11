import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navbar } from "./containers/Navbar";
import "./normalize.css";
import { Home } from "./pages/Home";
import { Footer } from "./containers/Footer";
import { Equipo } from "./pages/Equipo";
import { Testimonios } from "./pages/Testimonios";
import { Perfil } from "./pages/Perfil";
import { EditarPerfil } from "./pages/EditarPerfil";
import { useSelector } from "react-redux";
import { UserState } from "./components/component";
import React from "react";
import { NuevoServicio } from "./pages/NuevoServicio";
import { ToastContainer } from "react-toastify";
import { EditarServicio } from "./pages/EditarServicio";
import { Search } from "./pages/Search";

const App = () => {
  const user = useSelector((state: { user: UserState }) => state.user);

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    if (!user?.token) return <Navigate to="/" />;
    else return children;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer
        className=""
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        closeButton={false}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="equipo" element={<Equipo />} />
        <Route path="testimonios" element={<Testimonios />} />
        <Route path="search" element={<Search />} />
        <Route
          path="perfil/:id"
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="editar-perfil"
          element={
            <ProtectedRoute>
              <EditarPerfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="nuevo-servicio"
          element={
            <ProtectedRoute>
              <NuevoServicio />
            </ProtectedRoute>
          }
        />
        <Route
          path="editar-servicio/:id"
          element={
            <ProtectedRoute>
              <EditarServicio />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

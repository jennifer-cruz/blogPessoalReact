import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/estaticos/navbar/Navbar";
import Footer from "./components/estaticos/footer/Footer";
import Home from "./paginas/home/Home";
import "./App.css";
import ListaPostagens from "./components/postagens/listaPostagens/ListaPostagem";
import CadastroPostagem from "./components/postagens/cadastroPost/CadastroPost";
import CadastroTema from "./components/temas/cadastroTema/CadastroTema";
import DeletarPostagem from "./components/postagens/deletarPostagem/DeletarPostagem";
import DeletarTema from "./components/temas/deletarTema/DeletarTema";
import Login from "./paginas/login/Login";
import CadastroUsuario from "./paginas/cadastroUsuario/CadastroUsuario";
import ListaTemas from "./components/temas/listaTemas/ListaTema";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
<Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: '85vh' }}>
        <Routes>
        <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastroUsuario" element={<CadastroUsuario />} />
            <Route path="/temas" element={<ListaTemas />} />
            <Route path="/postagens" element={<ListaPostagens />} />
            <Route path="/cadastrarPostagem" element={<CadastroPostagem />} />
            <Route path="/editarPostagem/:id" element={<CadastroPostagem />} />
            <Route path="/apagarPostagem/:id" element={<DeletarPostagem />} />
            <Route path="/cadastrarTema" element={<CadastroTema />} />
            <Route path="/editarTema/:id" element={<CadastroTema />} />
            <Route path="/deletarTema/:id" element={<DeletarTema />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
    </Provider>


  );
}

export default App;

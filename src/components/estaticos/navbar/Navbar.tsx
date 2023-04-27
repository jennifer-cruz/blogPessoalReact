import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { useSelector, useDispatch } from 'react-redux';
import { addToken } from "../../../store/tokens/actions";
import { toast } from 'react-toastify'


function Navbar() {

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const history = useNavigate();

  const dispatch = useDispatch();

  function logout() {
    dispatch(addToken(''));
    toast.info('🐶 Usuário deslogado 🐶', {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
    history('/login');
  }

  var navbarComponent;

  if (token !== "") {
    navbarComponent = <AppBar position="static">
      <Toolbar className="toolbarTxt" >
        {/* <Box > 
          <Link to="/home" className="cursorBlogPessoal">
            <Typography  >
              BlogPessoal
            </Typography>
          </Link>
        </Box> */}

        <Box className="pagNavbar"  >
          <Box mx={1} >
            <Link to="/home" className="cursorNavbar">
              <Typography  >
                HOME 🐶
              </Typography>
            </Link>
          </Box>

          <Box mx={1} >
            <Link to="/postagens" className="cursorNavbar">
              <Typography >
                POSTAGENS 🐶
              </Typography>
            </Link>
          </Box>

          <Box mx={1} >
            <Link to="/temas" className="cursorNavbar">
              <Typography >
                TEMAS 🐶
              </Typography>
            </Link>
          </Box>

          <Box mx={1} >
            <Link to="/cadastrarTema" className="cursorNavbar">
              <Typography  >
                CADASTRAR TEMA 🐶
              </Typography>
            </Link>
          </Box>


          <Box mx={1} onClick={logout} >
            <Link to="/login" className="cursorSair">
              <Typography  >
                LOGOUT
              </Typography>
            </Link>
          </Box>


        </Box>
      </Toolbar>
    </AppBar>
  }

  return (
    <>
      {navbarComponent}
    </>
  );
}

export default Navbar;
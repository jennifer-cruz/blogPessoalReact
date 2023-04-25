import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { useSelector, useDispatch } from 'react-redux';
import { addToken } from "../../../store/tokens/actions";


function Navbar() {

  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );

  const history = useNavigate();

  const dispatch = useDispatch();

  function logout() {
    dispatch(addToken(''));
    alert('usuario deslogado com sucesso');
    history('/login');
  }

  var navbarComponent;

  if (token !== "") {
    navbarComponent = <AppBar position="static">
      <Toolbar  >
        <Box>
          <Link to="/home" className="cursorBlogPessoal">
            <Typography variant="h5" >
              BlogPessoal
            </Typography>
          </Link>
        </Box>

        <Box display="flex" justifyContent="start">
          <Box mx={1} >
            <Link to="/home" className="cursorNavbar">
              <Typography variant="h6" >
                home
              </Typography>
            </Link>
          </Box>

          <Link to="/postagens" >
            <Box mx={1} >
              <Link to="/postagens" className="cursorNavbar">
                <Typography variant="h6" >
                  postagens
                </Typography>
              </Link>
            </Box>
          </Link>

          <Link to="/temas" >
            <Box mx={1} >
              <Link to="/temas" className="cursorNavbar">
                <Typography variant="h6" >
                  temas
                </Typography>
              </Link>
            </Box>
          </Link>

          <Box mx={1} >
            <Link to="/cadastrarTema" className="cursorNavbar">
              <Typography variant="h6" >
                cadastrar tema
              </Typography>
            </Link>
          </Box>

          <Link to="/login" >
            <Box mx={1} onClick={logout} className="cursorSair">

              <Typography variant="h6" >
                logout
              </Typography>
            </Box>
          </Link>
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
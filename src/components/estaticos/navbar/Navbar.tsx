import './Navbar.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';

function Navbar() {
  const [token, setToken] = useLocalStorage('token');
  const history = useNavigate();

  function logout() {
    setToken('');
    alert('usuario deslogado com sucesso');
    history('/login');
  }

  return (
    <>
      <AppBar position="static" style={{ background: 'var(--blue-600)' }}>
        <Toolbar variant="dense">
          <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
            <Box style={{ cursor: 'pointer' }}>
              <Link to="/home">
                <Typography variant="h5" color="inherit">
                  BlogPessoal
                </Typography>
              </Link>
            </Box>

            <Box display="flex" justifyContent="start">
              <Link to="/home">
                <Box mx={1} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6" color="inherit">
                    home
                  </Typography>
                </Box>
              </Link>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Link to="/postagens">
                  <Typography variant="h6" color="inherit">
                    postagens
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Link to="/temas">
                  <Typography variant="h6" color="inherit">
                    temas
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} style={{ cursor: 'pointer' }}>
                <Link to="/cadastrarTema">
                  <Typography variant="h6" color="inherit">
                    cadastrar tema
                  </Typography>
                </Link>
              </Box>
              <Box mx={1} onClick={logout} style={{cursor: 'pointer'}}>
                <Typography variant="h6" color="inherit">
                  logout
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
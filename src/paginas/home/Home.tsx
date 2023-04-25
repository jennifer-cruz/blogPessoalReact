import React, { useEffect } from 'react';
import { Typography, Grid, Button } from '@material-ui/core';
import { Box } from '@mui/material';
import './Home.css'
import ListaPostagens from '../../components/postagens/listaPostagens/ListaPostagem';
import TabPostagens from '../../components/postagens/tabPostagens/TabPostagens';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/tokensReducer';
import {Link} from 'react-router-dom'

function Home() {
  const history = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(

    (state) => state.tokens
  );
  useEffect(() => {
    if (token == "") {
      alert("você precisa estar logado")
      history('/login')
    }
  }, [token])


  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"

      >
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}  >
            <Typography
              variant="h3"
              gutterBottom
              component="p"
              align="center"
            >
              Seja bem vindo(a)!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              component="h5"
              align="center"
            >
              expresse aqui os seus pensamentos e opiniões!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}>
              <ModalPostagem />
            </Box>
            <Link to='/postagens'>
            <Button className='btnVerPost'>
              Ver Postagens
            </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6} className='imgHome'>
          <img
            src="https://i.imgur.com/2PvUhkl.jpg"
            alt=""
          />
        </Grid>
        <Grid xs={12} >
          <TabPostagens />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
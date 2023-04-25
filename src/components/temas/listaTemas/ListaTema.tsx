import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography, Grid } from '@mui/material';
import { Tema } from '../../../models/Tema';
import './ListaTema.css';
import { getAll } from '../../../service/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { useSelector } from 'react-redux';

function ListaTemas() {
  const [temas, setTemas] = useState<Tema[]>([]);
 
  const token = useSelector<TokenState, TokenState["tokens"]>(

    (state) => state.tokens
  );
  const history = useNavigate();

  async function getAllTemas() {
    await getAll('/temas', setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getAllTemas();
  }, [temas.length]);

  useEffect(() => {
    if (token === '') {
      alert('Sem token não né meu bom');
      history('/login');
    }
  }, [token]);

  return (
    <>
      {temas.length === 0 && (
        <div className="loaderContainer">
          <span className="loader"></span>
        </div>
      )}

      <div className="listaTema">
        {temas.map((tema) => (
          // <Grid item marginY={2} mx={4}>
          <Card variant="outlined" className="cardTema">
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tema:
              </Typography>
              <Typography variant="h5" component="h2">
                {tema.descricao}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/editarTema/${tema.id}`}>
                <Button color="primary" variant="contained" size="small">
                  Editar
                </Button>
              </Link>
              <Link to={`/deletarTema/${tema.id}`}>
                <Button color="error" variant="contained" size="small">
                  Deletar
                </Button>
              </Link>
            </CardActions>
          </Card>
          // </Grid>
        ))}
      </div>
    </>
  );
}


export default ListaTemas;
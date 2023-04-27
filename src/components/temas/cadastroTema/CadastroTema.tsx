import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tema } from '../../../models/Tema';
import { getId, post, put } from '../../../service/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify'

function CadastroTema() {
  const history = useNavigate();

  const token = useSelector<TokenState, TokenState["tokens"]>(

    (state) => state.tokens
  );

  const { id } = useParams<{ id: string }>()

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: '',
  });

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setTema({
      ...tema,
      [event.target.name]: event.target.value,
    });
  }

  async function getTemaById(id: string) {
    await getId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token
      }
    })
  }

  useEffect(() => {
    if (id !== undefined) {
      getTemaById(id)
    }
  })

  useEffect(() => {
    if (token === '') {
      toast.error('🐶 Você precisa estar logado 🐶', {
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
  }, []);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (id !== undefined) {
      try {
        await put('/temas', tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('🐶 Tema atualizado com sucesso 🐶', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        history('/temas')
      } catch (error) {
        toast.error('🐶 Falha ao atualizar o Tema 🐶', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    } else {
      try {
        await post('/temas', tema, setTema, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('🐶 Tema cadastrado com sucesso 🐶', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        history('/temas')
      } catch (error) {
        toast.error('🐶 Falha ao cadastrar o Tema 🐶', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
    }
  }

  return (
    <>
      <Grid container justifyContent={'center'} mt={4}>
        <Grid item xs={6}>
          <Typography
            align="center"
            variant="h3"
            gutterBottom
            fontWeight={'bold'}
          >
            {/* if ternário */}
            {tema.id !== 0 ? 'Editar tema' : 'Cadastrar tema'}
          </Typography>
          <form onSubmit={onSubmit}>
            <Box display="flex" flexDirection={'column'} gap={2}>
              <TextField
                label="Descrição do tema"
                name="descricao"
                value={tema.descricao}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  updateModel(event)
                }
              />
              <Button
                type="submit"
                variant="contained"
                disabled={tema.descricao.length < 3}
              >
                Cadastrar
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default CadastroTema;
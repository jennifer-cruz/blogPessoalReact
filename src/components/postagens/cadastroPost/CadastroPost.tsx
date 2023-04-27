import React, { useState, useEffect, ChangeEvent } from "react";
import {  Button,  Container,  Typography,  TextField,  FormControl,  InputLabel,  Select,  MenuItem, FormHelperText,} from "@mui/material";
import "./CadastroPost.css";
import { Postagem } from "../../../models/Postagem";
import { useNavigate, useParams } from "react-router-dom";
import { Tema } from "../../../models/Tema";
import { getAll, getId, put, post, buscaId } from "../../../service/Service";
import { useSelector } from "react-redux";
import { TokenState } from "../../../store/tokens/tokensReducer";
import {toast} from 'react-toastify'

function CadastroPostagem() {
  const history = useNavigate();
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  const { id } = useParams<{ id: string }>();
  const [temas, setTemas] = useState<Tema[]>([]);

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    data: "",
    tema: null,
  });

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });

  useEffect(() => {
    if (token === "") {
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
      history("/login");
    }
  });

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [event.target.name]: event.target.value,
      tema: tema,
    });
  }

  async function getAllTemas() {
    await getAll("/temas", setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function findByIdPostagem(id: string) {
    await getId(`postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getAllTemas();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ postagem });

    if (id !== undefined) {
      try {
        await put("/postagens", postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('🐶 Postagem atualizada com sucesso 🐶', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        history("/postagens");
      } catch (error) {
        toast.error('🐶 Falha ao atualizar a postagem 🐶', {
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
        await post("/postagens", postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('🐶 Postagem cadastrada com sucesso 🐶', {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        history("/postagens");
      } catch (error) {
        toast.error('🐶 Falha ao cadastrar a postagem 🐶', {
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
      <Container maxWidth={"sm"}>
        <form className="cadastroPost" onSubmit={onSubmit}>
          <Typography marginTop={4} variant="h3" align="center" className="tituloModal">
            Cadastrar postagem
          </Typography>
          <TextField
            value={postagem.titulo}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
            label="Titulo da postagem"
            name="titulo"
            id="titulo"
            variant="outlined"
            fullWidth
          />
          <TextField
            value={postagem.texto}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
            label="Texto da postagem"
            name="texto"
            id="texto"
            variant="outlined"
            fullWidth
            multiline
            minRows={4}
          />

          <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Tema </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              onChange={(e) =>
                buscaId(`/temas/${e.target.value}`, setTema, {
                  headers: {
                    Authorization: token,
                  },
                })
              }>
              {temas.map((tema) => (
                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Escolha um tema para a postagem</FormHelperText>
            <br />
            <Button type="submit" className="btnFinalizar" >
              Finalizar
            </Button>
          </FormControl>

          {/* <FormControl>
            <InputLabel>Tema</InputLabel>
            <Select
              variant="standard"
              onChange={(event) =>
                getId(`/temas/${event.target.value}`, setTema, {
                  headers: { Authorization: token },
                })
              }
            >
              {temas.map((tema) => (
                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Escolha um tema para a sua postagem</FormHelperText>
          </FormControl> */}
          {/* <Button variant="contained" color="primary" type='submit' disabled={tema.id === 0}>
            {tema.id === 0 ? 'selecione um tema' : 'cadastrar'}
          </Button> */}
        </form>
      </Container>
    </>
  );
}

export default CadastroPostagem;

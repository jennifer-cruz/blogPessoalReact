import React, { ChangeEvent, useEffect, useState } from 'react';
import './Login.css';
import { Box, Typography, Button, Grid, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import UsuarioLogin from '../../models/UserLogin';
import { login } from '../../service/Service';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/actions';
import {toast} from 'react-toastify'

function Login() {

  // Hook responsável por navegar o usuário de uma tela para outra, sem precisar de um Link
  const history = useNavigate()
  const dispatch = useDispatch();
  // Hook customizado, para adicionar informações no LocalStorage do navegador
  const [token, setToken] = useState('')

  // Hook para controle de estado da Váriavel de UsuarioLogin, irá manter os dados de email e senha durante o preenchimento do formulário pelo usuário
  const [userLogin, setUserLogin] = useState<UsuarioLogin>({
    id: 0,
    nome: '',
    usuario: '',
    foto: '',
    senha: '',
    token: ''
  })

  // função responsável por pegar o que foi digitado no campo, e atualizar o estado do Usuario
  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value
    })
  }

  // Função responsável por enviar o pedido de login para a service do front, e consequentemente, para o backend. É uma função assincrona, pois precisa aguardar o backend devolver alguma resposta
  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await login('/usuarios/logar', userLogin, setToken)
      toast.success('🐶 Usuario logado com sucesso 🐶', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })

    } catch (error) {
      console.log(error);
      toast.error('🐶 Usuário ou senha inválidos 🐶', {
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

  // Hook de controle de "efeito colateral" que irá ficar monitorando a variavel token, e quando ela mudar, vai cair no if... caso seja verdadeiro, navega nosso usuário para a tela de Home
  useEffect(() => {
    if (token !== '') {
      dispatch(addToken(token));
      history('/home')
    }
  }, [token])

  return (
    <>
      <Grid container alignItems={'center'} className='fundoLogin'>
        <Grid item xs={6} justifyContent='center' >
          <Box display='flex' justifyContent={'center'} >
            <Grid item xs={6} >
              <form onSubmit={onSubmit}>
                <Typography variant='h3' align='center' className='txtEntrar' >Entrar</Typography>
                <TextField
                  variant='outlined'
                  name='usuario'
                  value={userLogin.usuario}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                  label='Usuário'
                  margin='normal'
                  fullWidth />

                <TextField
                  type='password'
                  name='senha'
                  value={userLogin.senha}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)}
                  variant='outlined'
                  label='Senha'
                  margin='normal'
                  fullWidth />
                <Box marginY={2}>

                  <Button type='submit' size='large' className='btnLogar' fullWidth>Logar</Button>

                </Box>
              </form>
              <hr />
              <Typography marginTop={2} align='center' >Ainda não tem uma conta? <Link to='/cadastroUsuario' className='linkCadastro'>Cadastre-se aqui</Link></Typography>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6} className='imgLogin'>
          

        </Grid>
      </Grid>
    </>
  )
}

export default Login;
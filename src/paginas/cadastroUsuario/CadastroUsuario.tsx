import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import User from '../../models/User';
import { cadastroUsuario } from '../../service/Service';
import { Grid, Typography, Button, TextField } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './CadastroUsuario.css';

function CadastroUsuario() {

  let navigate = useNavigate();
  const [confirmarSenha, setConfirmarSenha] = useState<String>("")
  const [user, setUser] = useState<User>(
    {
      id: 0,
      nome: '',
      usuario: '',
      foto: '',
      senha: ''
    })

  const [userResult, setUserResult] = useState<User>(
    {
      id: 0,
      nome: '',
      usuario: '',
      foto: '',
      senha: ''
    })

  useEffect(() => {
    if (userResult.id != 0) {
      navigate("/login")
    }
  }, [userResult])


  function confirmarSenhaHandle(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value)
  }


  function updatedModel(e: ChangeEvent<HTMLInputElement>) {

    setUser({
      ...user,
      [e.target.name]: e.target.value
    })

  }
  async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()
    if (confirmarSenha == user.senha) {
      cadastroUsuario(`/usuarios/cadastrar`, user, setUserResult)
      alert('Usuario cadastrado com sucesso')
    } else {
      alert('Dados inconsistentes. Favor verificar as informações de cadastro.')
    }
  }
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid item xs={6} className='imagem2'></Grid>
      <Grid item xs={6} alignItems='center'>
        <Box paddingX={10}>
          <form onSubmit={onSubmit}>
            <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos2'>Cadastrar</Typography>
            <TextField value={user.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='nome' label='Digite seu nome' variant='outlined' name='nome' margin='normal' required fullWidth />
            <TextField value={user.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='Usuário (Digite um e-mail válido)' variant='outlined' name='usuario' margin='normal' required type='email' fullWidth />
            <TextField
              variant='outlined'
              name='foto'
              value={user.foto}
              onChange={(event: ChangeEvent<HTMLInputElement>) => updatedModel(event)}
              label='Foto (URL)'
              margin='normal'
              fullWidth />
            <TextField value={user.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='Digite uma senha' variant='outlined' name='senha' margin='normal' type='password' required fullWidth />
            <TextField value={confirmarSenha} onChange={(e: ChangeEvent<HTMLInputElement>) => confirmarSenhaHandle(e)} id='confirmarSenha' label='Confirme a senha' variant='outlined' name='confirmarSenha' margin='normal' type='password' required fullWidth />
            <Box marginTop={2} textAlign='center'>
              <Link to='/login' className='text-decorator-none'>
                <Button variant='contained' className='btnCancelar'>
                  Cancelar
                </Button>
              </Link>
              <Button type='submit' variant='contained' className='btnCadastrar'>
                Cadastrar
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>



    </Grid>
  );
}

export default CadastroUsuario;
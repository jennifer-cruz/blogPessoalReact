import axios from "axios";

export const api = axios.create({
  // baseURL: 'https://blogdothiagofaccipieri.onrender.com',
  // baseURL: 'https://blogpessoal-nktn.onrender.com/'
  baseURL: 'https://blogpessoaljennifer.onrender.com'
});

export const login = async (url: any, dados: any, setDados: any) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data.token);
};

export const cadastroUsuario = async (url: any, dados: any, setDado: any) => {
  const resposta = await api.post(url, dados)
  setDado(resposta.data)
}

// a tipagem do headers seria um Object
export const getAll = async (url: any, setDados: any, headers: any) => {
  const resposta = await api.get(url, headers);
  setDados(resposta.data);
};

export const getId = async (url: any, setDados: any, headers: any) => {
  const resposta = await api.get(url, headers);
  setDados(resposta.data);
};

export const buscaId = async(url: any,setDado: any, headers: any) => { 
  const resposta = await api.get(url,headers)
  setDado(resposta.data)
}

export const post = async (url: any, dados: any, setDados: any, headers: any) => {
  const resposta = await api.post(url, dados, headers);
  setDados(resposta.data);
};

export const put = async (url: any, dados: any, setDados: any, headers: any) => {
  const resposta = await api.put(url, dados, headers);
  setDados(resposta.data);
};

export const deleteId = async(url: any, headers: any) => {
  await api.delete(url, headers)
}
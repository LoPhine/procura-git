import React, { useState } from 'react';
import axios from 'axios'
import * as S from './styled'
import { useHistory } from 'react-router-dom';


function App(props) {
  const history = useHistory();
  const [ usuario, setUsuario ] = useState('');
  const [ erro, setErro ] = useState(false);

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`).then(response => {
      const repositories = response.data;
      const repositoriesName = [];


      repositories.map((repositoriy) => {
       return repositoriesName.push(repositoriy.name, repositoriy.stargazes_count, repositoriy.forks, repositoriy.open_issues)
      })
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setErro(false)
      history.push('./repositories'); // Pega os dados do repositório
    })

    .catch(err => {
      setErro(true);
    })
  }

  return (
    <S.HomeContainer>
        <S.Title> Busca Github </S.Title>
      <S.Content>
        <S.Input className="usuarioInput" placeholder="Usuário" value = {usuario} onChange = {e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick = {handlePesquisa}>Pesquisar</S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Usuário não encontrado.</S.ErrorMsg> : '' }
    </S.HomeContainer>
  );
}

export default App;
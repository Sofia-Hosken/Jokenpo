import React, { Fragment, useState, useEffect } from 'react';
import './App.css';
import papelImage from './assets/moves/paper-hand-transparent.png';
import pedraImage from './assets/moves/rock-hand-transparent.png';
import tesouraImage from './assets/moves/scissor-hand-transparent.png';

function App() {
  const [escolhaJogador, setEscolhaJogador] = useState(null);
  const [escolhaComputador, setEscolhaComputador] = useState(null);
  const [resultado, setResultado] = useState('');
  const [pontuacaoJogador, setPontuacaoJogador] = useState(0);
  const [pontuacaoComputador, setPontuacaoComputador] = useState(0);
  const [empates, setEmpates] = useState(0);

  const opcoes = ['papel', 'pedra', 'tesoura'];

  const fazerJogada = (escolha) => {
    const computador = opcoes[Math.floor(Math.random() * opcoes.length)];

    setEscolhaJogador(escolha);
    setEscolhaComputador(computador);

    if (escolha === computador) {
      setResultado('Empate');
      setEmpates((empates) => empates + 1);
    } else if (
      (escolha === 'papel' && computador === 'pedra') ||
      (escolha === 'pedra' && computador === 'tesoura') ||
      (escolha === 'tesoura' && computador === 'papel')
    ) {
      setResultado('Você ganhou!');
      setPontuacaoJogador((pontuacao) => pontuacao + 1);
    } else {
      setResultado('Computador ganhou!');
      setPontuacaoComputador((pontuacao) => pontuacao + 1);
    }
  };

  const resetarJogo = () => {
    setEscolhaJogador(null);
    setEscolhaComputador(null);
    setResultado('');
    setEmpates(0);
    setPontuacaoJogador(0);
    setPontuacaoComputador(0);
  };

  useEffect(() => {
    if (escolhaJogador !== null && escolhaComputador !== null) {
     
      const timeoutId = setTimeout(() => {
        setEscolhaJogador(null);
        setEscolhaComputador(null);
        setResultado('');
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [escolhaJogador, escolhaComputador]);

  return (
    <Fragment>
      <h1>Jogo de Jokenpô</h1>
      <div>
        <p>Sua pontuação: {pontuacaoJogador}</p>
        <p>Pontuação do computador: {pontuacaoComputador}</p>
        <p>Empates: {empates}</p>
      </div>
      <button onClick={() => fazerJogada('papel')}>
        <img src={papelImage} alt="Papel" />
      </button>
      <button onClick={() => fazerJogada('pedra')}>
        <img src={pedraImage} alt="Pedra" />
      </button>
      <button onClick={() => fazerJogada('tesoura')}>
        <img src={tesouraImage} alt="Tesoura" />
      </button>
      {escolhaJogador && escolhaComputador && (
        <div>
          <p>Sua escolha: {escolhaJogador}</p>
          <p>Escolha do computador: {escolhaComputador}</p>
          <p>Resultado: {resultado}</p>
          <button onClick={resetarJogo}>Jogar Novamente</button>
        </div>
      )}
    </Fragment>
  );
}

export default App;

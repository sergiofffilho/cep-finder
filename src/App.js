import './App.css';
import { useState } from 'react';

function App() {
  const [adress, setAdress] = useState({})

  function handleCep(event){
    const cep = event.target.value

    setAdress({
      cep
    })

    if(cep && cep.length === 8){
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        setAdress(oldAdress => {
          return {
            ...oldAdress,
            rua: data.logradouro,
            bairro: data.bairro,
            localidade: data.localidade,
            estado: data.uf,
            ddd: data.ddd
          }
        })
      })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Buscador de CEP</h1>
        <section>
          <input
            placeholder='Digite aqui um cep'
            onChange={handleCep}/>
            <h5>Cep: {adress.cep}</h5>
          <ul>
            <li>Logradouro: {adress.rua ? adress.rua : '-'}</li>
            <li>Bairro: {adress.bairro ? adress.bairro : '-'}</li>
            <li>Localidade: {adress.localidade ? adress.localidade : '-'}</li>
            <li>UF: {adress.estado ? adress.estado : '-'}</li>
            <li>DDD: {adress.ddd ? adress.ddd : '-'}</li>
          </ul>
        </section>
      </header>
    </div>
  );
}

export default App;

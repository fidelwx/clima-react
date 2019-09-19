import React, { useState, useEffect } from 'react';
import Header from './components/Header'
import Formulario from './components/Formulario'
import Error from './components/Error'
import Clima from './components/Clima'

function App() {
  //state principal
  //ciudad = state y guardarCiudad = setState
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect (() => {
    //prevenir ejecucion
    if (ciudad === '') {
      return;
    }

    const consultarAPI = async () => {
      const appId = 'f9e38ad7d5679b31a96d8d1a41fc98e2';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
      
      //consultar la url
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado);
    }
    consultarAPI();
  }, [ ciudad, pais ]);

  const datosConsulta = datos => {
    //validar que ambos campos esten llenos
    if (datos.ciudad === '' || datos.pais === '') {
      guardarError(true);
      return;
    }
    //ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  //cargar un componente condicionalmente
  let componente;
  if (error) {
    //si hay un error mostrarlo
    componente = <Error mensaje="Ambos campos son obligatorios"/>
  } else if (resultado.cod === "404") {
    componente = <Error mensaje="Ciudad no encontrada"/>
  } else {
    //si no hay error mostrar el clima
    componente = <Clima 
                   resultado={resultado} 
                  />;
  }

  return (
    <div className="App">
      <Header 
        titulo='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>

            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

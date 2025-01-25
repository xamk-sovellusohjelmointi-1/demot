import React, { useState } from 'react';
import './App.css'

const App : React.FC = () : React.ReactElement => {

  const [tervehdys, setTervehdys] = useState<string>("");
  const [nimi, setNimi] = useState<string>("");

  function naytaTervehdys() {
    setTervehdys(`Heippa, ${nimi}`);
  }

  return (
    <>
      <h1>Demo 1: React-perusteet</h1>
      <h2>"Hello World!"</h2>
      <input type="text" placeholder='Kirjoita nimesi...' onChange={(e) => { setNimi(e.target.value); console.log(nimi); }}/>
      <button onClick={naytaTervehdys}>Sano hei</button>

      {(Boolean(tervehdys))
      ? <p className='tervehdys'>{tervehdys}</p>
      : null
      }
      
    </>
  )
}

export default App

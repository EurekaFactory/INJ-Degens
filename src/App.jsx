import './App.css'
import TokenComponent from './components/TokenComponent/TokenComponent';
import { Routes, Route } from 'react-router-dom';
import Airdrop from './components/Airdrop/Airdrop';
import NFTs from './components/NFTs/NFTs';
import WebsiteComponent from './components/WebsiteComponent/WebsiteComponent';

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<WebsiteComponent />} />
          <Route path="/project" element={<TokenComponent/>} />
          <Route path="/airdrop" element={<Airdrop />} />
          <Route path="/NFTs" element={<NFTs />} />
      </Routes>
    </>
    
  )
}

export default App
import './App.css'
import TokenComponent from './components/TokenComponent/TokenComponent';
import { Routes, Route } from 'react-router-dom';
import WebsiteComponent from './components/WebsiteComponent/websiteComponent';

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<WebsiteComponent/>} />
          <Route path="/project" element={<TokenComponent/>} />
      </Routes>
      {/* <WebsiteComponent/>
      <TokenComponent /> */}
    </>
    
  )
}

export default App
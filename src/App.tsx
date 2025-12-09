
import './App.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import HomePages from './Pages/HomePages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <MantineProvider> 
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<HomePages/>}/>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
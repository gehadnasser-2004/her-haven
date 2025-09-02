import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import SelectSection from './pages/SelectSection';
function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path='select' element={<SelectSection />} />
    </Routes>
  )
}

export default App;

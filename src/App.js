import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRef } from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import NotFound from './components/NotFound/NotFound';
import DetailPage from './components/DetailPage/DetailPage';
import AboutPage from './components/About/AboutPage';

function App() {
  // const [firstChoice, setFirstChoice] = useState(null);
  // const [secondChoice, setSecondChoice] = useState(null);

  const firstChoice = useRef(null);
  const secondChoice = useRef(null);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage firstChoice={firstChoice} secondChoice={secondChoice} />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/detail"
          element={
            <DetailPage firstChoice={firstChoice} secondChoice={secondChoice} />
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

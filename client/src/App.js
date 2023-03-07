import { AccountBox } from './components/accountBox';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Home from './components/homePage';


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<AppContainer><AccountBox /></AppContainer>} />
    </Routes>
  );

}

export default App;

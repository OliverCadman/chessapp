import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './routes/router';
import Nav from './pages/Nav';

function App() {

  return (
    <>
      <Nav />
      <BrowserRouter>
        <PageRoutes />
      </BrowserRouter>
    </>
  )
}

export default App

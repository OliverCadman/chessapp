import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./routes/router";
import Nav from "./pages/Nav";
import { StateProvider } from "./context/AppContext";

function App() {
  return (
    <>
      <Nav />
      <BrowserRouter>
        <StateProvider>
          <PageRoutes />
        </StateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

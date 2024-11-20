import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./routes/router";
import Nav from "./pages/Nav";
import { StateProvider } from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Nav />
      <BrowserRouter>
        <StateProvider>
          <QueryClientProvider client={queryClient}>
            <PageRoutes />
          </QueryClientProvider>
        </StateProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

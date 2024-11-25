import { BrowserRouter } from "react-router-dom";
import PageRoutes from "./routes/router";
import Nav from "./pages/Nav";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <Nav />
      <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <PageRoutes />
          </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

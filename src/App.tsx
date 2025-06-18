import "./App.css";
import { ThemeLayout } from "~themes/ThemeLayout.tsx";
import { AppRouter } from "~routes/AppRouter.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <ThemeLayout>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </ThemeLayout>
    </>
  );
}

export default App;

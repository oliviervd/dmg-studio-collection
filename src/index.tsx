import { render } from "preact";
import { LocationProvider, Router, Route } from "preact-iso";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header.jsx";
import { Home } from "./pages/home.tsx";
import { Catalogue } from "./pages/catalogue.js";
import { ObjectPage } from "./pages/object.js";

import { NotFound } from "./pages/_404.jsx";
import "./styles/fonts.css";
import "./styles/header.css";
import "./styles/home.css";
import "./styles/catalogue.css";
import "./styles/objectPage.css";

export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { staleTime: Infinity }, // set caching time to 24hours.
    },
  });

  return (
    <LocationProvider>
      <QueryClientProvider client={queryClient}>
        <main>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/catalogue" component={Catalogue} />
            <Route path="/object/:id" component={ObjectPage} />
            <Route default component={NotFound} />
          </Router>
        </main>
      </QueryClientProvider>
    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));

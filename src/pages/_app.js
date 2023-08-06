import "@/styles/globals.css";
import { AppProvider } from "./context";
function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

export default App;

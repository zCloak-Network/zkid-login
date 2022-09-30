import Home from './pages/Home';
import { AppProvider, ScrollProvider } from './components';
import GlobalStyle from './GlobalStyle';
import Header from './Header';

function Root() {
  return (
    <AppProvider>
      <GlobalStyle />
      <ScrollProvider>
        <Header />
        <Home />
      </ScrollProvider>
    </AppProvider>
  );
}

export default Root;

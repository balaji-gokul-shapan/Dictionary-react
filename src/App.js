import { Container, ThemeProvider } from '@mui/material';
import './App.css';
import theme from './styles/theme/Index';
import { Colors } from './styles/theme/Index';
import { Index } from './Libraries/pages/Index';
import { SpellCheck } from './Libraries/pages/SpellCheck';
import { Grammer } from './Libraries/pages/Grammer';
import { CheckSpell } from './Libraries/pages/CheckSpell';
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" sx={{ background: Colors.primary }}>
          {/* <Index/> */}
          {/* <SpellCheck /> //&Current */}
          {/* <Grammer/> */}
          <CheckSpell/>
        </Container>
      </ThemeProvider>
    </>
  );
}
export default App;

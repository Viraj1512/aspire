import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme.ts';

const graphqlUrl = import.meta.env.VITE_GRAPHQL_URL

// Initialize Apollo Client
const client = new ApolloClient({
  uri: graphqlUrl,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <App />
      </ThemeProvider>
    </ApolloProvider>
  </StrictMode>,
)

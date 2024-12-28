import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { store } from './redux/store.redux.ts'
// import { AuthProvider } from './context/Atuh/Auth.context.tsx'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // Number of times to retry a failed query
    },
    mutations: {
      retry: 0, // Number of times to retry a failed mutation
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AuthProvider> */}
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
    {/* </AuthProvider> */}
  </StrictMode>,
)

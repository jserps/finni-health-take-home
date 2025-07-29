import './App.css'
import { AppProvider } from './AppContext'
import AppPage from './pages/AppPage'

function App() {

  return (
    <AppProvider>
      <AppPage />
    </AppProvider>
  )
}

export default App

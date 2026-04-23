import './App.css'
import { HashRouter } from 'react-router-dom'
import { AppRoutes } from './routes/AppRoutes'
import { ProductProvider } from './context/ProductContext'

function App() {

  return (
    <HashRouter>
      <ProductProvider>
        <AppRoutes />
      </ProductProvider>
    </HashRouter>
  )
}

export default App

import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path='/auth' />
          </Routes>
        </Router>
      </HelmetProvider>
    </>
  )
}

export default App

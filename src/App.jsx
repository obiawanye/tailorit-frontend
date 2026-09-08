import { Routes, Route } from 'react-router'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Catalog from './pages/Catalog'

function App() {
  return (
    <Routes>
      <Route path="/sign-in/*" element={<SignIn />} />
      <Route path="/sign-up/*" element={<SignUp />} />
      <Route path="/catalog" element={<Catalog />} />
    </Routes>
  )
}

export default App
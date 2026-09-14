import { Routes, Route } from 'react-router'
import Welcome from './pages/Welcome'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Catalog from './pages/Catalog'
import Verify from './pages/Verify'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/sign-in/*" element={<SignIn />} />
      <Route path="/sign-up/*" element={<SignUp />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
  )
}

export default App
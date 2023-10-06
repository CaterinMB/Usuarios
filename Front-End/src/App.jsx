import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RoleProvider } from './context/RoleContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

import ListRole from './pages/ListRole.jsx'
import ListUser from './pages/ListUser.jsx'

import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <RoleProvider>
      <UserProvider>
        <BrowserRouter>
          <div className="flex">
            <Navbar />
            <main className='container mx-auto px-10 flex-grow'>
              <Routes>
                <Route path='/' element={<h1>DASHBOARD</h1>} />
                <Route path='/role' element={<ListRole />} />
                <Route path='/user' element={<ListUser />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </UserProvider>
    </RoleProvider>
  )
}

export default App
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RoleProvider } from './context/RoleContext.jsx'
import { UserProvider } from './context/UserContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'
import { RecipeProvider } from './context/RecipeContext.jsx'

import RoleFormPage from './pages/RoleFormPage.jsx'
import RolePage from './pages/RolePage.jsx'
import UserFormPage from './pages/UserFormPage.jsx'
import UserPage from './pages/UserPage.jsx'
import ProductFormPage from './pages/ProductFormPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import RecipeFormPage from './pages/RecipeFormPage.jsx'
import RecipePage from './pages/RecipePage.jsx'
import ProductRecipePage from './pages/ProductRecipePage.jsx'

import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <RoleProvider>
      <UserProvider>
        <ProductProvider>
          <RecipeProvider>
            <BrowserRouter>
            <div className="flex">
            <Navbar />
              <main className='container mx-auto px-10 flex-grow'>
                <Routes>
                  <Route path='/' element={<h1>DASHBOARD</h1>} />
                  <Route path='/role' element={<RolePage />} />
                  <Route path='/add-role' element={<RoleFormPage />} />
                  <Route path='/role/:id' element={<RoleFormPage />} />
                  <Route path='/user' element={<UserPage />} />
                  <Route path='/add-user' element={<UserFormPage />} />
                  <Route path='/user/:id' element={<UserFormPage />} />
                  <Route path='/product' element={<ProductPage />} />
                  <Route path='/add-product' element={<ProductFormPage />} />
                  <Route path='/product/:id' element={<ProductFormPage />} />
                  <Route path='/recipe' element={<RecipePage />} />
                  <Route path='/add-recipe' element={<RecipeFormPage />} />
                  <Route path='/recipe/:id' element={<RecipeFormPage />} />
                  <Route path='/product-recipe' element={<ProductRecipePage />} />
                </Routes>
              </main>
              </div>
            </BrowserRouter>
          </RecipeProvider>
        </ProductProvider>
      </UserProvider>
    </RoleProvider>
  )
}

export default App
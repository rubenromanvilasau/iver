import { Route, Routes } from 'react-router-dom';
import { HomePage, ItemPage, LoginPage, PublishItemPage } from './pages/index';
import { Footer, Navbar, ProtectedRoute } from './components/index';
import { UserProvider } from './context/UserProvider';

export const IverApp = () => {
    return(
        <UserProvider>
            <Navbar/>
            <Routes>
                <Route path='/' element={ <HomePage/> }/>
                <Route path='/login' element={ <LoginPage/> }/>
                <Route path='/:id' element={ <ItemPage/> }/>
                {/* <Route path='/publish' element={<PublishItemPage/>}/> */}
                <Route 
                    path='/publish' 
                    element={ 
                        <ProtectedRoute>
                            <PublishItemPage/>
                        </ProtectedRoute> 
                    }
                    />
            </Routes>
            {/* <Footer/> */}
        </UserProvider>
    )
}
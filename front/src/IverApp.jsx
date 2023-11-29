import { Route, Routes } from 'react-router-dom';
import { HomePage, ItemPage, LoginPage, MyOrdersPage, PublishItemPage } from './pages/index';
import { Footer, Navbar, ProtectedRoute } from './components/index';
import { UserProvider } from './context/UserProvider';
import 'react-toastify/dist/ReactToastify.css';

export const IverApp = () => {
    return(
        <UserProvider>
            <Navbar/>
            <Routes>
                <Route path='/' element={ <HomePage/> }/>
                <Route path='/login' element={ <LoginPage/> }/>
                <Route path='/item/:id' element={ <ItemPage/> }/>
                <Route 
                    path='/my-orders' 
                    element={ 
                        <ProtectedRoute>
                            <MyOrdersPage/>
                        </ProtectedRoute> 
                }/>
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
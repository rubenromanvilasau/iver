import { Route, Routes } from 'react-router-dom';
import { HomePage, ItemPage, LoginPage, MyOrdersPage, MyProfilePage, CheckoutPage, PublishItemPage, SearchResultsPage } from './pages/index';
import { Footer, Navbar, ProtectedRoute } from './components/index';
import { UserProvider } from './context/UserProvider';
import 'react-toastify/dist/ReactToastify.css'; 

export const IverApp = () => {
    return(
        <UserProvider>
            <div className='flex flex-col min-h-screen grow break-all'>
                <Navbar/>
                <div className="flex grow">
                    <Routes>
                        <Route path='/' element={ <HomePage/> }/>
                        <Route path='/search/:query' element={ <SearchResultsPage/> }/>
                        <Route path='/login' element={ <LoginPage/> }/>
                        <Route path='/item/:id' element={ <ItemPage/> }/>
                        <Route path='/my-profile'
                            element={
                                // <ProtectedRoute>
                                    <MyProfilePage/>
                                // </ProtectedRoute>
                            }
                        />
                        <Route path='/my-orders' 
                            element={ 
                                <ProtectedRoute>
                                    <MyOrdersPage/>
                                </ProtectedRoute> 
                        }/>
                        <Route 
                            path='/publish' 
                            element={ 
                                // <ProtectedRoute>
                                    <PublishItemPage/>
                                // </ProtectedRoute> 
                            }
                        />
                        <Route path='/checkout/:id' element={<CheckoutPage/>}/>
                    </Routes>
                </div>
                <Footer/>
            </div>
        </UserProvider>
    )
}
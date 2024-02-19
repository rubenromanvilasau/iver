import { Route, Routes } from 'react-router-dom';
import { HomePage, ItemPage, LoginPage, MyOrdersPage, MyProfilePage, CheckoutPage, PublishItemPage, SearchResultsPage, MyItemsPage, InstructionsPage } from './pages/index';
import { Footer, Navbar, ProtectedRoute } from './components/index';
import { UserProvider } from './context/UserProvider';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';

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
                        <Route path='/my-items' 
                            element={ 
                                <ProtectedRoute>
                                    <MyItemsPage/>
                                </ProtectedRoute> 
                            }
                        />
                        <Route 
                            path='/publish' 
                            element={ 
                                // <ProtectedRoute>
                                    <PublishItemPage/>
                                // </ProtectedRoute> 
                            }
                        />
                        <Route path='/checkout/:id' element={<CheckoutPage/>}/>
                        <Route path='/instructions' element={<InstructionsPage/>}/>
                        
                    </Routes>
                </div>
                <Footer/>
                <ToastContainer/>
            </div>
        </UserProvider>
    )
}
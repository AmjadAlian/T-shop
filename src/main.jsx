import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from './components/web/context/UserContext.jsx';
import '@fortawesome/fontawesome-free/css/all.css'
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                <ToastContainer />
                <App />
            </QueryClientProvider>
        </UserContextProvider>
    </>
)

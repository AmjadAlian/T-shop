import { RouterProvider } from "react-router-dom";
import { CartContextProvider } from "./components/web/cart/CartContext.jsx";
import { UserContext, UserContextProvider } from "./components/web/context/UserContext.jsx";
import { router } from './layouts/Routes.jsx'
import { useContext, useEffect } from "react";
export default function App() {

  const { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('userToken') != null) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, [])

  return (

    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>


  )
}

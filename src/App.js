import './App.css';
import { Route, Routes } from "react-router-dom";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './containers/Home';
import PrivateRoutes from './components/PrivateRoutes';
import { useState } from 'react';
import Product from './containers/Product';
import withNavBar from './hoc/withNavBar';

function App() {
  const [userInfo, setUserInfo] = useState({});
  const NavHome = withNavBar(Home, userInfo); //HOC to wrap navbar for required components
  const NavProduct = withNavBar(Product, userInfo);
  return (
    <div className='App'>
    <Routes>
      <>
        <Route path="/" exact element={<SignIn setUserInfo={setUserInfo} />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route element={<PrivateRoutes setUserInfo={setUserInfo} />}>
              <Route path='/home' element={<NavHome userInfo={userInfo} />} />
              <Route path="/product/:id" element={<NavProduct />} />
          </Route>
      </>
    </Routes>
    </div>
  );
}

export default App;

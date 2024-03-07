import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = (props) => {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token){
    fetch('https://dummyjson.com/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then((data) => {
        props.setUserInfo(data);
      });
    }
  }, [])
  //doing simple check here 
  let token = localStorage.getItem("token"); 
  let auth = {'token': token ? true : false}
return (
    auth.token ? <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoutes;

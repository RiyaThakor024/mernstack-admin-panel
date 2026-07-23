import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store";

export const NonAuth = () => {
 
    //protection
   const user = useAuthStore();

   if(user !== null){
    return <Navigate to="/" replace={true}/>;
}
  return (
<div>
     
     <h1>NonAuth component</h1>
     <Outlet />
        
    </div>
    
);
};

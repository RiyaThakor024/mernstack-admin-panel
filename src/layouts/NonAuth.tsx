import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store";

export const NonAuth = () => {
 
    // protection
   const user = useAuthStore((state) => state.user);

   if(user){
    return <Navigate to="/" />;
}
  return (
<div>
     
     <h1>NonAuth component</h1>
     <Outlet />
        
    </div>
    
);
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import notifyService from "../../Services/NotifyService";
import cyberService from "../../Services/CyberService";

// Higher order component for validating admin routes

// Recieve route to be checked
interface AdminRoutes  {
  Route: JSX.Element;
};

function AdminRoutes(props: AdminRoutes): JSX.Element {

  const [ isAdmin, setIsAdmin ] = useState<boolean>(false);

  const navigate = useNavigate();

  // Verify if admin, redirect if not
  useEffect(() => {

    cyberService.verifyAdmin()
    .then(isAdmin => {

      setIsAdmin(isAdmin);

      if (!isAdmin) {
        redirectUser();
      }

    })
    .catch(err => notifyService.error(err));

  }, []);

  function redirectUser() {
    navigate("/Home");
    notifyService.error("Acesss Denied");
  }

  return (

    <div className="AdminRoutes">

      {isAdmin ? props.Route : null}
      
    </div>
    
  );
}

export default AdminRoutes;


import { useNavigate } from "react-router-dom";

import Logout from "./Logout";

function AdminHeader() {
  const navigate = useNavigate();

  return (
 
    <div style={{ marginBottom: "20px" }}>
      {/* <button
        type="button"
        style={{
          backgroundColor: "#555",
          color: "#fff",
        }}
        onClick={() => navigate("/dashboard")}
      >
        ⬅
      </button>
    <Logout /> */}

     
      
    </div>
    
  );
}

export default AdminHeader;

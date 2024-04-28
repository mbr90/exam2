import { useUserActions } from "../../../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import BorderButton from "./BorderButton";

function LogoutButton() {
  const { clearUser } = useUserActions();

  const navigate = useNavigate();

  function onLogout() {
    clearUser();
    navigate("/");
  }

  return <BorderButton onClick={onLogout} text="LOGOUT" />;
}

export default LogoutButton;

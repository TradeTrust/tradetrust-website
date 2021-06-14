import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../common/contexts/AuthContext"
import { NavItemsProps } from "../../../components/Layout/NavigationBar"

interface LogoutProps extends NavItemsProps {
  className: string;
}

const goToMain = (history: ReturnType<typeof useHistory>) => history.push("/");

export default function Logout(props: LogoutProps) {
  const { label, className } = props;
  const history = useHistory();
  const location = useLocation()
  const { logout, isLoggedIn } = useAuthContext();
  const onLogout = async () => {
    await logout()
    goToMain(history)
  };
  const showLogout = isLoggedIn && location.pathname.includes("demo")
  return showLogout ? (
    <div className={className} onClick={onLogout}>
      {label}
    </div>
  ) : null;
}

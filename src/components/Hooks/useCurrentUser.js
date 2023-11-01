import { useContext, useMemo } from "react";
import { AppContex } from "../../context/AppContext";
// import { AppContex } from "../context/AppContext";
const useCurrentUser = () => {
  const { currentUser } = useContext(AppContex);
  const currentUserDetail = useMemo(() => currentUser, [currentUser]);

  return currentUserDetail;
};

export default useCurrentUser;

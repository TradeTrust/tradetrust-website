import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthenticationContext";

export const usePrivateRoute = () => {
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      if (!isLoggedIn) {
        router.push("/");
      }
    }
  }, [isLoggedIn, router]);
};

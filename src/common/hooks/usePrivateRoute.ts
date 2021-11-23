import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthenticationContext";

export const usePrivateRoute = (): void => {
  const { isLoggedIn } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== undefined) {
      if (!isLoggedIn) {
        console.log("NOT LOGGED IN");
        router.push("/");
      }
    }
  }, [isLoggedIn, router]);
};

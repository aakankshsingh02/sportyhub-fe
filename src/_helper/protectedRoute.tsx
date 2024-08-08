import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useProtectedRoute = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); 
    }
  }, [router]);
};

export default useProtectedRoute;

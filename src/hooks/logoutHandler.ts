"use client"
import { setLogout } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const useLogout = () => {
  const dispatch = useDispatch();
  let router= useRouter();
  const logout = () => {
    dispatch(setLogout());
    router.push(`/auth`)
  };
  return logout;
};

export default useLogout;
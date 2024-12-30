"use client";
import Grid from "@mui/material/Grid2";
import React, { useState } from "react";
import UserDetailsCard from "./_components/userDetailsCard";
import UserInfoCards from "./_components/userInfoCard";
import { ApiResponse } from "@/types/apiResponse";
import apis from "@/services";
import { useQuery } from "@tanstack/react-query";
import StartupLoader from "@/components/startupLoader";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const {
    data: usersData,
    isPending,
  }: any = useQuery({
    queryKey: ["getUsers"],
    queryFn: async (): Promise<ApiResponse<any>> => {
      const response = await apis.getUsers();
      return response.data;
    }
  });
console.log(selectedUser,"selectedUserselectedUser")

  return (
    <div>
      <div>
        <p className="text-2xl font-bold text-secondary-foreground">Users</p>
      </div>
      {isPending ? (
        <>
          <StartupLoader onFinish={() => {}} />
        </>
      ) : (
        <>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid size={{ xs: 6 }}>
            {usersData?.data?.data.map((item: any, index: number) => (
                <div
                  key={index}
                  className={selectedUser?.id === item?.id ? "rounded-[28px] border border-black/60 mt-2": "mt-2"}
                  onClick={() => setSelectedUser(item)}
                >
                  <UserInfoCards cardData={item} />
                </div>
              ))}
            </Grid>

            <Grid size={{ xs: 6 }}>
              {selectedUser ? (
                <UserDetailsCard cardData={selectedUser} />
              ) : (
                <p className="text-center">Select a user to view details</p>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Users;

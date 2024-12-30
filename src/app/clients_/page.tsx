import Grid from "@mui/material/Grid2";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PieChart from "./_components/pieChart";
import ClientsTable from "./_components/clientsTable";
import { columns } from "./columns/columns";

const users = [
  { name: "User 1", image: "/assets/avatar1.png" },
  { name: "User 2", image: "/assets/avatar2.png" },
  { name: "User 3", image: "/assets/avatar3.png" },
  { name: "User 4", image: "/assets/avatar4.png" },
  { name: "User 5", image: "/assets/avatar5.png" },
  { name: "User 6", image: "/assets/avatar6.png" },
  { name: "User 7", image: "/assets/avatar7.png" },
  { name: "User 8", image: "/assets/avatar8.png" },
  { name: "User 9", image: "/assets/avatar1.png" },
  { name: "User 10", image: "/assets/avatar2.png" },
  { name: "User 11", image: "/assets/avatar3.png" },
  { name: "User 12", image: "/assets/avatar4.png" },
];

const Clients = () => {
  return (
    <div>
      <div className="mb-4">
        <p className="text-[20px] font-semibold text-secondary-foreground ">
          Clients
        </p>
      </div>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card className="rounded-[22px] p-2">
            <h3 className="font-semibold p-4 mb-4">Users</h3>
            <CardContent className="mx-auto">
              <div className="grid grid-cols-4 gap-4 justify-items-center">
                {users.map((user, index) => (
                  <Avatar key={index} className=" w-16 h-16">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card className="rounded-[22px] h-full">
            <CardContent className="flex items-center justify-center h-full">
              <PieChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Table */}

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <p className="text-[18px] mt-5 font-semibold text-secondary-foreground mb-2 ">
            Details
          </p>
          <ClientsTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default Clients;

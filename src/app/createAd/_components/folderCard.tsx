"use client";
import React, { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateFolderModal from "./createFolderModal";
import { useRouter } from "next/navigation";

interface folderCardProps {
  folder?: any;
  isNew?: boolean;
}

const FolderCard = ({ folder, isNew }: folderCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleDoubleClick = () => {
    router.push("/folderAds");
  };

  return (
    <>
      <CreateFolderModal open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      {!isNew ? (
        <Card onDoubleClick={handleDoubleClick} className="bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl font-bold">
                {folder?.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{folder?.info}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full h-32 rounded-lg">
              <img
                src={folder?.img}
                alt={folder?.title}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gray-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-xl font-bold">New folder</CardTitle>
              <p className="text-sm text-muted-foreground">Add new folder</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full h-32 rounded-lg border-2 border-dashed border-gray-300">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setIsDialogOpen(true)}
              >
                <Plus className="h-6 w-6 text-gray-400" />
                <span className="sr-only">Add new folder</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default FolderCard;

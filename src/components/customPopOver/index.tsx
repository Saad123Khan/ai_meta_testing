import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Wand2 } from "lucide-react";

interface popoverProps {
  popoverContent?: any;
  triggerElement?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const CustomPopOver = ({
  popoverContent,
  triggerElement,
  open,
  onOpenChange,
}: popoverProps) => {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{triggerElement}</PopoverTrigger>
      <PopoverContent className="w-[400px]">
        {popoverContent}
      </PopoverContent>
    </Popover>
  );
};

export default CustomPopOver;

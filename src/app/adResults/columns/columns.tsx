"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit } from "lucide-react";

export const campaignColumns = [
  {
    accessorKey: "assets",
    header: "Assets",
    meta: { width: "200px" },
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("assets")}</div>
    ),
  },
  {
    accessorKey: "adGroupName",
    header: "Ad Group Name",
    meta: { width: "250px" },
  },
  {
    accessorKey: "type",
    header: "Type",
    meta: { width: "150px" },
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
    meta: { width: "150px" },
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center">
            <span
              className={`w-2 h-2 rounded-full inline-block mr-2 ${
                row.original.impressions === 0
                  ? "bg-[#22D3EE]"
                  : row.original.impressions === 1
                  ? "bg-[#F87171]"
                  : "bg-primary"
              }`}
            ></span>
            {row.getValue("impressions")}
          </div>
        );
      },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { width: "150px" },
    cell: ({ row }: any) => (
      <div className={`capitalize ${row.getValue("status")}`}>
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "assets",
    header: "Assets",
    meta: { width: "200px" },
    cell: ({ row }: any) => (
      <div className="capitalize">{row.getValue("assets")}</div>
    ),
  },
  {
    accessorKey: "adGroupName",
    header: "Ad Group Name",
    meta: { width: "250px" },
  },
  {
    accessorKey: "type",
    header: "Type",
    meta: { width: "150px" },
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
    meta: { width: "150px" },
    cell: ({ row }: any) => <div>{row.getValue("impressions") || 0}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { width: "150px" },
    cell: ({ row }: any) => (
      <div className={`capitalize ${row.getValue("status")}`}>
        {row.getValue("status")}
      </div>
    ),
  },
];

export const assetColumns = [
  {
    accessorKey: "assets",
    header: "Assets",
    meta: { width: "200px" },
  },
  {
    accessorKey: "adGroupName",
    header: "Ad Group Name",
    meta: { width: "250px" },
  },
  {
    accessorKey: "type",
    header: "Type",
    meta: { width: "150px" },
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
    meta: { width: "100px" },
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center">
          <span
            className={`w-2 h-2 rounded-full inline-block mr-2 ${
              row.original.impressions === 0
                ? "bg-[#22D3EE]"
                : row.original.impressions === 1
                ? "bg-[#F87171]"
                : "bg-primary"
            }`}
          ></span>
          {row.getValue("impressions")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { width: "150px" },
  },
  {
    accessorKey: "edit",
    header: "Edit",
    meta: { width: "100px" },
    cell: () => (
      <button className="edit-btn">
        <Edit />
      </button>
    ),
  },
];

export const targetColumns = [
  {
    accessorKey: "location",
    header: "Location",
    meta: { width: "150px" },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { width: "120px" },
    cell: ({ row }: any) => {
      return (
        <Badge
          className={`${
            row.original.status === "Enabled"
              ? "bg-[#DBEAFE] text-[#1E40AF] font-light border border-[#93C5FD]"
              : row.original.status === "Disabled"
              ? "bg-[#FCE7F3] text-[#9D174D] font-light border border-[#F9A8D4]"
              : row.original.status === "Approved"
              ? "bg-[#D1FAE5] text-[#1E40AF] font-light border border-[#6EE7B7]"
              :"bg-[#FEF3C7] text-[#1E40AF] font-light border border-[#FCD34D]"
          }`}
        >
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "spend",
    header: "Spend",
    meta: { width: "100px" },
  },
  {
    accessorKey: "clicks",
    header: "Clicks",
    meta: { width: "150px" },
  },
  {
    accessorKey: "conversions",
    header: "Conversions",
    meta: { width: "150px" },
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center">
          <span
            className={`w-2 h-2 rounded-full inline-block mr-2 ${
              row.original.impressions === 0
                ? "bg-[#22D3EE]"
                : row.original.impressions === 1
                ? "bg-[#F87171]"
                : "bg-primary"
            }`}
          ></span>
          {row.getValue("conversions")}
        </div>
      );
    },
  },
  {
    accessorKey: "impressions",
    header: "Impressions",
    meta: { width: "120px" },
  },
  {
    accessorKey: "edit",
    header: "Edit",
    meta: { width: "100px" },
    cell: () => (
      <button className="edit-btn">
        <Edit />
      </button>
    ),
  },
];

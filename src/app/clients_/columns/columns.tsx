
// export const rowData = [
//     {
//       name: "Annette Black",
//       status: "User Registered",
//       type: "New",
//       plan: "3 months",
//       salesman: "peru",
//     },
//     {
//       name: "Marvin McKinney",
//       status: "Onboard",
//       type: "Old",
//       plan: "3 months",
//       salesman: "peru",
//     },
//     {
//       name: "Courtney Henry",
//       status: "Onboard",
//       type: "Old",
//       plan: "12 months",
//       salesman: "peru",
//     },
//     {
//       name: "Jacob Jones",
//       status: "User Registered",
//       type: "New",
//       plan: "6 months",
//       salesman: "peru",
//     },
//     {
//       name: "Devon Lane",
//       status: "User Registered",
//       type: "New",
//       plan: "3 months",
//       salesman: "peruperu",
//     },
//   ];


export const columns = [
    {
      accessorKey: "name",
      header: "Name",
      meta: { width: "200px" },
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: { width: "150px" },
      cell: ({ row }:any) => (
        <span className="capitalize">{row.getValue("status")}</span>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      meta: { width: "100px" },
    },
    {
      accessorKey: "plan",
      header: "Plan",
      meta: { width: "150px" },
    },
    {
      accessorKey: "salesman",
      header: "Salesman",
      meta: { width: "150px" },
    },
  ];
  
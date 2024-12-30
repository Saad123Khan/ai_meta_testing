import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DialogHeader } from "@/components/ui/dialog";
import CustomInputField from "@/components/customInputField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import apis from "@/services";
import { swalPopUp } from "@/lib/helper";
import { ApiResponse } from "@/types/apiResponse";

interface employeeData {
  name: string;
  email: string;
  password: string;
  department_id: string;
  crm_role: string;
}

const AddEmployeeModal = ({
  open,
  onClose,
  refetch,
  type,
  employeeData,
  setType,
}: {
  open: boolean;
  onClose: () => void;
  refetch: any;
  type: any;
  employeeData: any;
  setType: any;
}) => {
  const handleSubmit = () => {
    onClose();
  };

  const [customEmployee, setCustomEmployee] = useState<employeeData>({
    name: "",
    email: "",
    password: "",
    department_id: "",
    crm_role: "",
  });

  const employeeSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
    department_id: yup.string().required("Department is required"),
    crm_role: yup.string().required("Role is required"),
  });

  const defaultCustomEmployee: employeeData = {
    name: "",
    email: "",
    password: "",
    department_id: "",
    crm_role: "",
  };

  const {
    control: customEmployeeControl,
    handleSubmit: handleEmployeeSubmit,
    formState: { errors: CustomEmployeeErrors },
    reset,
  } = useForm<employeeData>({
    defaultValues: defaultCustomEmployee,
    mode: "onBlur",
    resolver: yupResolver(employeeSchema),
  });

  // Fetch department data
  const { data: departmentData, isLoading: isLoadingDepartments } = useQuery({
    queryKey: ["getEmployeeDepartment"],
    queryFn: async (): Promise<any> => {
      const response = await apis.getEmployeeDepartment();
      return response.data;
    },
  });

  const { mutate: mutateEmployee, isPending: isPendingEmployee }: any = useMutation(
    {
      mutationFn: apis.createEmployees,
      onSuccess: ({
        data,
      }: {
        data: { success: boolean; message: string };
      }) => {
        if (data?.success) {
          reset(defaultCustomEmployee);
          setType("Create")
          swalPopUp("Employee", "Employee Created Successfully", "success");
          onClose()
          refetch();
        }
      },
      onError: (error: any) => {
        console.log(error.response.data.errors, "error.response.data.errors")
        if (error.response?.data?.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([key, messages]: any) => `${messages.join(", ")}`)
            .join("\n");
          console.log(errorMessages, "errorMessages")
          swalPopUp("Error", errorMessages, "error");
        } else if (error.response?.data?.message) {
          swalPopUp("Error", "", error.response.data.message);
        } else {
          swalPopUp("Error", "", error.message || "An unknown error occurred.");
        }
      },
    }
  );

  const { mutate: mutateEditEmployee, isPending }: any = useMutation(
    {
      mutationFn: (data: any) => apis.editEmployee(employeeData?.id, data),
      onSuccess: ({
        data,
      }: {
        data: { success: boolean; message: string };
      }) => {
        if (data?.success) {
          reset(defaultCustomEmployee);
          setType("Create")
          swalPopUp("Employee", "Employee Update Successfully", "success");
          onClose();
          refetch()
        }
      },
      onError: (error: any) => {
        console.log(error.response.data.errors, "error.response.data.errors")
        if (error.response?.data?.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([key, messages]: any) => `${messages.join(", ")}`)
            .join("\n");
          console.log(errorMessages, "errorMessages")
          swalPopUp("Error", errorMessages, "error");
        } else if (error.response?.data?.message) {
          swalPopUp("Error", "", error.response.data.message);
        } else {
          swalPopUp("Error", "", error.message || "An unknown error occurred.");
        }
      },
    }
  );

  const onEmployeeSubmitHandler = (val: any) => {
    // onClose();
    if (type == "Edit") {
      mutateEditEmployee({ ...val, department_id: val?.department_id ? Number(val?.department_id) : departmentData?.id })
    } else {
      mutateEmployee({ ...val, department_id: Number(val?.department_id) });
    }
  };

  const onCustomEmployeeChangeHandler = (e: any, field: any) => {
    const { id, value } = e.target;
    setCustomEmployee((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    field.onChange(value);
  }


  useEffect(() => {
    if (employeeData && type == "Edit") {
      reset({
        name: employeeData?.name,
      });
    }
  }, [employeeData]);


  return (
    <Dialog open={open} onClose={() => {
      onClose();
      reset(defaultCustomEmployee);
    }} maxWidth="xs" fullWidth PaperProps={{
      style: { borderRadius: 22 }
    }}>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="text-center">
            <p className="text-xl font-semibold">{type == "Edit" ? "Edit Employee" : "Create new Employee"}</p>
            <p className="text-sm text-muted-foreground">
              Fill out this form to {type == "Edit" ? "Edit Employee" : "Create new Employee"}
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          <form
            onSubmit={handleEmployeeSubmit(onEmployeeSubmitHandler)}
            className="flex flex-col w-full gap-5"
          >
            <div className="grid gap-1">
              <Controller
                name="name"
                control={customEmployeeControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    type={"text"}
                    handleAdvanceChange={(e: any) => onCustomEmployeeChangeHandler(e, field)}
                    label="Name"
                  />
                )}
              />
              {CustomEmployeeErrors.name && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomEmployeeErrors.name.message}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <Controller
                name="crm_role"
                control={customEmployeeControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    handleAdvanceChange={(e: any) => onCustomEmployeeChangeHandler(e, field)}
                    type={"text"}
                    label="Role"
                  />
                )}
              />
              {CustomEmployeeErrors.crm_role && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomEmployeeErrors.crm_role.message}
                </p>
              )}
            </div>

            <div className="grid gap-1  ">
              {/* Department Dropdown */}
              <label>Deparment</label>
              <Controller
                name="department_id"
                control={customEmployeeControl}
                render={({ field }) => (
                  <select
                    {...field}
                    className="bg-primary/50 border-none p-5 rounded-[18px]"
                  >
                    <option value="" disabled>
                      {isLoadingDepartments
                        ? "Loading Departments..."
                        : "Select Department"}
                    </option>
                    {departmentData?.data?.data?.map((dept: any) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                )}
              />
              {CustomEmployeeErrors.department_id && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomEmployeeErrors.department_id.message}
                </p>
              )}

              {/* <Controller
                name="department_id"
                control={customEmployeeControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    handleAdvanceChange={(e: any) => onCustomEmployeeChangeHandler(e, field)}
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    type={"text"}
                    label="Department"
                  />
                )}
              />
              {CustomEmployeeErrors.department_id && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomEmployeeErrors.department_id.message}
                </p>
              )} */}
            </div>

            <div className="grid gap-1  ">
              <Controller
                name="email"
                control={customEmployeeControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    handleAdvanceChange={(e: any) => onCustomEmployeeChangeHandler(e, field)}
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    type={"text"}
                    label="Email"
                  />
                )}
              />
              {CustomEmployeeErrors.email && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomEmployeeErrors.email.message}
                </p>
              )}
            </div>

            <div className="grid gap-1  ">
              <Controller
                name="password"
                control={customEmployeeControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    handleAdvanceChange={(e: any) => onCustomEmployeeChangeHandler(e, field)}
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    type={"text"}
                    label="Password"
                  />
                )}
              />
              {CustomEmployeeErrors.password && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomEmployeeErrors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-end ">
              <Button
                disabled={isPendingEmployee || isPending}
                className=" bg-[#002EF6] rounded-[18px] px-10 py-2 hover:bg-blue-700 text-white"
                type="submit"
              >
                {isPendingEmployee || isPending ? "Loading" : type == "Edit" ? "Edit" : "Create"}
              </Button>
            </div>

          </form>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;

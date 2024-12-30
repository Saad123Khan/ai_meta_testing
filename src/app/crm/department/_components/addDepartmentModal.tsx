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

interface departmentData {
  name: string;
}

const AddDepartmentModal = ({
  open,
  onClose,
  refetch,
  type,
  departmentData,
  setType
}: {
  open: boolean;
  onClose: () => void;
  refetch: any;
  type?: any;
  departmentData?: any;
  setType: any;
}) => {
  const handleSubmit = () => {
    onClose();
  };
  console.log(departmentData, "departmentDatadepartmentData")
  const [customDepartment, setCustomDepartment] = useState<departmentData>({
    name: "",
  });

  const departmentSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });

  const defaultCustomDepartment: departmentData = {
    name: "",
  };

  const {
    control: customDepartmentControl,
    handleSubmit: handleDepartmentSubmit,
    formState: { errors: CustomDepartmentErrors },
    reset,
  } = useForm<departmentData>({
    defaultValues: defaultCustomDepartment,
    mode: "onBlur",
    resolver: yupResolver(departmentSchema),
  });


  const { mutate: mutateDepartment, isPending: isPendingDepartment }: any = useMutation(
    {
      mutationFn: apis.createDepartment,
      onSuccess: ({
        data,
      }: {
        data: { success: boolean; message: string };
      }) => {
        if (data?.success) {
          reset(defaultCustomDepartment);
          setType("Create")
          swalPopUp("Department", "Department Created Successfully", "success");
          onClose();
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

  const { mutate: mutateEditDepartment, isPending }: any = useMutation(
    {
      mutationFn: (data: any) => apis.editDepartment(departmentData?.id, data),
      onSuccess: ({
        data,
      }: {
        data: { success: boolean; message: string };
      }) => {
        if (data?.success) {
          reset(defaultCustomDepartment);
          setType("Create")
          swalPopUp("Department", "Department Update Successfully", "success");
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

  const onDepartmentSubmitHandler = (val: any) => {
    // onClose();
    if (type == "Edit") {
      mutateEditDepartment({ ...val, department_id: val?.department_id ? Number(val?.department_id) : departmentData?.id })
    } else {
      mutateDepartment({ ...val, department_id: Number(val?.department_id) });
    }
  };

  const onCustomDepartmentChangeHandler = (e: any, field: any) => {
    const { id, value } = e.target;
    setCustomDepartment((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    field.onChange(value);
  }

  useEffect(() => {
    if (departmentData && type == "Edit") {
      reset({
        name: departmentData?.name,
      });
    }
  }, [departmentData]);

  return (
    <Dialog open={open} onClose={() => {
      onClose()
      reset(defaultCustomDepartment);
    }} maxWidth="xs" fullWidth PaperProps={{
      style: { borderRadius: 22 }
    }}>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="text-center">
            <p className="text-xl font-semibold">{type == "Edit" ? "Edit Department" : "Create new Department"}</p>
            <p className="text-sm text-muted-foreground">
              Fill out this form to {type == "Edit" ? "Edit Department" : "Create new Department"}
            </p>
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          <form
            onSubmit={handleDepartmentSubmit(onDepartmentSubmitHandler)}
            className="flex flex-col w-full gap-5"
          >
            <div className="grid gap-1">
              <Controller
                name="name"
                control={customDepartmentControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    type={"text"}
                    handleAdvanceChange={(e: any) => onCustomDepartmentChangeHandler(e, field)}
                    label="Name"
                  />
                )}
              />
              {CustomDepartmentErrors.name && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomDepartmentErrors.name.message}
                </p>
              )}
            </div>

            <div className="flex justify-end ">
              <Button
                disabled={isPendingDepartment || isPending}
                className=" bg-[#002EF6] rounded-[18px] px-10 py-2 hover:bg-blue-700 text-white"
                type="submit"
              >
                {isPendingDepartment || isPending ? "Loading" : type == "Edit" ? "Edit" : "Create"}
              </Button>
            </div>

          </form>
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default AddDepartmentModal;

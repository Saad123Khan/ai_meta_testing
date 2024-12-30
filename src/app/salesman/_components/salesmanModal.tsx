import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DialogHeader } from "@/components/ui/dialog";
import CustomInputField from "@/components/customInputField";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { yupResolver } from "@hookform/resolvers/yup";
import apis from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as yup from "yup";
import { swalPopUp } from "@/lib/helper";
import { Controller, useForm } from "react-hook-form";

interface SalesmanData {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
}

const SalesmanModal = ({
  open,
  onClose,
  refetch,
  type,
  salesmanData,
}: {
  open: boolean;
  onClose: () => void;
  refetch: any;
  type?: string;
  salesmanData?: any;
}) => {
  const [data, setData] = useState<SalesmanData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const salesmanSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
    password_confirmation: yup
      .string()
      .min(8)
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Password Confirm is required"),
  });
  const salesmanEditSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string(),
    // required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match"),
    // .required("Password Confirm is required"),
  });

  const defaultData: SalesmanData = {
    name: salesmanData?.name ? salesmanData?.name : "",
    email: salesmanData?.email ? salesmanData?.email : "",
    password: "",
    password_confirmation: "",
  };

  const {
    control: customCardControl,
    handleSubmit: handleSalesmanSubmit,
    formState: { errors: CustomCardErrors },
  } = useForm<SalesmanData>({
    defaultValues: defaultData,
    mode: "onBlur",
    resolver: yupResolver(type == "Edit" ? salesmanEditSchema : salesmanSchema),
  });

  const { mutate: mutateCard, isPending }: any = useMutation({
    mutationFn: apis.createSalesman,
    onSuccess: ({ data }: { data: { success: boolean; message: string } }) => {
      if (data?.success) {
        refetch();
        onClose();
        swalPopUp("Salesman", "Salesman Created Successfully", "success");
      }
    },
    onError: (error: any) => {
      console.log(error.response.data.errors, "error.response.data.errors");
      if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([key, messages]: any) => `${messages.join(", ")}`)
          .join("\n");
        console.log(errorMessages, "errorMessages");
        swalPopUp("Error", errorMessages, "error");
      } else if (error.response?.data?.message) {
        swalPopUp("Error", "", error.response.data.message);
      } else {
        swalPopUp("Error", "", error.message || "An unknown error occurred.");
      }
    },
  });

  const { mutate: mutateCardEdit, isPending: isPendingEdit }: any = useMutation(
    {
      mutationFn: (data: any) => apis.editSalesman(salesmanData?.id, data),
      onSuccess: ({
        data,
      }: {
        data: { success: boolean; message: string };
      }) => {
        if (data?.success) {
          swalPopUp("Salesman", "Salesman Update Successfully", "success");
          onClose();
          refetch();
        }
      },
      onError: (error: any) => {
        console.log(error.response.data.errors, "error.response.data.errors");
        if (error.response?.data?.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([key, messages]: any) => `${messages.join(", ")}`)
            .join("\n");
          console.log(errorMessages, "errorMessages");
          swalPopUp("Error", errorMessages, "error");
        } else if (error.response?.data?.message) {
          swalPopUp("Error", "", error.response.data.message);
        } else {
          swalPopUp("Error", "", error.message || "An unknown error occurred.");
        }
      },
    }
  );

  const onSubmitHandler = (val: any) => {
    if (type === "Edit") {
      mutateCardEdit(val);
    } else {
      mutateCard(val);
    }
  };

  const onChangeHandler = (e: any, field: any) => {
    const { id, value } = e.target;
    // Custom logic, if needed
    setData((prevState: any) => ({
      ...prevState,
      [id]: value,
    }));

    // Call field.onChange to ensure React Hook Form handles the state
    field.onChange(value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: { borderRadius: 22 },
      }}
    >
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle className="text-center">
            <p className="text-xl font-semibold">
              {type ? "Edit Salesman" : "Create New Salesman"}
            </p>
            <p className="text-sm text-muted-foreground">
              Fill out this form to{" "}
              {type ? "Edit salesman" : "Create New salesman"}
            </p>
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSalesmanSubmit(onSubmitHandler)}
          className="flex flex-col w-full gap-5"
        >
          <div className="grid gap-4 py-4">
            <div className="grid gap-1">
              <Controller
                name="name"
                control={customCardControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    label="Name"
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    type={"text"}
                    placeholder={"Enter name"}
                    // required
                    handleAdvanceChange={(e: any) => onChangeHandler(e, field)}
                  />
                )}
              />
              {CustomCardErrors.name && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomCardErrors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-1">
              <Controller
                name="email"
                control={customCardControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    label="Email"
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    type={"text"}
                    placeholder={"Enter email"}
                    // required
                    handleAdvanceChange={(e: any) => onChangeHandler(e, field)}
                  />
                )}
              />
              {CustomCardErrors.email && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomCardErrors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-1  ">
              <Controller
                name="password"
                control={customCardControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    label="Password"
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    type={"text"}
                    placeholder={"Enter password"}
                    // required
                    handleAdvanceChange={(e: any) => onChangeHandler(e, field)}
                  />
                )}
              />
              {CustomCardErrors.password && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomCardErrors.password.message}
                </p>
              )}
            </div>
            <div className="grid gap-1  ">
              <Controller
                name="password_confirmation"
                control={customCardControl}
                render={({ field }: any) => (
                  <CustomInputField
                    {...field}
                    label="Password Confirmation"
                    css={"bg-primary/50 border-none p-5 rounded-[18px]"}
                    type={"text"}
                    placeholder={"Enter password confirmation"}
                    // required
                    handleAdvanceChange={(e: any) => onChangeHandler(e, field)}
                  />
                )}
              />
              {CustomCardErrors.password_confirmation && (
                <p className="text-red-500 text-[12px] ml-2">
                  {CustomCardErrors.password_confirmation.message}
                </p>
              )}
            </div>
            {/* <div className="grid gap-1  ">
            <p className="text-[14px]">Manage your accounts</p>
            <RadioGroup defaultValue="comfortable" className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Folder 1" id="r1" />
                <Label htmlFor="r1">Yes</Label>
              </div>
              <div className="flex items-center space-x-2 ml-2">
                <RadioGroupItem value="Folder 2" id="r2" />
                <Label htmlFor="r2">No </Label>
              </div>
            </RadioGroup>
          </div> */}
          </div>
          {/* button */}
          <div className="flex justify-end ">
            <Button
              disabled={isPending || isPendingEdit}
              className=" bg-[#002EF6] rounded-[18px] px-10 py-2 hover:bg-blue-700 text-white"
              type="submit"
            >
              {isPending || isPendingEdit
                ? "Loading"
                : type == "Edit"
                ? type
                : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SalesmanModal;

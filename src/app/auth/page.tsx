"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { swalPopUp } from "@/lib/helper";
import StartupLoader from "@/components/startupLoader";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import apis from "@/services";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import CustomModal from "@/components/customModal";
import SimpleOnboarding from "@/components/animationLoader";
import { setUser } from "@/store/slices/userSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Head from "next/head";

// Define types for form data
interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  name: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export default function Auth() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("login");
  const [loaderModal, setLoaderModal] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [signupFormData, setSignupFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });
  let { user } = useSelector((store: any) => store.user);

  const router = useRouter();
  let dispatch = useAppDispatch();
  const loginSchema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().min(8).required("Password is required"),
  });

  const signupSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    gender: yup.string().required("Gender is required"),
    phone: yup.string().required("Phone is required"),
    password: yup.string().min(8).required("Password is required"),
    password_confirmation: yup
      .string()
      .min(8)
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Password Confirm is required"),
  });

  const defaultLoginValues: LoginFormData = {
    password: "",
    email: "",
  };
  const defaultSignupValues: SignupFormData = {
    name: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    password_confirmation: "",
  };

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: defaultLoginValues,
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  const {
    control: signupControl,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    watch,
  } = useForm<SignupFormData>({
    defaultValues: defaultSignupValues,
    mode: "onBlur",
    resolver: yupResolver(signupSchema),
  });

  const { mutate, isPending }: any = useMutation({
    mutationFn: apis.authLogin,
    onSuccess: ({
      data,
    }: {
      data: { success: boolean; message: string; data: any };
    }) => {
      if (data?.success) {
        localStorage.setItem("authToken", data?.data?.token);
        swalPopUp("Login Successfully", "Login Successfully", "success");

        dispatch(setUser(data?.data?.user));
        if (data?.data?.user.role == "Super Admin") {
          router.push("/superAdmin/dashboard");
        } else {
          if (data?.data?.user?.active_subscription == true) {
            router.push("/home");
          } else {
            router.push("/plansAndPricing");
          }
        }
      }
    },
    onError: (error: any) => {
      console.log(error.response.data.errors,"error.response.data.errors")
      if (error.response?.data?.errors) {
        const errorMessages = Object.entries(error.response.data.errors)
          .map(([key, messages]:any) => `${messages.join(", ")}`)
          .join("\n");
          console.log(errorMessages,"errorMessages")
         swalPopUp("Error", errorMessages, "error");
      } else if (error.response?.data?.message) {
        swalPopUp("Error", "", error.response.data.message);
      } else {
        swalPopUp("Error", "", error.message || "An unknown error occurred.");
      }
    },
  });

  const email = watch("email");

  const { mutate: mutateSignup, isPending: isPendingSignUp }: any = useMutation(
    {
      mutationFn: apis.authRegister,
      onSuccess: ({
        data,
      }: {
        data: { success: boolean; message: string };
      }) => {
        if (data?.success) {
          swalPopUp("Signup Successfully", "Signup Successfully", "success");

          // const staticEmail = "malikabdullahmalik14@gmail.com";
          // router.push(`/auth`);
          // router.push(`/verify-otp/${email}`);
          setActiveTab("login");
        }
      },
      onError: (error: any) => {
        console.log(error.response.data.errors,"error.response.data.errors")
        if (error.response?.data?.errors) {
          const errorMessages = Object.entries(error.response.data.errors)
            .map(([key, messages]:any) => `${messages.join(", ")}`)
            .join("\n");
            console.log(errorMessages,"errorMessages")
           swalPopUp("Error", errorMessages, "error");
        } else if (error.response?.data?.message) {
          swalPopUp("Error", "", error.response.data.message);
        } else {
          swalPopUp("Error", "", error.message || "An unknown error occurred.");
        }
      },
    }
  );

  const onSubmitHandler = async (val: any) => {
    mutate(val);
  };

  const onSignupSubmitHandler = (val: any) => {
    mutateSignup(val);
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const { id, value } = e.target;
    // Custom logic, if needed
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Call field.onChange to ensure React Hook Form handles the state
    field.onChange(value);
  };

  const onSignupChangeHandler = (e: any, field: any) => {
    const { id, value } = e.target;
    // Custom logic, if needed
    setSignupFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    // Call field.onChange to ensure React Hook Form handles the state
    field.onChange(value);
  };

  console.log(user, "useruseruseruseruser");
  useEffect(() => {
    if (user && user?.active_subscription == true) {
      // return router.push("/home");
    } else if (user && user?.active_subscription == false) {
      // return router.push("/plansAndPricing");
    } else {
      let email = localStorage.getItem("email");
      let password = localStorage.getItem("password");

      if (email && password) {
        setFormData({ email, password });
      }
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>AI</title>
        <meta property="og:title" content="Majai" />
        <meta property="og:description" content="AI marketing" />
        <meta
          property="og:image:secure"
          content="https://app.majai.se/assets/logo.webp"
        />
        <meta
          property="og:image"
          content="https://app.majai.se/assets/logo.webp"
        />
        <meta property="og:url" content="https://majai.se" />
        <meta property="og:type" content="website" />
      </Head>
      {loading ? (
        <StartupLoader onFinish={() => setLoading(false)} />
      ) : (
        <div className="flex min-h-screen bg-primary-color overflow-hidden">
          <div className="flex-1 p-8 flex items-center justify-center">
            <div className="w-full max-w-md">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-transparent">
                  <TabsTrigger
                    value="login"
                    className="relative text-[30px] leading-none !shadow-none data-[state=active]:text-primary data-[state=active]:underline  data-[state=active]:underline-offset-8 data-[state=active]:font-bold data-[state=inactive]:text-[#C8D5D2]"
                  >
                    Login
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="relative text-[30px] leading-none !shadow-none data-[state=active]:text-primary data-[state=active]:underline data-[state=active]:underline-offset-8 data-[state=active]:font-bold data-[state=inactive]:text-[#C8D5D2]"
                  >
                    Sign up
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                  <form
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmitHandler)}
                    // onSubmit={onSubmitHandler}
                    className="space-y-4"
                  >
                    <div>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="email"
                            className="rounded-[22px] p-5 shadow-sm"
                            type="email"
                            placeholder="example@gmail.com"
                            required
                            onChange={(e) => onChangeHandler(e, field)} // Pass the `field` object here
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[12px] ml-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="relative">
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="****"
                            required
                            className="rounded-[22px] p-5 shadow-sm"
                            onChange={(e) => onChangeHandler(e, field)} // Pass the `field` object here
                          />
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                      {errors.password && (
                        <p className="text-red-500 text-[12px] ml-2">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <p
                        className="text-primary text-[12px] font-semibold cursor-pointer "
                        onClick={() => router.push("/forgotPassword")}
                      >
                        Forgot Password?
                      </p>
                    </div>
                    <Button
                      type="submit"
                      className="w-full text-primary-color"
                      disabled={isPending}
                    >
                      {isPending ? "Loading" : "Login"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form
                    onSubmit={handleSignupSubmit(onSignupSubmitHandler)}
                    className="space-y-4"
                  >
                    <div>
                      <Controller
                        name="name"
                        control={signupControl}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="name"
                            className="rounded-[22px] p-5 shadow-sm"
                            type="text"
                            placeholder="Enter Name"
                            required
                            onChange={(e) => onSignupChangeHandler(e, field)}
                          />
                        )}
                      />
                      {signupErrors.name && (
                        <p className="text-red-500 text-[12px] ml-2">
                          {signupErrors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Controller
                        name="email"
                        control={signupControl}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="email"
                            className="rounded-[22px] p-5 shadow-sm"
                            type="email"
                            placeholder="Enter Email"
                            required
                            onChange={(e) => onSignupChangeHandler(e, field)}
                          />
                        )}
                      />
                      {signupErrors.email && (
                        <p className="text-red-500 text-[12px] ml-2">
                          {signupErrors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Controller
                        name="gender"
                        control={signupControl}
                        render={({ field }) => (
                          <>
                            <Select
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <SelectTrigger className="bg-[#ffff] text-[#6B7280]  active:border-none focus:border-none rounded-[22px] p-5">
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                              <SelectContent className="z-[1400]">
                                <SelectGroup>
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {/* <select
                              {...field}
                              id="gender"
                              className="rounded-[22px] p-5 shadow-sm"
                              required
                              onChange={(e) => onSignupChangeHandler(e, field)}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select> */}
                          </>
                        )}
                      />
                      {signupErrors.gender && (
                        <p className="text-red-500 text-[12px] ml-2">
                          {signupErrors.gender.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Controller
                        name="phone"
                        control={signupControl}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="phone"
                            className="rounded-[22px] p-5 shadow-sm"
                            type="tel"
                            placeholder="Phone Number"
                            required
                            onChange={(e) => onSignupChangeHandler(e, field)}
                          />
                        )}
                      />
                      {signupErrors.phone && (
                        <p className="text-red-500 text-[12px] ml-2">
                          {signupErrors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Controller
                        name="password"
                        control={signupControl}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            required
                            className="rounded-[22px] p-5 shadow-sm"
                            onChange={(e) => onSignupChangeHandler(e, field)}
                          />
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>

                    <div className="relative">
                      <Controller
                        name="password_confirmation"
                        control={signupControl}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="password_confirmation"
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            required
                            className="rounded-[22px] p-5 shadow-sm"
                            onChange={(e) => onSignupChangeHandler(e, field)}
                          />
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4 text-gray-500" />
                        )}
                      </button>
                    </div>

                    <Button
                      type="submit"
                      disabled={isPendingSignUp}
                      className="w-full text-primary-color"
                    >
                      {isPendingSignUp ? "Loading" : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          {/* <div className="hidden lg:block w-1/3 relative">
            <Image
              src="/assets/loginbg.png"
              alt="Decorative image"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <Image
              src={"/assets/loginug.png"}
              alt="Decorative image"
              fill
              className="absolute left-2"
              priority
            />
          </div> */}
          {/* Right Image Section with Transition */}
          <div className="hidden lg:block w-1/3 relative">
            <Image
              src="/assets/loginbg.png"
              alt="Decorative background"
              fill
              style={{ objectFit: "cover" }}
              priority
            />

            {/* Login Image that moves with the tab switch */}
            <Image
              src="/assets/loginug.png"
              alt="Login illustration"
              width={500}
              height={500}
              style={{
                top: "20%",
                left: "-10%",
              }}
              className={`absolute  transition-transform duration-200 ${
                activeTab === "login"
                  ? "translate-x-0 translate-y-0"
                  : "translate-x-[100%] translate-y-[100%]"
              }`}
              priority
            />
            {/* Signup Image that moves with the tab switch */}
            <Image
              src="/assets/loginug.png"
              alt="Login illustration"
              width={500}
              height={500}
              style={{
                top: "20%",
                left: "-10%",
              }}
              className={`absolute  transition-transform duration-200 ${
                activeTab === "signup"
                  ? "translate-x-0 translate-y-0"
                  : "translate-x-[100%] translate-y-[-90%]"
              }`}
              priority
            />
          </div>
        </div>
      )}

      <CustomModal
        open={loaderModal}
        onOpenChange={setLoaderModal}
        modalHeader={<SimpleOnboarding />}
      />
    </>
  );
}

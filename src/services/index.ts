import { ProjectData } from "@/types/project";
import axios, { AxiosInstance, AxiosResponse } from "axios";

// Define types for request body and response data
interface LoginBody {
  username: string;
  password: string;
}

interface RegisterBody {
  name: string;
  email: string;
  gender: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface forgotBody {
  email: string;
}

interface otpBody {
  otp: string;
  email: string;
}

interface otpResendBody {
  email: any;
}

interface resetBody {
  password: string;
  password_confirmation: string;
  email: string;
}

interface cancelSubscriptionBody {
  userId: number;
}

interface createSubscriptionCard {
  name: string;
  price: string;
  details: string;
  type: string;
  period: string;
}

interface editSalesman {
  name: string;
  price: string;
  details: string;
  type: string;
  period: string;
}

interface createEmployeeData {
  name: string;
  email: string;
  password: string;
  department_id: string;
  crm_role: string;
}

interface createDepartmentData {
  name: string;
}


interface createDemoUser {
  name: string;
  password: string;
  email: string;
  plan_id: string;
}


// interface AuthResponse {
//   token: string;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }

// Define the structure of the API methods
// interface API {
//   authLogin: (body: LoginBody) => Promise<AxiosResponse>;
//   authRegister: (body: RegisterBody) => Promise<AxiosResponse>;
//   forgot: (body: forgotBody) => Promise<AxiosResponse>;
//   otp: (body: otpBody) => Promise<AxiosResponse>;
//   otpResend: (body: otpResendBody) => Promise<AxiosResponse>;
//   resetPassword: (body: resetBody) => Promise<AxiosResponse>;
// }

// Create the backend server function
const createBackendServer = (baseURL: string) => {
  const api: AxiosInstance = axios.create({
    baseURL: `${baseURL}`,
    withCredentials: false,
    headers: {
      Accept: "application/json",
    },
    timeout: 60 * 5000, // 60 seconds timeout
  });

  // Request interceptor to add Authorization header with token if it exists in localStorage
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Set Authorization header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor to handle responses and errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error?.response?.data?.message;
      error.message = message ?? error.message;

      if (error?.response?.data?.errors) {
        error.errors = error?.response?.data?.errors;
      }

      if (error?.response?.status === 401) {
        // Handle unauthorized error (e.g., redirect to logout page)
        // window.location.href = "/logout";
      }

      return Promise.reject(error);
    }
  );

  // Auth login API
  const authLogin = async (body: LoginBody) => {
    return api.post("/api/auth/login", body);
  };

  // Auth register API
  const authRegister = async (body: RegisterBody) => {
    return api.post("/api/auth/register", body);
  };

  // Auth Forget API
  const forgot = async (body: forgotBody) => {
    return api.post("/api/auth/forgot-password", body);
  };

  // Auth OTP API
  const otp = async (
    body: otpBody
  ): Promise<{ success: boolean; message: string }> => {
    return api.post("/api/auth/verify-otp", body);
  };

  // Auth ResendOTP API
  const otpResend = async (body: otpResendBody): Promise<AxiosResponse> => {
    return api.post(`/api/auth/otp/resend`, { email: body.email });
  };

  // Auth OTP API
  const resetPassword = async (body: resetBody) => {
    return api.post("/api/auth/reset-password", body);
  };

  // New API: Get subscription packages
  const getSubscriptionPackages = async () => {
    return api.get("/api/customer/subscription-packages"); // New GET request
  };

  // New API: Cancel subscription packages
  const CancelSubscription = async (body: cancelSubscriptionBody) => {
    return api.post("/api/customer/subscription-packages/cancel", body);
  };

  // New API: Cancel subscription packages
  const activeSubscription = async (body: cancelSubscriptionBody) => {
    return api.post("/api/customer/subscription-packages/active", body);
  };

  // Auth OTP API
  const checkoutPlan = async (body: resetBody) => {
    return api.post("/api/customer/subscription-packages/checkout", body);
  };

  // Get Platform list
  const getPlatformConnections = async (brandId: number) => {
    return api.get(
      `/api/customer/platform-connections/list?brand_id=${brandId}`
    );
  };

  // Disconnect platform
  const disconnectPlatform = async (connectionId: number) => {
    return api.delete(`/api/customer/platform-connections/${connectionId}`, {
      method: "DELETE",
    });
  };

  // Connect platform
  const connectPlatform = async (payload: {
    brand_id: number;
    platform: string;
  }) => {
    return api.post("/api/customer/platform-connections/connect", payload);
  };

  // Brand List API
  const getBrandLists = async (data: object): Promise<AxiosResponse> => {
    return api.get(`/api/customer/brands`, { params: data });
  };

  // Country List API
  const getCountryLists = async (): Promise<AxiosResponse> => {
    return api.get(`https://trial.mobiscroll.com/content/countries.json`);
  };

  // Create a new project
  const createProject = async (projectData: object): Promise<AxiosResponse> => {
    return api.post(`/api/customer/projects`, projectData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  // Update an existing project
  const updateProject = async (
    projectId: number,
    projectData: object
  ): Promise<AxiosResponse> => {
    return api.put(`/api/customer/projects/${projectId}`, projectData, {
      headers: {
        "X-HTTP-Method-Override": "PUT",
      },
    });
  };

  // Fetch a project by its ID
  const fetchProjectById = async (
    projectId: number
  ): Promise<AxiosResponse> => {
    return api.get(`/api/customer/projects/${projectId}`);
  };

  // Facebook Option Static
  const facebookStaticOptions = async (
    data?: object
  ): Promise<AxiosResponse> => {
    return api.get(`/api/customer/facebook/ad-options/static`, {
      params: data,
    });
  };

  // Facebook Option Interest
  const facebookInterestOptions = async (
    data: object
  ): Promise<AxiosResponse> => {
    return api.get(`/api/customer/facebook/ad-options/interests`, {
      params: data,
    });
  };

  // Facebook Option Location
  const facebookLocationsOptions = async (
    data: object
  ): Promise<AxiosResponse> => {
    return api.get(`/api/customer/facebook/ad-options/locations`, {
      params: data,
    });
  };

  const getCampaignList = async (
    brand_id: number,
    data: object
  ): Promise<AxiosResponse> => {
    return api.get(`/api/customer/facebook/insights/${brand_id}/campaigns`, {
      params: data,
    });
  };

  const getCampaignAds = async (
    brand_id: number,
    data: object
  ): Promise<AxiosResponse> => {
    return api.get(
      `/api/customer/facebook/insights/${brand_id}/campaigns-ads`,
      { params: data }
    );
  };

  const fetchAdImages = async (data: object): Promise<AxiosResponse> => {
    return api.get(`/api/customer/facebook/fetch-ad-image-previews`, {
      params: data,
    });
  };

  const fetchAllAds = async (data: object): Promise<AxiosResponse> => {
    return api.get(`/api/customer/facebook/all-ads`, { params: data });
  };

  // forecast method
  const getForecast = async (body: object): Promise<AxiosResponse> => {
    return api.get(`/api/customer/facebook/forecast`, { params: body });
  };

  // forecast method
  const editAd = async (id: number, body: object): Promise<AxiosResponse> => {
    return api.get(`/api/customer/facebook/direct/${id}`, { params: body });
  };

  // manage your data post method
  const manageMyData = async (body: object): Promise<AxiosResponse> => {
    return api.post(`api/customer/request-user-access`, body);
  };

  // manage your data post method
  const getPageInfo = async (brandId: number): Promise<AxiosResponse> => {
    return api.get(`api/customer/facebook/page-info?brand_id=${brandId}`);
  };

  // update brands
  const updateBrand = async (
    brandId: number,
    body: any
  ): Promise<AxiosResponse> => {
    return api.put(`api/customer/brands/${brandId}`, body);
  };

  // Brand List API
  // const getBrandLists = async (data: object): Promise<AxiosResponse> => {
  //   return api.get(`/api/customer/brands`, { params: data });
  // };
  const facebookProxy = async (
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    params?: object,
    body?: object
  ): Promise<AxiosResponse> => {
    const config = {
      method,
      url: `/api/customer/facebook/direct/${path}`,
      params,
      data: body,
    };

    return api.request(config);
  };


  // get employee
  const getEmployee = async (): Promise<AxiosResponse> => {
    return api.get(`api/customer/crm/employees`);
  };

  // get department
  const getEmployeeDepartment = async (): Promise<AxiosResponse> => {
    return api.get(`api/customer/crm/departments`);
  };

  // create department
  const createDepartment = async (body: createDepartmentData) => {
    return api.post(`/api/customer/crm/departments`, body);
  };

  // edit department
  const editDepartment = async (id: any, body: createDepartmentData) => {
    return api.put(`/api/customer/crm/departments/${id}`, body);
  };

  // edit employee
  const editEmployee = async (id: any, body: createEmployeeData) => {
    return api.put(`/api/customer/crm/employees/${id}`, body);
  };


  // create employee
  const createEmployees = async (body: createEmployeeData) => {
    return api.post(`/api/customer/crm/employees`, body);
  };

  const getStaffAttendance = async (): Promise<AxiosResponse> => {
    return api.get(`api/customer/crm/attendances`);
  };

  
  //SUPER ADMIN APIS
  
  
  // get subscription
  const getSubscription = async (): Promise<AxiosResponse> => {
    return api.get(`api/admin/subscription-packages`);
  };

  // get subscription stats
  const getSubscriptionStats = async (): Promise<AxiosResponse> => {
    return api.get(`api/admin/subscriptions/dashboard`);
  };
  
  // get user subscription
  const getUserSubscriptions = async (): Promise<AxiosResponse> => {
    return api.get(`api/admin/subscriptions`);
  };
  
  // Create a subscription package new project
  const createSubscriptionPackage = async (body: createSubscriptionCard) => {
    return api.post(`/api/admin/subscription-packages`, body);
  };
  
  // Get all salesman
  const getSalesmans = async (): Promise<AxiosResponse> => {
    return api.get(`api/admin/salesman`);
  };
  
  // Create a salesman
  const createSalesman = async (body: createSubscriptionCard) => {
    return api.post(`/api/admin/salesman`, body);
  };
  
  const editSalesman = async (id: number, body: editSalesman) => {
    return api.put(`/api/admin/salesman/${id}`, body);
  };
  
  // Get all users
  const getUsers = async (): Promise<AxiosResponse> => {
    return api.get(`api/admin/users`);
  };
  
  // Create demo account
  const createDemoAccount = async (body: createDemoUser) => {
    return api.post(`/api/admin/subscriptions/demo-account`, body);
  };
  
  // delete salesman
  const deleteSalesman = async (connectionId: number) => {
    return api.delete(`/api/admin/salesman/${connectionId}`, {
      method: "DELETE",
    });
  };

  // Returning all the API functions
  return {
    deleteSalesman,
    createDemoAccount,
    getSubscriptionStats,
    getUserSubscriptions,
    getStaffAttendance,
    editEmployee,
    editSalesman,
    getUsers,
    getSalesmans,
    createSalesman,
    editDepartment,
    createDepartment,
    getEmployeeDepartment,
    createEmployees,
    getEmployee,
    createSubscriptionPackage,
    getSubscription,
    checkoutPlan,
    authLogin,
    authRegister,
    forgot,
    otp,
    otpResend,
    resetPassword,
    getSubscriptionPackages,
    getPlatformConnections,
    disconnectPlatform,
    connectPlatform,
    createProject,
    updateProject,
    fetchProjectById,
    getBrandLists,
    facebookStaticOptions,
    facebookInterestOptions,
    getCampaignList,
    getCampaignAds,
    fetchAdImages,
    fetchAllAds,
    getForecast,
    editAd,
    manageMyData,
    CancelSubscription,
    activeSubscription,
    getCountryLists,
    facebookProxy,
    getPageInfo,
    updateBrand,
  };
};

// Create the API instance
const apis = createBackendServer(process.env.NEXT_PUBLIC_SERVER_URL as string);

export default apis;

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { api } from "../../../api/api";
import { useNavigate } from "react-router";
import { useToast } from "../../../hooks/use-toast";

// Zod validation schema
const organizationSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(500, { message: "Description cannot exceed 500 characters" }),
  type: z.enum(["hospital", "ngo", "research", "other"], {
    required_error: "Please select an organization type",
  }),
  website: z
    .union([z.string().url({ message: "Invalid website URL" }), z.literal("")])
    .optional()
    .transform((value) => value || undefined),
});

type OrganizationSignupData = z.infer<typeof organizationSchema>;

export default function OrganizationSignup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OrganizationSignupData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      description: "",
      type: undefined,
      website: "",
    },
  });

  const onSubmit = async (data: OrganizationSignupData) => {
    try {
      const response = await api.post("/organizations/register", data);
      if (response.status === 200) {
        toast({
          title: "Registration Successful",
          description: "You have successfully registered as an organization.",
          variant: "success",
          duration: 2000,
        });
        navigate("/organisation/login");
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description:
          error.response?.statusText ||
          "An error occurred during registration. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light-bg dark:bg-dark-bg dark:text-dark-text">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            Organization Signup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Organization Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Organization Name
              </label>
              <input
                {...register("name")}
                className="w-full px-3 py-2 border rounded-md dark:bg-dark-bg dark:text-dark-text"
                placeholder="Enter organization name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-3 py-2 border rounded-md dark:bg-dark-bg dark:text-dark-text"
                placeholder="Enter email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full px-3 py-2 border rounded-md dark:bg-dark-bg dark:text-dark-text"
                placeholder="Enter password"
              />
              <p className="text-xs text-gray-500">
                Password must be at least 8 characters with uppercase,
                lowercase, and number
              </p>
              {errors.password && (
                <p className="text-red-500 text-xs">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Organization Type */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Organization Type
              </label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="ngo">NGO</SelectItem>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-red-500 text-xs">{errors.type.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Organization Description
              </label>
              <textarea
                {...register("description")}
                className="w-full px-3 py-2 border rounded-md resize-none dark:bg-dark-bg dark:text-dark-text"
                placeholder="Brief description of your organization"
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Website (Optional)
              </label>
              <input
                type="url"
                {...register("website")}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://www.yourorganization.com"
              />
              {errors.website && (
                <p className="text-red-500 text-xs">{errors.website.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
            >
              Register Organization
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

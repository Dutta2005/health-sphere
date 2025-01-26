import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { api } from '../../../api/api';
import { useToast } from '../../../hooks/use-toast';

// Zod validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" })
});

type LoginData = z.infer<typeof loginSchema>;

export default function OrganizationLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const response = await api.post('/organizations/login', data);
      
      if (response.status === 200) {
        toast({
          title: 'Login Successful',
          description: 'You have successfully logged in.',
          variant: 'success',
          duration: 2000
        });
        
        // Store tokens or user data if needed
        localStorage.setItem('organization', JSON.stringify(response.data.data.organization));
        
        navigate('/organisation');
      }
    } catch (error: any) {
      toast({
        title: 'Login Failed',
        description: error.response?.data?.message || 'An error occurred during login',
        variant: 'destructive',
        duration: 4000
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-light-bg">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            Organization Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input 
                type="email"
                {...register('email')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your email" 
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <input 
                type="password"
                {...register('password')}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter your password" 
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
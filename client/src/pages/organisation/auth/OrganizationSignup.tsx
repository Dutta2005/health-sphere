import { useState, forwardRef } from 'react';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../../../api/api';

import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";

// Zod Schema for Initial Registration
const InitialRegistrationSchema = z.object({
  name: z.string().min(2, { message: "Organization name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine(
      (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
      { message: "Password must include uppercase, lowercase, number, and special character" }
    )
});

// Zod Schema for Complete Registration
const CompleteRegistrationSchema = z.object({
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  type: z.enum(['hospital', 'ngo', 'research', 'other'], {
    errorMap: () => ({ message: "Please select a valid organization type" })
  }),
  website: z.string().url({ message: "Invalid website URL" }).optional().or(z.literal(''))
});

// Combined Types
type InitialRegistrationData = z.infer<typeof InitialRegistrationSchema>;
type CompleteRegistrationData = z.infer<typeof CompleteRegistrationSchema>;

const OrganizationSignup = forwardRef<HTMLDivElement>((props, ref) => {
  console.log(props);
  
  const [step, setStep] = useState<'initial' | 'complete'>('initial');
  const [orgId, setOrgId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register: registerInitial,
    handleSubmit: handleInitialSubmit,
    formState: { errors: initialErrors }
  } = useForm<InitialRegistrationData>({
    resolver: zodResolver(InitialRegistrationSchema)
  });

  const {
    control,
    register: registerComplete,
    handleSubmit: handleCompleteSubmit,
    formState: { errors: completeErrors }
  } = useForm<CompleteRegistrationData>({
    resolver: zodResolver(CompleteRegistrationSchema)
  });

  const onInitialSubmit = async (data: InitialRegistrationData) => {
    try {
      setError(null);
      const result = await api.post('/organizations/initial-register', data);
      
      if (result.status === 200) {
        setOrgId(result.data.orgId);
        setStep('complete');
      } else {
        setError(result.statusText);
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    }
  };

  const onCompleteSubmit = async (data: CompleteRegistrationData) => {
    try {
      setError(null);
      const completeData = {
        ...data,
        orgId: orgId
      };

      const result = await api.post('/organizations/complete-register', completeData);
      
      if (result.status === 200) {
        // Redirect or show success message
        console.log('Registration complete');
      } else {
        setError(result.statusText);
      }
    } catch (error) {
      console.log(error);
      
      setError('Complete registration failed. Please try again.');
    }
  };

  return (
    <div ref={ref} className="min-h-screen bg-light-bg flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          {step === 'initial' ? 'Initial Registration' : 'Complete Your Profile'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            {error}
          </div>
        )}

        {step === 'initial' && (
          <form onSubmit={handleInitialSubmit(onInitialSubmit)} className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Organization Name</Label>
              <Input 
                {...registerInitial('name')} 
                type="text" 
                id="name" 
                placeholder="Enter organization name" 
              />
              {initialErrors.name && (
                <p className="text-red-500 text-xs mt-1">{initialErrors.name.message}</p>
              )}
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                {...registerInitial('email')} 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
              />
              {initialErrors.email && (
                <p className="text-red-500 text-xs mt-1">{initialErrors.email.message}</p>
              )}
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input 
                {...registerInitial('password')} 
                type="password" 
                id="password" 
                placeholder="Enter password" 
              />
              {initialErrors.password && (
                <p className="text-red-500 text-xs mt-1">{initialErrors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">Continue Registration</Button>
          </form>
        )}

        {step === 'complete' && (
          <form onSubmit={handleCompleteSubmit(onCompleteSubmit)} className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Organization Description</Label>
              <Textarea 
                {...registerComplete('description')}
                id="description"
                placeholder="Describe your organization"
                rows={4}
              />
              {completeErrors.description && (
                <p className="text-red-500 text-xs mt-1">{completeErrors.description.message}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label>Organization Type</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <SelectTrigger>
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
              {completeErrors.type && (
                <p className="text-red-500 text-xs mt-1">{completeErrors.type.message}</p>
              )}
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input 
                {...registerComplete('website')} 
                type="text" 
                id="website" 
                placeholder="Enter website URL" 
              />
              {completeErrors.website && (
                <p className="text-red-500 text-xs mt-1">{completeErrors.website.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full">Complete Registration</Button>
          </form>
        )}
      </div>
    </div>
  );
});

export default OrganizationSignup;
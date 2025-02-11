import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const apiClient = axios.create();

// Add request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get user session
      const session = await fetch('/api/auth/session');
      const sessionData = await session.json();
      
      if (!sessionData?.user?.email) {
        throw new Error('User not authenticated');
      }

      // Deduct credit
      const deductResponse = await fetch('/api/credits/deduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: sessionData.user.email,
        }),
      });

      if (!deductResponse.ok) {
        const error = await deductResponse.text();
        throw new Error(error);
      }

      const { credits } = await deductResponse.json();
      
      // Show remaining credits toast
      toast({
        title: "Credits Updated",
        description: `Remaining credits: ${credits}`,
      });

      return config;
    } catch (error: any) {
      // Show error toast
      toast({
        title: "Credits Error",
        description: error.message === "Insufficient credits" 
          ? "You've run out of credits. Please upgrade your plan to continue."
          : "Failed to process request. Please try again.",
        variant: "destructive",
      });
      
      throw error;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient; 
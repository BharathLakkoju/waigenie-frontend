import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UserDetails {
  id: string;
  name: string;
  email: string;
  image: string | null;
  userType: string;
  credits: number;
  maxCredits: number;
  creditRefreshInterval: number;
  subscriptionEndDate: Date | null;
}

interface UserStore {
  userDetails: UserDetails | null;
  isLoading: boolean;
  setUserDetails: (details: UserDetails | null) => void;
  updateCredits: (credits: number) => void;
  fetchUserDetails: (email: string) => Promise<void>;
  checkAndResetCredits: (email: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  devtools(
    (set, get) => ({
      userDetails: null,
      isLoading: false,
      
      setUserDetails: (details) => set({ userDetails: details }),
      
      updateCredits: (credits) => 
        set((state) => ({
          userDetails: state.userDetails 
            ? { ...state.userDetails, credits } 
            : null
        })),

      fetchUserDetails: async (email) => {
        try {
          set({ isLoading: true });
          const response = await fetch('/api/user/details', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          if (response.ok) {
            const data = await response.json();
            set({ userDetails: data });
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      checkAndResetCredits: async (email) => {
        try {
          const response = await fetch('/api/credits/reset', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              // Update credits in store
              get().updateCredits(data.credits);
              // Refresh full user details
              await get().fetchUserDetails(email);
            }
          }
        } catch (error) {
          console.error("Error checking credit reset:", error);
        }
      },
    }),
    {
      name: 'user-store',
    }
  )
) 
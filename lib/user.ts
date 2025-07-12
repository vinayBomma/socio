// lib/supabase.ts (or a new file like lib/user.ts)
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setUser, clearUser } from '@/store/authSlice';
import supabase from './supabase';

export const useSupabaseUser = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        dispatch(setUser(data.session.user));
      } else {
        dispatch(clearUser());
      }
    };
    fetchUser();
  }, [dispatch]);
};
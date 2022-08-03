import create from 'zustand';
import { Session } from '@supabase/supabase-js';

type State = {
  session: Session | null;
  setSession: (payload: Session | null) => void;
  user: string | null;
  setUser: (payload: string | null) => void;
};
const useStore = create<State>((set) => ({
  session: null,
  setSession: (payload) => set({ session: payload }),
  user: '',
  setUser: (payload) => set({ user: payload }),
}));

export default useStore;

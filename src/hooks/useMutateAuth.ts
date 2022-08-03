import { useState } from 'react';
import { useMutation } from 'react-query';
import { supabase } from 'src/lib/supabase';
import useStore from 'src/store';

export const useMutateAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const setUser = useStore((state) => state.setUser);

  const reset = () => {
    setEmail('');
    setPassword('');
    setUser('');
  };

  const loginMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signIn({ email, password });
      if (error) throw new Error(error.message);
      setUser(email);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  const registerMutation = useMutation(
    async () => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw new Error(error.message);
    },
    {
      onError: (err: any) => {
        alert(err.message);
        reset();
      },
    }
  );

  return {
    email,
    setEmail,
    password,
    setPassword,
    loginMutation,
    registerMutation,
  };
};

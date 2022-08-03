import { useQueryClient } from 'react-query';
import { supabase } from 'src/lib/supabase';
import { CheckIn } from '@icon-park/react';

export const Sign = () => {
  const queryClient = useQueryClient();

  const signOut = () => {
    supabase.auth.signOut();
  };

  return (
    <div className="flex flex-wrap items-center justify-between bg-gray-50 p-6 shadow-md">
      <div className="mr-6 flex flex-1 items-center text-slate-900">
        <CheckIn
          data-testid="logout"
          className="my-6 h-6 w-6 cursor-pointer text-blue-500"
          onClick={signOut}
        />
      </div>
    </div>
  );
};

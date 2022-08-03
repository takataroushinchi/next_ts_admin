import { supabase } from 'src/lib/supabase';
import useStore from 'src/store';
import { Button } from 'src/lib/mantine';

export const Sign = () => {
  const email = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  const signOut = () => {
    supabase.auth.signOut();
    setUser('');
  };

  return (
    <div className="bg-gray-50 p-6">
      <div className="flex items-center text-slate-900">
        <p className="px-2">{email}</p>
        <Button
          type="button"
          color="gray"
          className="border border-sky-600 bg-sky-600 px-2 hover:enabled:bg-sky-400 disabled:opacity-75"
          data-testid="logout"
          onClick={signOut}
        >
          ログアウト
        </Button>
      </div>
    </div>
  );
};

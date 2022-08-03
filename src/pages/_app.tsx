import 'src/styles/globals.css';
import 'src/lib/tailwind.css';
import '@icon-park/react/styles/index.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // default three times
      refetchOnWindowFocus: false,
      suspense: true,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionOptions={{ key: 'mantine', prepend: false }}
      >
        <div className="mx-auto max-w-full px-8">
          <header className="flex flex-wrap items-center justify-between bg-gray-50 p-6 shadow-md">
            <div className="mr-6 flex flex-1 items-center text-slate-900">
              <Link href="/">
                <a className="py-8 text-xl font-bold">デザイン管理画面</a>
              </Link>
            </div>
          </header>
          <main className="mt-8 max-w-prose">
            <Component {...pageProps} />
          </main>
        </div>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;

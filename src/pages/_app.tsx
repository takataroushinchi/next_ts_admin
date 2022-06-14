import 'src/lib/tailwind.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
import { MantineProvider } from '@mantine/core';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      emotionOptions={{ key: 'mantine', prepend: false }}
    >
      <div className="mx-auto max-w-full px-8">
        <header className="flex flex-wrap items-center justify-between bg-gray-50 p-6 shadow-md">
          <div className="mr-6 flex flex-shrink-0 items-center text-slate-900">
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
  );
}

export default MyApp;

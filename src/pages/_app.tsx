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
      <div className="mx-auto max-w-prose">
        <header>
          <Link href="/">
            <a className="py-8 text-xl font-bold">タイトル</a>
          </Link>
        </header>
        <main className="mt-8 text-gray-600">
          <Component {...pageProps} />
        </main>
      </div>
    </MantineProvider>
  );
}

export default MyApp;

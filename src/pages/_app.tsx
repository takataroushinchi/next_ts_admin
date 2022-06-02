import "src/lib/tailwind.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="mx-auto max-w-prose">
        <header>
          <Link href="/">
            <a className="text-xl font-bold py-8">タイトル</a>
          </Link>
        </header>
        <main className="text-gray-600 mt-8">
          <Component {...pageProps} />
        </main>
      </div>
    </MantineProvider>
  )
}

export default MyApp;

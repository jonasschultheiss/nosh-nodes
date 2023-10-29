import { Suspense } from "react";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <h1 className="mt-4 block text-2xl font-medium">
        Fill in your bio to get started
      </h1>
      <p className="mt-4 block text-sm">
        Data will get displayed to other users
      </p>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}

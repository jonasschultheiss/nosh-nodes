import { Suspense } from "react";
import { Typography } from "../_components/ui/typography";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className=" mb-16 w-64">
        <Typography variant="h1" component="h1">
          Fill in your bio to get started
        </Typography>
        <Typography variant="large" component="strong">
          Data will get displayed to other users
        </Typography>
      </div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </main>
  );
}

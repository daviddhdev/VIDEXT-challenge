import Link from "next/link";
import { Button } from "~/components/ui/button";

export const HomePanel = () => {
  return (
    <Button
      asChild
      variant="default"
      className="m-2 w-[148px] cursor-pointer z-[300] pointer-events-auto"
    >
      <Link href="/">Go back</Link>
    </Button>
  );
};

import { ReactNode } from "react";

export default function MarginWidthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col sm:border-r sm:border-zinc-700 md:ml-64">
      {children}
    </div>
  );
}

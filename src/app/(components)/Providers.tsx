"use client";

import { PrimeReactProvider } from "primereact/api";

export const Providers = ({
  children,
  nonce,
}: {
  children: React.ReactNode;
  nonce?: string;
}) => {
  return (
    <PrimeReactProvider value={{ ripple: true, nonce: nonce }}>
      {children}
    </PrimeReactProvider>
  );
};

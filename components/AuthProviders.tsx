"use client";
import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | undefined;
};
type Providers = Record<string, Provider>;

function AuthProviders() {
  const [providers, setProviders] = useState<Providers | null>(null);
  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    fetchProviders();
  });

  return (
    providers && (
      <div>
        {Object.values(providers).map((provider: Provider, i) => (
          <button key={i} onClick={() => signIn(provider?.id)}>
            Sign In
          </button>
        ))}
      </div>
    )
  );
}

export default AuthProviders;

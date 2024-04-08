"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "@/src/graphql/gql.setup";

export function NextProviders({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={graphqlClient}>
      <SessionProvider>
        <NextUIProvider>
          <NextThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </NextThemeProvider>
        </NextUIProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

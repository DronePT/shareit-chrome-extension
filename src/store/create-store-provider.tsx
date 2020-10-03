import React, { ReactNode } from "react";

type ReactComponent = {
  children: ReactNode;
};

export const createStoreProvider = (providers: any[]) => ({
  children,
}: ReactComponent) =>
  providers
    .reverse()
    .reduce((tree, Provider) => <Provider>{tree}</Provider>, children);

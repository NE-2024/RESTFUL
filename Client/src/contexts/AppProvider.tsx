"use client";

import React from "react";
import { Anchor, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
interface Props {
  children: React.ReactNode;
}

const AppProvider = ({ children }: Props) => {
  return (
    <MantineProvider
      theme={{
        colors: {
          brand: [
            "#FFFFFF",
            "#354545",
            "#FF8EC2",
            "#FF6AB3",
            "#FF46A4",
            "#FF2295",
            "#1B60AC",
            "#1B60CA",
            "#1B60AC",
            "#C50E82",
            "#AD1374",
          ],
        },
        components: {
          Anchor: Anchor.extend({
            defaultProps: {
              underline: "never",
            },
          }),
        },
      }}
      defaultColorScheme="light"
    >
      {children}
    </MantineProvider>
  );
};

export default AppProvider;

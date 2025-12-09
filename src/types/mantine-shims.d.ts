// Temporary shims to avoid TypeScript errors from third-party packages
// Add proper typings or remove this file once types are available/compatible.

declare module "@mantine/*" {
  const content: any;
  export default content;
}

declare module "react-fast-marquee" {
  import * as React from "react";
  const Marquee: React.ComponentType<{
    children?: React.ReactNode;
    speed?: number;
    pauseOnHover?: boolean;
    gradient?: boolean;
    className?: string;
  }>;
  export default Marquee;
}
// Temporary shims for third-party packages to avoid TypeScript errors
// These declare minimal module shapes so the build doesn't fail when types
// are missing or use newer TS features. Remove when proper types are available.

declare module "@mantine/*";

declare module "react-fast-marquee" {
  import * as React from "react";
  interface MarqueeProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
    pauseOnHover?: boolean;
    gradient?: boolean;
    speed?: number;
    className?: string;
  }
  const Marquee: React.ComponentType<MarqueeProps>;
  export default Marquee;
}

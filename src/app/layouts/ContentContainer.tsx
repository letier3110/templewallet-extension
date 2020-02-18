import * as React from "react";
import classNames from "clsx";
import { WindowType, useAppEnv } from "app/env";

const ContentContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...rest
}) => {
  const appEnv = useAppEnv();

  return (
    <div
      className={classNames(
        "w-full",
        appEnv.windowType === WindowType.FullPage
          ? "max-w-screen-md"
          : "max-w-screen-sm",
        "mx-auto",
        "px-4",
        className
      )}
      {...rest}
    />
  );
};

export default ContentContainer;
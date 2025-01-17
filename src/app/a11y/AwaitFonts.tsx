import React, { FC } from "react";

import FontFaceObserver from "fontfaceobserver";
import useSWR from "swr";

type AwaitFontsProps = {
  name: string;
  weights: number[];
  className: string;
};

const AwaitFonts: FC<AwaitFontsProps> = ({
  name,
  weights,
  className,
  children,
}) => {
  useSWR([name, weights, className], awaitFonts, {
    suspense: true,
    shouldRetryOnError: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return <>{children}</>;
};

export default AwaitFonts;

async function awaitFonts(name: string, weights: number[], className: string) {
  try {
    const fonts = weights.map(
      (weight) => new FontFaceObserver(name, { weight })
    );
    await Promise.all(fonts.map((font) => font.load()));
    document.body.classList.add(...className.split(" "));
  } catch (err: any) {
    if (process.env.NODE_ENV === "development") {
      console.error(err);
    }
  } finally {
    return null;
  }
}

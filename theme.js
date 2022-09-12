import { theme as chakraTheme } from "@chakra-ui/react";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config";

const tailwind = resolveConfig(tailwindConfig);

chakraTheme.colors = tailwind.theme.colors;
chakraTheme.fonts = tailwind.theme.extend?.fontFamily;

export const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
  },
  fonts:{
    heading: {...chakraTheme.fonts },
    body: {...chakraTheme.fonts}
    
  }
};

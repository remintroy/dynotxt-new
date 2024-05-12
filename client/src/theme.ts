import { Button, createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    // override dark colors to change them for all components
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5C5F66",
      "#373A40",
      "#2C2E33",
      "#25262B",
      "#101113",
      "#1A1B1E",
      "#141517",
    ],
  },
  autoContrast: true,
  luminanceThreshold: 0.5,
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "light",
      },
    }),
  },
});

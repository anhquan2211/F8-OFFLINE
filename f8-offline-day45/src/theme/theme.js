import { extendTheme } from "@chakra-ui/react";

/**
 * Customizes the Chakra UI theme with brand-specific colors.
 * @constant theme
 */
const theme = extendTheme({
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
});

export default theme;

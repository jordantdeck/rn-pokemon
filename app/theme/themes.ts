import { themeLight, spacing, themeDark, typography, breakpoints  } from '.';

const theme = {color: themeLight, spacing, typography, breakpoints };

export type Theme = typeof theme;

export const themes = {
  light: {...theme},
  dark: {...theme, themeDark},
};
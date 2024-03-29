import React from 'react';
import { themes, Theme as DefaultTheme } from './../theme/themes';
import { ViewStyle, TextStyle } from 'react-native';

export type Theme = DefaultTheme
export type TStyle = (theme: Theme) => TextStyle
export type VStyle = (theme: Theme) => ViewStyle

export const ThemeContext = React.createContext({ theme: themes.dark, toggleTheme: () => null, themeName: 'dark' });

export const useTheme = () => React.useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeName, setTheme] = React.useState<keyof typeof themes>('dark');
  const toggleTheme = () => setTheme(themeName === 'light' ? 'dark' : 'light');

  const theme = themes[themeName];

  const value = { theme, toggleTheme, themeName };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
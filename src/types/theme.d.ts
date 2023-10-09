import '@emotion/react';

declare module '@emotion/react' {
  export interface DefaultTheme {
    typography: {
      title: {
        fontWeight: '800';
        fontSize: '4.0rem';
      };
      header1: {
        fontWeight: 'Bold';
        fontSize: '3.2rem';
      };
      header2: {
        fontWeight: 'Bold';
        fontSize: '2.4rem';
      };
      body1: {
        fontWeight: '500';
        fontSize: '1.8rem';
      };
      body1Bold: {
        fontWeight: 'Bold';
        fontSize: '1.8rem';
      };
      body2: {
        fontWeight: '500';
        fontSize: '1.6rem';
      };
      body2Bold: {
        fontWeight: 'Bold';
        fontSize: '1.6rem';
      };
      body3: {
        fontWeight: '500';
        fontSize: '1rem';
      };
      body3Bold: {
        fontWeight: 'Bold';
        fontSize: '1rem';
      };
    };
    palette: {
      primary: {
        100: '#FEF9DF';
        200: '#FEF2C0';
        300: '#FCE8A1';
        400: '#FADE89';
        500: '#F7CE62';
      };
      gray: {
        600: '#5C5C4D';
        500: '#6B6B6A';
        400: '#A6A6A5';
        300: '#969696';
        200: '#F0F0EF';
        black: '#000000';
        white: '#ffffff';
      };
      semantic: {
        background: '#faf9f8';
        success: { 500: '#59BA2C' };
        info: { 500: '#47C1FF' };
        warning: { 500: '#FFB200' };
        danger: { 500: '#FF3A3A' };
      };
    };
  }
}

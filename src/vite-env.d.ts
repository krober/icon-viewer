/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module "eva-icons" {
  export const icons: {
    [key: string]: {
      name: string;
      contents: string;
      attrs: {
        class: string;
        height: number;
        width: number;
        viewBox: string;
      };
    };
  };
}

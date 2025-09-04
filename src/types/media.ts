// Type definitions for the media system

export interface MediaEnvironment {
  dev: string;
  prod: string;
}

export interface MediaConfig {
  [key: string]: MediaEnvironment;
}

// Global type augmentation for media template strings
declare global {
  // This allows TypeScript to recognize media template strings like '{{ KOALA_JPG }}'
  interface String {
    replace(searchValue: RegExp, replaceValue: string): string;
  }
}

export {};

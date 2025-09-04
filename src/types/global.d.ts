// Global type definitions

// CSS Module declarations
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Media files
declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

// JSON files
declare module '*.json' {
  const value: any;
  export default value;
}

# OmmaWorks Content Boilerplate - Modernized

OmmaWorks content boilerplate using Webpack, TypeScript, and modern development tooling.

## 🚀 Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Modern JavaScript**: ES6+ with Babel transpilation
- **Webpack**: Modern bundling with hot reload
- **CSS Processing**: Modern CSS with imports and processing
- **Media System**: Compatible with original `media://` protocol with type safety
- **Development Server**: Hot reload development server
- **Production Build**: Optimized builds with inlined assets
- **Type Safety**: Comprehensive type definitions for media system

## 📋 Requirements

- [Node.js](https://nodejs.org/en/download/) (v16 or higher)
- npm or yarn
- TypeScript knowledge (helpful but not required)

## 🛠️ Installation

```bash
npm install
```

## 📖 Usage

### Development

Start the development server with hot reload:

```bash
npm run dev
```

This will:
- Start webpack dev server on http://localhost:9000
- Enable hot module replacement
- Use `dev` environment for media links
- Open your browser automatically

### Building

#### Development Build
```bash
npm run build:dev
```

#### Production Build (for OmmaWorks upload)
```bash
npm run build:prod
```

This will:
- Use `prod` environment for media links (media:// protocol)
- Create optimized, minified assets
- Generate `index-inline.html` with all CSS/JS inlined

## 🎨 Media Usage

The media system works exactly like the original boilerplate:

### 1. Add your media files to `src/assets/` folder

### 2. Register them in `src/assets.json`:
```json
{
    "KOALA_JPG": {
        "dev": "./assets/koala.jpg",
        "prod": "media://73"
    },
    "YOUR_VIDEO": {
        "dev": "./assets/video.mp4",
        "prod": "media://96"
    }
}
```

### 3. Use them in your HTML, CSS, or JS:
```html
<!-- HTML -->
<img src="{{KOALA_JPG}}" alt="Koala">

<!-- CSS -->
.bg { background-image: url('{{YOUR_VIDEO}}'); }

<!-- JavaScript -->
console.log('Media path:', '{{KOALA_JPG}}');
```

## 🏗️ Project Structure

```
modernized/
├── src/
│   ├── index.html          # HTML template
│   ├── index.ts           # Main TypeScript entry
│   ├── types/
│   │   ├── media.ts       # Media system type definitions
│   │   └── global.d.ts    # Global type declarations
│   ├── styles/
│   │   ├── main.css       # Main styles
│   │   └── normalize.css  # CSS reset
│   ├── assets/
│   │   └── koala.jpg      # Media files
│   └── assets.json        # Media configuration
├── dist/                  # Build output
├── tsconfig.json          # TypeScript configuration
├── webpack.config.js      # Webpack configuration
├── build-inline.js        # Inline HTML generator
└── package.json
```

## 🔧 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build:dev` - Build for development (uses local media paths)
- `npm run build:prod` - Build for production (uses media:// protocol)
- `npm run build` - Production build + inline HTML generation
- `npm run type-check` - Run TypeScript type checking
- `npm run type-check:watch` - Run TypeScript type checking in watch mode

## 📦 Production Output

After running `npm run build:prod`, you'll get:

- `dist/index.html` - Regular HTML with separate assets
- `dist/index-inline.html` - **Single HTML file with inlined CSS/JS for OmmaWorks upload**

## 💻 TypeScript Features

### Type Safety for Media System
```typescript
// Strongly typed media configuration
interface MediaConfig {
  [key: string]: {
    dev: string;
    prod: string;
  };
}

// Type-safe media handling
private validateMediaConfig(config: MediaConfig): void {
  // Compile-time and runtime validation
}
```

### Modern Class-Based Architecture
```typescript
class App {
  private container: HTMLElement | null = null;

  private handleContainerClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    // Full type safety with proper casting
  }
}
```

### Development Benefits
- 🔍 **IntelliSense**: Full autocomplete and code suggestions
- 🐛 **Error Prevention**: Catch errors at compile time
- 📚 **Self-Documenting**: Types serve as documentation
- 🔧 **Refactoring**: Safe refactoring with IDE support

## 🆚 Differences from Original

### Improvements:
- ✅ **TypeScript**: Full type safety and modern language features
- ✅ Modern ES6+ JavaScript with classes and modules
- ✅ Hot reload development server
- ✅ Modern CSS with custom properties
- ✅ Webpack for optimized bundling
- ✅ Babel for browser compatibility
- ✅ Better project structure with type definitions
- ✅ NPM scripts instead of Gulp tasks
- ✅ Comprehensive type checking

### Maintained Compatibility:
- ✅ Same `assets.json` schema
- ✅ Same `{{MEDIA_NAME}}` templating syntax
- ✅ Same `media://` protocol for production
- ✅ Same inline HTML output for OmmaWorks

## 🤝 Migration from Original

1. Copy your `assets.json` and media files to the new structure
2. Move your CSS to `src/styles/`
3. Convert your JavaScript to TypeScript in `src/index.ts`:
   - Add type annotations
   - Use modern class syntax
   - Import CSS files at the top
4. Update your HTML template in `src/index.html`
5. Run `npm install` and `npm run dev`

### 📝 Converting JavaScript to TypeScript

**Before (JavaScript):**
```javascript
$(document).ready(function() {
    console.log('Hello from javascript!');
});
```

**After (TypeScript):**
```typescript
class App {
  constructor() {
    document.addEventListener('DOMContentLoaded', () => {
      console.log('Hello from TypeScript!');
    });
  }
}

new App();
```

## 🐛 Troubleshooting

### TypeScript errors?
- Run `npm run type-check` to see all type errors
- Check that all imports have proper file extensions in webpack config
- Ensure your `tsconfig.json` is properly configured

### Media not replacing?
- Check that your media keys in `assets.json` match exactly (case-sensitive)
- Ensure you're using the correct environment (`dev` vs `prod`)

### Build failing?
- Make sure all dependencies are installed: `npm install`
- Check that your `assets.json` is valid JSON
- Run `npm run type-check` to catch TypeScript errors

### Development server not starting?
- Check if port 9000 is available
- Try `npm run build:dev` first to ensure webpack config is correct
- Verify TypeScript compilation with `npm run type-check`

---

**Happy coding! 🎉**

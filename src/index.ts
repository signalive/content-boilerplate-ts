// Import styles
import './styles/normalize.css';
import './styles/main.css';

// Import types
import type { MediaConfig } from './types/media';

/**
 * Main application class for the OmmaWorks content boilerplate
 */
class App {
  private container: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  /**
   * Initialize the application
   */
  private init(): void {
    console.log('Hello from modern TypeScript!');
    console.log('This will be replaced =>', '{{ KOALA_JPG }}');

    // Example of modern JavaScript/TypeScript features
    this.setupEventListeners();
    this.loadMediaConfig();
  }

  /**
   * Set up event listeners for the application
   */
  private setupEventListeners(): void {
    document.addEventListener('DOMContentLoaded', () => {
      this.container = document.querySelector('.container');
      if (this.container) {
        this.container.addEventListener('click', this.handleContainerClick.bind(this));
      }
    });
  }

  /**
   * Handle container click events
   */
  private handleContainerClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    console.log('Container clicked!', target);

    // Example of TypeScript type checking
    if (target.tagName === 'IMG') {
      this.handleImageClick(target as HTMLImageElement);
    }
  }

  /**
   * Handle image click events with proper typing
   */
  private handleImageClick(img: HTMLImageElement): void {
    console.log('Image clicked:', img.src, img.alt);

    // Add a simple animation
    img.style.transform = img.style.transform === 'scale(1.1)' ? 'scale(1)' : 'scale(1.1)';
  }

  /**
   * Load and validate media configuration
   * This demonstrates how you might work with the media system in TypeScript
   */
  private async loadMediaConfig(): Promise<void> {
    try {
      // In a real application, you might fetch this dynamically
      // For now, we'll demonstrate the type structure
      const mediaConfig: MediaConfig = {
        'KOALA_JPG': {
          dev: './medias/koala.jpg',
          prod: 'media://73'
        }
      };

      this.validateMediaConfig(mediaConfig);
      console.log('Media configuration loaded and validated:', mediaConfig);
    } catch (error) {
      console.error('Failed to load media configuration:', error);
    }
  }

  /**
   * Validate media configuration structure
   */
  private validateMediaConfig(config: MediaConfig): void {
    for (const [key, media] of Object.entries(config)) {
      if (!media.dev || !media.prod) {
        throw new Error(`Invalid media configuration for ${key}: missing dev or prod environment`);
      }

      if (typeof media.dev !== 'string' || typeof media.prod !== 'string') {
        throw new Error(`Invalid media configuration for ${key}: dev and prod must be strings`);
      }
    }
  }

  /**
   * Get the current environment (useful for debugging)
   */
  public getCurrentEnvironment(): 'dev' | 'prod' {
    // This is a simple heuristic - in production builds, media URLs will be replaced
    const testElement = document.querySelector('img[src*="media://"]');
    return testElement ? 'prod' : 'dev';
  }
}

// Initialize the app
const app = new App();

// Export for potential external usage or testing
export default app;

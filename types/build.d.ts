
import Swup from 'swup';
import Lenis from 'lenis';

declare global {
  interface Window {
    swup: Swup;
    lenis: Lenis;
  }
}

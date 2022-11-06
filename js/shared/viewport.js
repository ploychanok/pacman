export class Viewport {
  init() {
    setTimeout(() => {
      this.screenHeight();
    }, 500);
  }

  /**
   * It sets the height of the app to the height of the window.
   */
  screenHeight() {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', appHeight);
    appHeight();
  }
}
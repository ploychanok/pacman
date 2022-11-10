// Add your scripts here
import {
    Config,
    Viewport
} from './index';

/* This is a JavaScript event listener. It's a function that runs when the DOM is ready. */
document.addEventListener('DOMContentLoaded', () => {
    new Config().init();
    // new Viewport().init();
});

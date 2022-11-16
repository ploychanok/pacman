// Add your scripts here
import {
    Config,
    Viewport,
    Log
} from './index';

/* This is a JavaScript event listener. It's a function that runs when the DOM is ready. */
document.addEventListener('DOMContentLoaded', () => {
    new Config().init();
    new Log().init();
    // new Viewport().init();
});


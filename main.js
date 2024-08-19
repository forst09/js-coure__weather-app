'use strict';

import getGeolocation from "./src/js/getGeolocation";
import searchGeolocation from "./src/js/searchGeolocation";

document.addEventListener('DOMContentLoaded', () => {

    const mainWindow = document.querySelector('.main__window');

    if (mainWindow) {

        const mainContent = mainWindow.querySelector('.main__content');

        getGeolocation(mainWindow, mainContent);

        searchGeolocation(mainWindow, mainContent);

    }

})
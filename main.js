'use strict';

import showReset from "./src/js/form/showReset";
import getGeolocation from "./src/js/geolocation/getGeolocation";
import searchGeolocation from "./src/js/geolocation/searchGeolocation";

document.addEventListener('DOMContentLoaded', () => {

    const mainWindow = document.querySelector('.main__window');

    if (mainWindow) {

        const mainContent = mainWindow.querySelector('.main__content');

        getGeolocation(mainWindow, mainContent);

        const form = document.querySelector('.form');

        if (form) {
            searchGeolocation(mainWindow, mainContent, form);

            showReset(form);
        }

    }

})
import loadWeather from "./loadWeather";

export default function searchGeolocation(mainWindow, mainContent, form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const city = form.querySelector('.form__search-input').value;

        loadWeather(city, mainWindow, mainContent);
    })
}

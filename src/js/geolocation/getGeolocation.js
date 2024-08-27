import loadWeather from "./loadWeather";

export default function getGeolocation(mainWindow, mainContent) {

    navigator.geolocation.getCurrentPosition(success, handleError);

    function success(position) {
        const { latitude, longitude } = position.coords;
        loadWeather(`${latitude},${longitude}`, mainWindow, mainContent);
    }

    function handleError(error) {
        let errorMessage;

        switch (error.code) {
            case GeolocationPositionError.TIMEOUT:
                errorMessage = error.message;
                break
            case GeolocationPositionError.PERMISSION_DENIED:
                errorMessage = "You don't have permission";
                break
            case GeolocationPositionError.POSITION_UNAVAILABLE:
                errorMessage = error.message;
                break
        }

        mainWindow.classList.add('main__window--message');
        mainContent.classList.add('main__content--message');
        mainContent.innerHTML = `
                <p>${errorMessage}</p>
            `;
    }
}
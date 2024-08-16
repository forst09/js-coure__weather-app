export default function getGeolocation() {

    const mainWindow = document.querySelector('.main__window');

    if (mainWindow) {
        const mainContent = document.querySelector('.main__content');

        navigator.geolocation.getCurrentPosition(success, handleError);

        function success(position) {
            mainWindow.classList.remove('main__window--message');
            mainContent.classList.remove('main__content--message');

            const { latitude, longitude } = position.coords;

            async function loadWeather() {
                try {
                    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=891b887bed714e6c9c4191325241608&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`);
                    const data = await response.json();
                    mainContent.innerHTML = `
                        <h1 class="title main__title">Weather in ${data.location.country}, ${data.location.name}</h1>
                        <span class="main__temperature">${Math.round(data.current.temp_c)} &deg;C</span>
                        <span class="main__descr">${data.current.condition.text}</span>
                        <span class="main__humidity">Humidity: ${data.current.humidity}%</span>
                        <span class="main__wind">Wind Speed: ${Math.round(data.current.wind_kph / 3.563)} m/s</span> 
                    `;
                    mainContent.querySelector('.main__descr').style.setProperty('--icon-src', `url("${data.current.condition.icon}")`);
                    return data
                } catch (e) {
                    console.log(e)
                }
            }
            loadWeather();
        }

        function handleError(error) {
            console.log(mainContent.innerHTML);

            const { code } = error;

            if (mainContent) {
                mainWindow.classList.add('main__window--error');
                mainContent.classList.add('main__content--error');

                switch (code) {
                    case GeolocationPositionError.TIMEOUT:
                        mainContent.innerHTML = 'The time for receiving geolocation has expired';
                        break
                    case GeolocationPositionError.PERMISSION_DENIED:
                        mainContent.innerHTML = 'The user has banned tracking his location';
                        break
                    case GeolocationPositionError.POSITION_UNAVAILABLE:
                        mainContent.innerHTML = 'The location could not be obtained';
                        break
                }
            }
        }
    }
}
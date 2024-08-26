import getForecast from "./getForecast";

export default async function loadWeather(searchParam, mainWindow, mainContent) {

    if (document.querySelector('.forecast')) {
        document.querySelector('.forecast').remove();
    }

    mainWindow.classList.add('main__window--message');
    mainContent.classList.add('main__content--message');

    mainContent.innerHTML = `
        <img src="/icons/loader.svg" class="loader"></img>
        <span>data is loading</span>
    `;

    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=891b887bed714e6c9c4191325241608&q=${searchParam}&days=1&aqi=no&alerts=no`);
        const data = await response.json();

        if (!data.error) {
            mainWindow.classList.remove('main__window--message');
            mainContent.classList.remove('main__content--message');
            mainContent.innerHTML = `
                <h1 class="title main__title">Weather in ${data.location.country}, ${data.location.name}</h1>
                <span class="main__temperature">${Math.round(data.current.temp_c)} &deg;C</span>
                <span class="main__descr">${data.current.condition.text}</span>
                <span class="main__humidity">Humidity: ${data.current.humidity}%</span>
                <span class="main__wind">Wind Speed: ${Math.round(data.current.wind_kph / 3.563)} m/s</span> 
            `;
            mainContent.querySelector('.main__descr').style.setProperty('--icon-src', `url("${data.current.condition.icon}")`);

            getForecast(mainWindow, data.forecast.forecastday[0].hour, data.location.localtime_epoch);
        }
        else {
            mainWindow.classList.add('main__window--message');
            mainContent.classList.add('main__content--message');
            mainContent.innerHTML = `
                <p>${data.error.message}</p>
            `;
            mainWindow.querySelector('.forecast').remove();

            throw new Error(data.error.message);
        }
    } catch (e) {
        mainWindow.classList.add('main__window--message');
        mainContent.classList.add('main__content--message');
        mainContent.innerHTML = `
            <p>Something went wrong. Please try again</p>
        `;

        throw new Error(e.message);
    }
}
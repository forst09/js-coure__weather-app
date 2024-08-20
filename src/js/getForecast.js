export default function getForecast(mainWindow, lastUpdatedEpoch, lastUpdated, forecastArray, localTime) {
    let forecast;

    if (document.querySelector('.forecast')) {
        forecast = document.querySelector('.forecast');
        forecast.innerHTML = '';
    }
    else {
        forecast = document.createElement('ul');
        forecast.classList.add('forecast');
        mainWindow.append(forecast);
    }

    forecastArray.forEach(item => {
        if (item.time >= localTime) {
            console.log(item)
        }
    })

    const hours = forecastArray.filter(item => item.time_epoch >= lastUpdatedEpoch);

    console.log(forecastArray, hours);

    if (hours.length > 0) {
        hours.forEach(hour => {
            const forecastItem = document.createElement('li');
            forecastItem.classList.add('forecast__item');
            //  <span class="forecast__item-hour">${new Date(hour.time_epoch * 1000).getUTCHours()}:00</span>
            forecastItem.innerHTML = `
                <span class="forecast__item-hour">${new Date(hour.time).getHours()}:00</span>
                <div class="forecast__item-img img">
                    <img src="${hour.condition.icon}"
                     alt="forecats-icon"
                     class="img__img">
                </div>
                <span class="forecast__item-temp">${Math.round(hour.temp_c)} &deg;C</span>
            `;
            forecast.append(forecastItem);
        })
    }
    //     <ul class="forecast">
    //     <li class="forecast__item">
    //         <span class="forecast__item-hour"></span>
    //         <div class="forecast__item-img img">
    //             <img src="icon"
    //                 alt=""
    //                 class="img__img">
    //         </div>
    //         <span class="forecats__item-temp"></span>
    //     </li>
    // </ul>
}
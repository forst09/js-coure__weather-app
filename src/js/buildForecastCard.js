export default function buildForecastCards(forecast, hour) {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('swiper-slide', 'forecast__slider-slide');
    forecastItem.innerHTML = `
        <div class="forecast__item">
            <span class="forecast__item-hour">${new Date(hour.time).getHours()}:00</span>
            <div class="forecast__item-img img">
                <img src="${hour.condition.icon}"
                alt="forecats-icon"
                class="img__img">
            </div>
            <span class="forecast__item-temp">${Math.round(hour.temp_c)} &deg;C</span>
        </div>
    `;
    forecast.append(forecastItem);
}
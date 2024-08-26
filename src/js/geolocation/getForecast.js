import Swiper from "swiper";
import { Navigation } from 'swiper/modules';

import buildForecastCards from "./buildForecastCard";

export default function getForecast(mainWindow, forecastArray, localTime) {
    let forecast, forecastSlider;

    forecast = document.createElement('div');
    forecast.classList.add('forecast');
    forecast.innerHTML = `
            <div class="swiper forecast__slider">
                <div class="swiper-wrapper forecast__slider-wrapper"></div>
            </div>
            <div class="swiper-button-prev forecast__btn forecast__btn--prev"></div>
            <div class="swiper-button-next forecast__btn forecast__btn--next"></div>
        `;
    mainWindow.append(forecast);

    const hours = forecastArray.filter(item => item.time_epoch - localTime > -3600);

    if (hours.length > 0) {
        hours.forEach(hour => {
            buildForecastCards(forecast.querySelector('.forecast__slider-wrapper'), hour);
        });

        forecastSlider = new Swiper(forecast.querySelector('.forecast__slider'), {
            spaceBetween: 10,
            slidesPerView: 'auto',
            modules: [Navigation],
            navigation: {
                prevEl: '.forecast__btn--prev',
                nextEl: '.forecast__btn--next'
            },
            breakpoints: {
                768: {
                    spaceBetween: 28
                }
            }
        })
    }
}
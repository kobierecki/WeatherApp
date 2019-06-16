
window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-degree');
    const locationTimezone = document.querySelector('.location-timezone');
    const degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/29bffd2ad662f357fe15cf8be9639c63/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const {temperature, summary, icon} = data.currently;
                    let apiTemperature = temperature;

                    // SET DOM ELEMENTS
                    temperatureDegree.textContent = apiTemperature.toFixed(1);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    //SET ICON
                    setIcons(icon, document.querySelector('.icon'));

                    //SWITCH TO CELSIUS / FAHRENHEIT
                    degreeSection.addEventListener('click', () => {
                       if(temperatureSpan.textContent === '°C') {
                           apiTemperature = temperature.toFixed(1);
                           temperatureDegree.textContent = apiTemperature;
                           temperatureSpan.textContent = '°F';

                       } else {
                           apiTemperature = ((temperature - 32) * 5 / 9).toFixed(1);
                           temperatureDegree.textContent = apiTemperature;
                           temperatureSpan.textContent = '°C';
                       }
                    });
                })
        });
    } else {
        h1.textContent = "Your browser doesn't support geolocation"
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});
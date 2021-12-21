let clima = {
    apiKey: "3bb3233358ccded09ab8090ece37f94f",
    fetchWeather: function(ciudad) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&lang=es&appid=${this.apiKey}`)
        .then((response) => response.json())
        .then((datos) => this.mostrarClima(datos))
    },
    mostrarClima: function(data) {
        const { name } = data
        const { icon, description } = data.weather[0]
        const { temp, humidity } = data.main
        const { speed } = data.wind
        conversion = speed * 3.6

        const mayus = (word) => {
            return word[0].toUpperCase() + word.slice(1)
        }

        // console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".ciudad").innerText = name
        document.querySelector(".icon").src = `https://openweathermap.org/img/wn/${icon}@4x.png`
        document.querySelector(".descripcion").innerText = mayus(description)
        document.querySelector(".temp").innerText = `${temp.toFixed(1)}°C`
        document.querySelector(".humedad").innerText = `Humedad: ${humidity}%`
        document.querySelector(".viento").innerText = `Vel. viento: ${conversion.toFixed(1)} km/h`
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search_bar").value)
    }
}

document.querySelector(".busqueda button").addEventListener("click", () => {
    clima.search()
})
document.querySelector(".search_bar").addEventListener("keyup", (e) => {
    if (e.key == "Enter"){
        clima.search()
    }
})

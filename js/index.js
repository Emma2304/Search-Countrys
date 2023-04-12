const banderas = document.getElementById('banderas')
const formulario = document.getElementById('formulario');
const inputFormulario = document.getElementById('inputFormulario');
const introducer = document.querySelector('.introducer')

document.addEventListener("DOMContentLoaded", e => {
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        console.log(data)
        formularioCliente(data)
    } catch (error) {
        console.log(error);
    }
}

const getWeather = async (latitud, longitud) => {
    try {
        const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitud}&lon=${longitud}&appid=1f19ff5afdb13a79b48d5af239d90baf`)
        const data2 = await response2.json();
        return data2;
    } catch (error) {
        console.log(error);
    }

}

// const weather = getWeather(data[0].latlng[0], data[0].latlng[1]);
const banderillas = data => {
    let elementos = ''
    data.forEach(item => {
        elementos += `
        <article class="card">
        <img src="${item.flags.svg}" alt="" class="img-fluid">
        <div class="card-content">
            <h3>${item.name.common}</h3>
            <p>
                <b> <span class="required">°</span> Capital: 
                    ${item.capital}
                </b>
            </p>
            <p>
                <b> <span class="required">°</span> Population: 
                    ${item.population}
                </b>
            </p>
            <p>
                <b> <span class="required">°</span> Region: 
                    ${item.region}
                </b>
            </p>
            <p>
                <b> <span class="required">°</span> Temperature: 
                    ${weather.main.temp}°C
                </b>
            </p>
            <img src="https://openweathermap.org/img/wn/10d@2x.png" alt="icon">
            <p>
                <b> <span class="required">°</span> Clima actual: 
                    ${weather.weather[0].description}
                </b>
            </p>
        </div>
    </article>`
    });
    banderas.innerHTML = elementos
}

const formularioCliente = data => {
    formulario.addEventListener('keyup', async e => {
        e.preventDefault()
        introducer.innerHTML = ''
        const letraCliente = inputFormulario.value.toLowerCase()
        const arrayFiltrado = data.filter(item => {
            const letraApi = item.name.common.toLowerCase()
            if (letraApi.indexOf(letraCliente) === 0) {
                return item;
            }
        })
        console.log(arrayFiltrado);
        if (arrayFiltrado.length > 10) {
            introducer.innerHTML = 'Se mas especifico con tu busqueda'
            let elementos = ''
            while (banderas.firstElementChild) {
                banderas.removeChild(banderas.firstElementChild);
            }
        }
        if (arrayFiltrado.length > 1 && arrayFiltrado.length <= 10) {
            let elementos = ''
            while (banderas.firstElementChild) {
                banderas.removeChild(banderas.firstElementChild);
            }
            arrayFiltrado.forEach(item => {
                elementos += `
                <article class="card">
                <img src="${item.flags.svg}" alt="" class="img-fluid">
                <div class="card-content">
                    <h3>${item.name.common}</h3>
                </article>`
            })
            banderas.innerHTML = elementos
        }
        if (arrayFiltrado.length === 1) {
            const weather = await getWeather(arrayFiltrado[0].latlng[0], arrayFiltrado[0].latlng[1]);
            let elementos = ''
            elementos = `
        <article class="card">
        <img src="${arrayFiltrado[0].flags.svg}" alt="" class="img-fluid">
        <div class="card-content">
            <h3>${arrayFiltrado[0].name.common}</h3>
            <p>
                <b> <span class="required">°</span> Capital: 
                    ${arrayFiltrado[0].capital}
                </b>
            </p>
            <p>
                <b> <span class="required">°</span> Population: 
                    ${arrayFiltrado[0].population}
                </b>
            </p>
            <p>
                <b> <span class="required">°</span> Region: 
                    ${arrayFiltrado[0].region}
                </b>
            </p>
            <p>
                <b> <span class="required">°</span> Temperature: 
                    ${weather.main.temp}°C
                </b>
            </p>
            <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="icon">
            <p>
                <b> <span class="required">°</span> Clima actual: 
                    ${weather.weather[0].description}
                </b>
            </p>
        </div>
    </article>`
            banderas.innerHTML = elementos
        }
    })
}
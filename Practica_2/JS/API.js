const api_key = "0dec8b331ec15c8d4f7819ac817d5f73";
const city = "Monterrey";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;


async function obtenerTemperatura() {
    try {
        const respuesta = await fetch(url);
        const data = await respuesta.json();
    
        if (data.main && data.main.temp){
            document.getElementById("temp").innerHTML = data.main.temp + " °C";
         }
        else{
            document.getElementById("temp").innerHTML= "No se pudo obtener la temperatura";
        }
    } catch (error){
        console.error("Error al obtener la temperatura:", error);
        document.getElementById("temp").innerHTML = "Error al obtener la temperatura";
    }
}

obtenerTemperatura();
setInterval(obtenerTemperatura, 60000)
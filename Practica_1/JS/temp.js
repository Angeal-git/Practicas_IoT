function cambiarTemperatura() {
    const nuevaTemp = Math.floor(Math.random() * 21) + 20; 
    document.getElementById("temp").innerText = nuevaTemp;
}

setInterval(cambiarTemperatura, 2000);
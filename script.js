const screens = document.querySelectorAll('.phone-screen');
const botonesVolver = document.querySelectorAll('.volverhome');

// Navegación en menú principal
document.getElementById('open-map').addEventListener('click', () => {
    navigate('map1');
});
document.getElementById('open-events').addEventListener('click', () => {
    navigate('events1');
});
document.getElementById('open-logros').addEventListener('click', () => {
    navigate('logros1');
});
document.getElementById('open-report').addEventListener('click', () => {
    navigate('reportar1');
});
document.getElementById('open-scan').addEventListener('click', () => {
    navigate('qr1');
});
document.getElementById('open-perfil').addEventListener('click', () => {
    navigate('perfil1');
});


botonesVolver.forEach(boton => {
    boton.addEventListener('click', () => {
        navigate('home');
    });
});

function navigate(screenId) {
  screens.forEach(s => s.style.display = 'none');
  document.getElementById(screenId).style.display = 'block';
}

navigate('home')
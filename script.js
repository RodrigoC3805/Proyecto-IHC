// Declaración de variables: Menú principal
const screens = document.querySelectorAll(".phone-screen");
const botonesVolver = document.querySelectorAll(".volverhome");

// Declaración de variables: Tarea Mapa
const map = L.map("mapa-interactivo").setView([-12.053715, -77.085555], 17);
const botonesMapa = document.querySelectorAll(".botonera-residuos button");
const coordenadaUsuario = [-12.053323265862742, -77.0856313777989];
const coordenadasBasura = [
  [-12.053820979116104, -77.0852780921973],
  [-12.053851509325591, -77.08468734173503],
  [-12.053380342754187, -77.0857950366141],
  [-12.054081295757891, -77.08552772192293],
  [-12.054215172155576, -77.08489236683756],
  [-12.052896594577028, -77.085715318041],
  [-12.052893624800403, -77.0854814905773],
  [-12.05451603191887, -77.08627459970582],
  [-12.054875636146193, -77.08536077886478],
  [-12.054533834119688, -77.08517874284067],
  [-12.054053174283212, -77.08683891138057],
  [-12.052625431469314, -77.08632556979256],
  [-12.05334108405381, -77.08459258684304],
  [-12.054305965860095, -77.08482923367438],
  [-12.053322983307913, -77.08699059439273],
];
const coordenadasReciclaje = [
  [-12.053162446254213, -77.085910001259],
  [-12.054354896650734, -77.08581916787287],
  [-12.054831499354853, -77.08488470931312],
];
const coordenadasCamion = [
  [-12.05304105985056, -77.08499919520301],
  [-12.0534097365194, -77.08735924157892],
];
const coordenadasRuta = [
  [-12.0534097365194, -77.08735924157892],
  [-12.05349037618645, -77.08624900029055],
  [-12.053647395651087, -77.08605895937144],
  [-12.05377330312814, -77.08510945739384],
  [-12.054190371208751, -77.084841236506],
  [-12.054930075278097, -77.08527307213885],
  [-12.054798922225103, -77.08663563424908],
  [-12.056265347116058, -77.08684258122724],
];
const pinUsuario = L.icon({
  iconUrl: "img/pin-user.png",
  iconSize: [90, 90],
  iconAnchor: [20, 40],
});
const pinBasura = L.icon({
  iconUrl: "img/pin-basura.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const pinReciclaje = L.icon({
  iconUrl: "img/pin-reciclaje.png",
  iconSize: [90, 90],
  iconAnchor: [17, 35],
});
const pinCamion = L.icon({
  iconUrl: "img/pin-camion.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});
let camionMarker;
const nuevaCoordenadaCamion = [-12.053661825195139, -77.08604971368443];

// Listeners: Tarea Mapa
document.getElementById("btn-basura").addEventListener("click", () => {
  chooseView("map1");
});
document.getElementById("btn-reciclaje").addEventListener("click", () => {
  chooseView("map2");
});
document.getElementById("btn-camion").addEventListener("click", () => {
  chooseView("map3");
});
document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "p") {
    moverCamionYNotificar();
  }
});
botonesMapa.forEach((boton) => {
  boton.addEventListener("click", () => {
    botonesMapa.forEach((b) => {
      b.classList.remove("btn-selected");
      b.classList.add("btn-unselected");
      const img = b.querySelector("img");
      img.src = b.dataset.iconUnselected;
    });
    boton.classList.add("btn-selected");
    boton.classList.remove("btn-unselected");

    const img = boton.querySelector("img");
    img.src = boton.dataset.iconSelected;
  });
});

// Navegación en menú principal
document.getElementById("open-map").addEventListener("click", () => {
  navigate("map1");
});
document.getElementById("open-events").addEventListener("click", () => {
  navigate("events1");
});
document.getElementById("open-logros").addEventListener("click", () => {
  navigate("logros1");
});
document.getElementById("open-report").addEventListener("click", () => {
  navigate("reportar1");
});
document.getElementById("open-scan").addEventListener("click", () => {
  navigate("qr1");
});
document.getElementById("open-perfil").addEventListener("click", () => {
  navigate("perfil1");
});

// Navegacion dentro de "Actividades" ------------------------------------

document.getElementById("open-actividad1").addEventListener("click", () => {
  navigate("events2");
});

document.getElementById("open-actividad2").addEventListener("click", () => {
  navigate("events3");
});

document.getElementById("volver-actividades").addEventListener("click", () => {
  navigate("events1");
});

document.getElementById("home-detail1").addEventListener("click", () => {
  navigate("home");
});

document.getElementById("volver-actividades2").addEventListener("click", () => {
  navigate("events1");
});

document.getElementById("home-detail2").addEventListener("click", () => {
  navigate("home");
});

// Funciones: Generales
function navigate(screenId) {
  screens.forEach((s) => (s.style.display = "none"));
  document.getElementById(screenId).style.display = "block";
}

// Funciones: Tarea Mapa
function chooseView(mapView) {
  switch (mapView) {
    case "map1":
      map.eachLayer((layer) => {
        if (
          (layer instanceof L.Marker ||
          layer instanceof L.Polyline)
        ) {
          map.removeLayer(layer);
        }
      });
      L.marker(coordenadaUsuario, { icon: pinUsuario }).addTo(map);
      coordenadasBasura.forEach((coord) => {
        L.marker(coord, { icon: pinBasura }).addTo(map);
      });
      break;
    case "map2":
      map.eachLayer((layer) => {
        if ((layer instanceof L.Marker ||
          layer instanceof L.Polyline)) {
          map.removeLayer(layer);
        }
      });
      L.marker(coordenadaUsuario, { icon: pinUsuario }).addTo(map);
      coordenadasReciclaje.forEach((coord) => {
        L.marker(coord, { icon: pinReciclaje }).addTo(map);
      });
      break;
    case "map3":
      map.eachLayer((layer) => {
        if (
          (layer instanceof L.Marker ||
          layer instanceof L.Polyline) && layer !== camionMarker
        ) {
          map.removeLayer(layer);
        }
      });
      L.marker(coordenadaUsuario, { icon: pinUsuario }).addTo(map);
      coordenadasCamion.forEach((coord, index) => {
        if (index == 1) {
          camionMarker = L.marker(coord, { icon: pinCamion }).addTo(map);
        } else {
          L.marker(coord, { icon: pinCamion }).addTo(map);
        }
      });
      L.polyline(coordenadasRuta, {
        color: "blue",
        weight: 4,
      }).addTo(map);
      break;
  }
}
function moverCamionYNotificar() {
  camionMarker.setLatLng(nuevaCoordenadaCamion);
  setTimeout(() => {
    let notif = document.getElementById("notificacion-camion");
    notif.classList.remove("notificacion-hidden");
    notif.classList.add("notificacion-visible");
    setTimeout(() => {
      notif.classList.remove("notificacion-visible");
      notif.classList.add("notificacion-hidden");
    }, 5000);
  }, 5000);
}
// Llamadas a funciones
botonesVolver.forEach((boton) => {
  boton.addEventListener("click", () => {
    navigate("home");
  });
});
// Inicialización del mapa
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
}).addTo(map);
// Inicialización de vista de basura en mapa
chooseView("map1");

navigate("home");


// Navegación dentro de "Perfil" ------------------------------------
document.getElementById("open-perfil2").addEventListener("click", () => {
    navigate("perfil2");
});

document.getElementById("volver-perfil1").addEventListener("click", () => {
    navigate("perfil1");
});

document.getElementById("home-perfil2").addEventListener("click", () => {
    navigate("home");
});
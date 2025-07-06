const input = document.getElementById('input')
const output = document.getElementById('output')
const btn = document.getElementById('submit')

btn.onclick = PrintResponse

// JSON jugadores
const estadoPartida = {
  jugadores: [
    {
      nombre: "Ivor Kulenov",
      clase: "Mago",
      nivel: 3,
      hp: 19,
      hechizos: [
        { nombre: "Luces Danzantes", bonificacionAtaque: 4, dadosDano: "0" },
        { nombre: "Mano de Mago", bonificacionAtaque: 4, dadosDano: "" },
        { nombre: "Rayo Escarcha", bonificacionAtaque: 4, dadosDano: "1d8" },
        { nombre: "Detectar Magia", bonificacionAtaque: 4, dadosDano: "0" },
        { nombre: "Disfrazarse", bonificacionAtaque: 4, dadosDano: "0" },
        { nombre: "Encontrar Familiar", bonificacionAtaque: 4, dadosDano: "0" },
        { nombre: "Proyectil Mágico", bonificacionAtaque: 4, dadosDano: "1d4 + 1" },
        { nombre: "Abrir", bonificacionAtaque: 4, dadosDano: "0" },
        { nombre: "Inmovilizar Persona", bonificacionAtaque: 4, dadosDano: "0" }
      ],

      armas: [
        { nombre: "Bastón", bonificacionAtaque: 2, dadosDano: "1d6" },
        { nombre: "Arco Corto", bonificacionAtaque: 1, dadosDano: "1d6 + 1" },
        { nombre: "Daga", bonificacionAtaque: 2, dadosDano: "1d4" },

      ], // en caso de que tenga una daga, por ejemplo
      imagen: "/images/ivor.png"
    },
    {
      nombre: "Bofur Romperroca",
      clase: "Guerrero",
      nivel: 3,
      hp: 33,
      armas: [
        { nombre: "Ballesta Ligera", bonificacionAtaque: 3, dadosDano: "1d8 + 1" },
        { nombre: "Arco Corto", bonificacionAtaque: 3, dadosDano: "1d6 + 1" },
        { nombre: "Espada corta", bonificacionAtaque: 5, dadosDano: "1d6 + 3" }
      ],
      hechizos: [],
      imagen: "/images/bofur.png"
    },
    {
      nombre: "Erevan Mindartis",
      clase: "Paladín",
      nivel: 3,
      hp: 29,
      armas: [
        { nombre: "Arco Largo", bonificacionAtaque: 4, dadosDano: "1d8 + 2" },
        { nombre: "Daga", bonificacionAtaque: 4, dadosDano: "1d4 + 2" },
        { nombre: "Espada Corta", bonificacionAtaque: 4, dadosDano: "1d6 + 2" }
      ],
      hechizos: [
        { nombre: "Filo Atronador", bonificacionAtaque: 3, dadosDano: "1d8" },
        { nombre: "Curar Heridas", bonificacionAtaque: 3, dadosDano: "0" },
        { nombre: "Favor Divino", bonificacionAtaque: 3, dadosDano: "1d4" },
        { nombre: "Golpe Apresador", bonificacionAtaque: 3, dadosDano: "1d6" },
        { nombre: "Hablar con los Animales", bonificacionAtaque: 3, dadosDano: "0" },
      ],
      imagen: "/images/erevan.png"
    }
  ],
  enemigos: [
    { nombre: "Orco bruto", hp: 18 },
    { nombre: "Goblin", hp: 6 },
    { nombre: "Lobo", hp: 8 },
    { nombre: "Minotauro", hp: 50 }
  ]
};

// Llenar selectores iniciales
window.onload = () => {
  const personajeSelect = document.getElementById("personaje");
  const enemigoSelect = document.getElementById("enemigo");

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select Character";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    personajeSelect.appendChild(defaultOption);

  estadoPartida.jugadores.forEach(j => {
    const option = document.createElement("option");
    option.value = j.nombre;
    option.textContent = j.nombre;
    personajeSelect.appendChild(option);
  });

  estadoPartida.enemigos.forEach(e => {
    const option = document.createElement("option");
    option.value = e.nombre;
    option.textContent = e.nombre;
    enemigoSelect.appendChild(option);
  });

  // Aquí se asigna el evento y se ejecuta de inmediato
  personajeSelect.onchange = actualizarDatos;
  personajeSelect.dispatchEvent(new Event("change")); // Fuerza primera carga
};


function actualizarDatos() {
  const selectorPersonaje = document.getElementById("personaje");
  const armaSelect = document.getElementById("arma");
  const imagenPersonaje = document.getElementById("imagen-personaje");
  const clasePersonaje = document.getElementById("clase-personaje");
  const nivelPersonaje = document.getElementById("nivel-personaje");
  const hpPersonaje = document.getElementById('hp-personaje');

  const nombreSeleccionado = selectorPersonaje.value;

  // Si no se ha seleccionado ningún personaje
  if (!nombreSeleccionado) {
    armaSelect.innerHTML = "";
    imagenPersonaje.src = "/images/placeholder.png";
    imagenPersonaje.alt = "Sin personaje seleccionado";
    clasePersonaje.textContent = "-";
    nivelPersonaje.textContent = "-";
    hpPersonaje.textContent = "-";
    return;
  }

  const jugador = estadoPartida.jugadores.find(j => j.nombre === nombreSeleccionado);

  armaSelect.innerHTML = "";

  const opciones = [
    ...(jugador.armas || []),
    ...(jugador.hechizos || [])
  ];

  opciones.forEach(obj => {
    const option = document.createElement("option");
    option.value = obj.nombre;
    option.textContent = obj.nombre;
    armaSelect.appendChild(option);
  });

  imagenPersonaje.src = jugador.imagen;
  imagenPersonaje.alt = `Token de ${jugador.nombre}`;
  clasePersonaje.textContent = jugador.clase;
  nivelPersonaje.textContent = jugador.nivel;
  hpPersonaje.textContent = jugador.hp;
}




// Reconocimiento de voz
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'es-ES';
recognition.interimResults = false;
recognition.continuous = false;

recognition.onresult = function(event) {
    const texto = event.results[0][0].transcript;
    PrintResponse(texto);
};

function empezarEscucha() {
    console.info('Escuchando')
    recognition.start();
}


function PrintResponse (textoUsuario)
{
    const nombreSeleccionado = document.getElementById('personaje').value;
    const jugador = estadoPartida.jugadores.find(j => j.nombre === nombreSeleccionado)
    const enemigos = estadoPartida.enemigos
    const armaSeleccionada = document.getElementById('arma').value
    const enemigoSeleccionado = document.getElementById('enemigo').value

    const tiradaAtaque = document.getElementById('ataque').value
    const tiradaDano = document.getElementById('dano').value

    const contextMessage = `
    Eres un Dungeon Master en una partida de Dungeons & Dragons.

    Jugador: ${JSON.stringify(jugador, null, 2)}
    Arma o hechizo usado: ${armaSeleccionada}
    Enemigo objetivo: ${enemigoSeleccionado}
    Otros enemigos: ${JSON.stringify(enemigos.filter(e => e.nombre !== enemigoSeleccionado), null, 2)}

    El jugador ha especificado lo que va a hacer: "${input.value}"
    El jugador ha dicho : "${textoUsuario}"

    Este es el resultado de su acción:
    - Tirada de ataque: ${tiradaAtaque}
    - Daño infligido: ${tiradaDano}

    Tu tarea es narrar lo ocurrido de forma épica y clara:
    - Describe si el ataque impacta (según tu criterio).
    - Describe cómo el arma/hechizo afecta al enemigo.
    - Reacciona con el enemigo (herido, derrotado, furioso, etc.).
    - No tires dados. No inventes números. Solo narra con lo que se te ha dado.
    - Genera como maximo 3 lineas

    - Si saca un 1, es un fallo critico, y si saca un 20, es un exito critico. Usa eso para darle mas emocion al combate
    - Tienes permiso para humillar al personaje si saca un 1 o una tirada muy mala

    `;

    console.log(input.value)


    puter.ai.chat(contextMessage)
        .then(response => {
            output.textContent = response;
            copyToClipboard(output.textContent) // --> arreglar
    }); 
    
}

function copyToClipboard(textToCopy) {
    navigator.clipboard.writeText(textToCopy)
}   

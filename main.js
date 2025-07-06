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
      nivel: 4,
      hp: 19,
      hechizos: [
        { nombre: "Rayo Escarcha", bonificacionAtaque: 5, dadosDano: "1d8" },
        { nombre: "Misil Mágico", bonificacionAtaque: 0, dadosDano: "3d4 + 3" }
      ],
      armas: [] // en caso de que tenga una daga, por ejemplo
    },
    {
      nombre: "Bofur Romperroca",
      clase: "Guerrero",
      nivel: 3,
      hp: 33,
      armas: [
        { nombre: "Hacha Enana", bonificacionAtaque: 6, dadosDano: "2d6 + 2" },
        { nombre: "Espada corta", bonificacionAtaque: 5, dadosDano: "1d6 + 3" }
      ],
      hechizos: []
    },
    {
      nombre: "Erevan Mindartis",
      clase: "Paladín",
      nivel: 3,
      hp: 29,
      armas: [
        { nombre: "Arco Largo", bonificacionAtaque: 4, dadosDano: "1d8 + 2" },
        { nombre: "Espada larga", bonificacionAtaque: 5, dadosDano: "1d8 + 3" }
      ],
      hechizos: []
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
  estadoPartida.jugadores.forEach(j => {
    const option = document.createElement("option");
    option.value = j.nombre;
    option.textContent = j.nombre;
    personajeSelect.appendChild(option);
  });

  const enemigoSelect = document.getElementById("enemigo");
  estadoPartida.enemigos.forEach(e => {
    const option = document.createElement("option");
    option.value = e.nombre;
    option.textContent = e.nombre;
    enemigoSelect.appendChild(option);
  });
};

function actualizarArmas() {
  const armaSelect = document.getElementById("arma");
  armaSelect.innerHTML = ""; // Limpiar

  const nombreSeleccionado = document.getElementById("personaje").value;
  const jugador = estadoPartida.jugadores.find(j => j.nombre === nombreSeleccionado);

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

    El jugador ha dicho: "${textoUsuario}"

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


    puter.ai.chat(contextMessage)
        .then(response => {
            output.textContent = response

x        });
}
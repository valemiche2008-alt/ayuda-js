// ======================================
// URL DE LA API (JSON SERVER)
// ======================================

// Aquí guardamos la ruta del servidor.
// Ese servidor viene de json-server.
const API =
    'http://localhost:3000/tasks';


// ======================================
// ELEMENTOS DEL HTML
// ======================================

// Obtiene el input donde el usuario
// escribe el nombre de la tarea
const titleInput =
    document.getElementById('title');


// Obtiene el select donde el usuario
// escoge la prioridad
const priorityInput =
    document.getElementById('priority');


// Obtiene el botón guardar
const saveBtn =
    document.getElementById('saveBtn');


// Obtiene el contenedor donde
// se mostrarán las tareas
const taskList =
    document.getElementById('taskList');


// Obtiene el párrafo donde
// aparecerán mensajes de error
const error =
    document.getElementById('error');


// ======================================
// VARIABLE DE EDICIÓN
// ======================================

// Guarda el id de la tarea
// que estamos editando

// null significa:
// "no estoy editando nada"
let editingId = null;



// ======================================
// GET → LEER TAREAS
// ======================================

// async significa que esta función
// trabajará con algo que tarda
// (como una petición a un servidor)

async function getTasks() {

    // fetch hace una petición
    // al servidor

    // await espera la respuesta
    const response =
        await fetch(API);

    // convierte la respuesta JSON
    // a un array de JavaScript
    const tasks =
        await response.json();

    // manda las tareas para
    // mostrarlas en pantalla
    renderTasks(tasks);
}




// ======================================
// RENDER → MOSTRAR TAREAS
// ======================================

// recibe un array de tareas
function renderTasks(tasks) {

    // limpia el contenedor antes
    // de volver a renderizar
    // para evitar duplicados
    taskList.innerHTML = '';

    // recorre todas las tareas
    tasks.forEach(task => {

        // crea un div nuevo
        const card =
            document.createElement('div');

        // agrega clases Tailwind
        // para darle diseño
        card.className =
            'bg-slate-800 p-5 rounded-xl flex justify-between items-center';

        // inserta HTML dentro
        // de la tarjeta
        card.innerHTML = `

            <div>

                <!-- muestra título -->
                <h2 class="text-xl font-bold">
                    ${task.title}
                </h2>

                <!-- muestra prioridad -->
                <p>
                    Prioridad:
                    ${task.priority}
                </p>

            </div>

            <div class="flex gap-2">

                <!-- botón editar -->
                <button

                    onclick="editTask(
                        '${task.id}',
                        '${task.title}',
                        '${task.priority}'
                    )"

                    class="bg-yellow-500 px-4 py-2 rounded"
                >
                    Editar
                </button>


                <!-- botón eliminar -->
                <button

                    onclick="deleteTask('${task.id}')"

                    class="bg-red-600 px-4 py-2 rounded"
                >
                    Eliminar
                </button>

            </div>
        `;

        // mete la tarjeta dentro
        // del contenedor HTML
        taskList.appendChild(card);
    });
}




// ======================================
// VALIDACIONES
// ======================================

// revisa si los datos
// son válidos
function validate(title, priority) {

    // trim() elimina espacios

    // si el usuario no escribe nada
    if (title.trim() === '') {

        // muestra error
        error.textContent =
            'La tarea está vacía';

        // detiene el proceso
        return false;
    }


    // si tiene menos de 3 letras
    if (title.length < 3) {

        // muestra error
        error.textContent =
            'Debe tener mínimo 3 letras';

        // detiene ejecución
        return false;
    }


    // si no seleccionó prioridad
    if (priority === '') {

        // muestra error
        error.textContent =
            'Selecciona prioridad';

        // detiene ejecución
        return false;
    }


    // limpia errores
    // si todo está bien
    error.textContent = '';

    // significa:
    // "todo salió bien"
    return true;
}




// ======================================
// CREATE + UPDATE
// ======================================

// escucha cuando el usuario
// da click al botón guardar
saveBtn.addEventListener(
    'click',

    // función async porque
    // usa fetch()
    async () => {

        // obtiene lo escrito
        // por el usuario
        const title =
            titleInput.value;


        // obtiene la prioridad
        const priority =
            priorityInput.value;


        // ejecuta validaciones
        const valid =
            validate(
                title,
                priority
            );

        // si no es válido
        // detiene el código
        if (!valid) return;


        // crea objeto tarea
        const task = {

            // nombre de tarea
            title,

            // prioridad
            priority
        };


        // =====================
        // UPDATE
        // =====================

        // si editingId tiene valor
        // significa que editamos
        if (editingId) {

            // fetch actualiza tarea
            await fetch(
                `${API}/${editingId}`,

                {
                    // PUT = actualizar
                    method: 'PUT',

                    // indica que enviamos JSON
                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    // convierte objeto a JSON
                    body:
                        JSON.stringify(task)
                }
            );

            // deja de editar
            editingId = null;

            // vuelve texto normal
            saveBtn.textContent =
                'Guardar tarea';

        } else {

            // =====================
            // CREATE
            // =====================

            // crea una tarea nueva
            await fetch(API, {

                // POST = crear
                method: 'POST',

                // tipo de datos
                headers: {
                    'Content-Type':
                        'application/json'
                },

                // convierte objeto
                // a JSON
                body:
                    JSON.stringify(task)
            });
        }


        // limpia input
        titleInput.value = '';

        // limpia select
        priorityInput.value = '';

        // vuelve a cargar tareas
        getTasks();
    }
);




// ======================================
// EDITAR TAREA
// ======================================

// recibe id, title y priority
function editTask(
    id,
    title,
    priority
) {

    // pone el nombre
    // en el input
    titleInput.value =
        title;


    // pone prioridad
    // en el select
    priorityInput.value =
        priority;


    // guarda el id
    // para actualizar luego
    editingId = id;


    // cambia texto del botón
    saveBtn.textContent =
        'Actualizar tarea';
}




// ======================================
// DELETE → ELIMINAR
// ======================================

async function deleteTask(id) {

    // ventana emergente
    // para confirmar
    const confirmation =
        confirm(
            '¿Eliminar tarea?'
        );

    // si cancela
    // se detiene
    if (!confirmation) return;


    // fetch para eliminar
    await fetch(
        `${API}/${id}`,

        {
            // DELETE = eliminar
            method: 'DELETE'
        }
    );

    // vuelve a cargar tareas
    getTasks();
}




// ======================================
// INICIO DE LA SPA
// ======================================

// al abrir la página
// trae todas las tareas
getTasks();

/**
 * @class Task
 * @classdesc Modelo de tarea
 * 
 * Entidad que contiene las propiedades de una tarea.
 */
class Task {
    /**
     * Información para la base de datos.
     * @private
     * @type {mixed[]}
     */
    #meta = {
        /**
         * Fecha en la que se creó la tarea
         * @private
         * @type {Date}
         */
        createdAt: null,
        /**
         * Fecha en la que se actualizó la tarea
         * @private
         * @type {Date}
         */
        updatedAt: null,
        /**
         * Fecha en al que se eliminó la tarea
         * @private
         * @type {Date}
         */
        deletedAt: null,
        /**
         * Indicador si la tarea está borrada o no
         * @private
         * @type {boolean}
         */
        deleted: null,
        /**
         * Índice de la tarea en la base de datos
         * @private
         * @type {number}
         */
        index: 0
    };
    /**
     * Título de la tarea
     * @public
     * @type {string}
     */
    title = "";
    /**
     * Descripción de la tarea
     * @public
     * @type {string}
     */
    description = "";
    /**
     * Detalles especificos de la tarea
     * @public
     * @type {string}
     */
    details = "";
    /**
     * Fecha limite para cumplir la tarea
     * @public
     * @type {Date}
     */
    deadline = null;
    /**
     * Enlace a la vista completa de la tarea
     * @public
     * @type {string}
     */
    link = "";
    /**
     * Tareas relacionadas con ésta
     * @public
     * @type {Task[]}
     */
    related = [];
    /**
     * Tarea previa a completar ésta. 
     * @public
     * @type {Task}
     */
    previous = null;
    /**
     * Tarea a completar después de ésta.
     * @public
     * @type {Task}
     */
    next = null;
    /**
     * Indicador si la tarea fue completada.
     * @public
     * @type {boolean}
     */
    completed = null;
};

export default Task;
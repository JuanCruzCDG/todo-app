'use strict';

const validator = {
    invalid: function(element) {
        return element == ''   ||
               element ==  0   ||
               element == null ||
               element == undefined;
    },
    validateTask: function(task) {
        return task.forEach((currentField) => {
            if (this.invalid(currentField)) throw new ReferenceError(`El campo ${currentField} no es valido.`); 
        });
    },
    validateFiledTypes: function(task) {
        if (typeof task.createdAt   != 'Object')  throw new TypeError(`El campo 'createdAt' debe ser de tipo 'Date', es '${typeof task.createdAt}'.`);
        if (typeof task.updatedAt   != 'Object')  throw new TypeError(`El campo 'updatedAt' debe ser de tipo 'Date', es '${typeof task.updatedAt}'.`);
        if (typeof task.deletedAt   != 'Object')  throw new TypeError(`El campo 'deletedAt' debe ser de tipo 'Date', es '${typeof task.deletedAt}'.`);
        if (typeof task.completedAt != 'Object')  throw new TypeError(`El campo 'completedAt' debe ser de tipo 'Date', es '${typeof task.completedAt}'.`);
        if (typeof task.deleted     != 'boolean') throw new TypeError(`El campo 'deleted' debe ser de tipo 'Boolean', es '${typeof task.deleted}'.`);
        if (typeof task.completed   != 'boolean') throw new TypeError(`El campo 'completed' debe ser de tipo 'Boolean', es '${typeof task.completed}'.`);
        if (typeof task.index       != 'number')  throw new TypeError(`El campo 'index' debe ser de tipo 'Number', es '${typeof task.index}'.`);
        if (typeof task.title       != 'string')  throw new TypeError(`El campo 'title' debe ser de tipo 'String', es '${typeof task.title}'.`);
        if (typeof task.description != 'string')  throw new TypeError(`El campo 'description' debe ser de tipo 'String', es '${typeof task.description}'.`);
        if (typeof task.details     != 'string')  throw new TypeError(`El campo 'details' debe ser de tipo 'String', es '${typeof task.details}'.`);
        if (typeof task.deadline    != 'Object')  throw new TypeError(`El campo 'deadline' debe ser de tipo 'Date', es '${typeof task.deadline}'.`);
        if (typeof task.link        != 'string')  throw new TypeError(`El campo 'link' debe ser de tipo 'String', es '${typeof task.link}'.`);
        if (typeof task.related     != 'number')  throw new TypeError(`El campo 'related' debe ser de tipo 'Number', es '${typeof task.related}'.`);
        if (typeof task.previous    != 'number')  throw new TypeError(`El campo 'previous' debe ser de tipo 'Number', es '${typeof task.previous}'.`);
        if (typeof task.next        != 'number')  throw new TypeError(`El campo 'next' debe ser de tipo 'Number', es '${typeof task.next}'.`);
    }
}

export default validator;
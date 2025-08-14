'use strict';

const validator = {
    invalid: function(element) {
        return element == ''   ||
               element ==  0   ||
               element == null ||
               element == undefined;
    },
    validateTask: function(task) {
        return task.forEach((currentField, index) => {
            if (this.invalid(currentField)) throw new ReferenceError(`El campo ${Object.keys(task)[index]} no es valido.`); 
        });
    },
    validateFiledTypes: function(task) {
        task.forEach((field, index) => {
            switch (fieldName = Object.keys(task)[index]) {
                case 'createdAt':
                case 'updatedAt':
                case 'deletedAt':
                case 'completedAt':
                case 'deadline':
                    if (typeof field != 'object')
                    throw new TypeError(`El campo '${fieldName}' debe ser de tipo 'Date', es '${typeof field}'.`);
                    break;
                case 'deleted':
                case 'completed':
                    if (typeof field != 'boolean')
                    throw new TypeError(`El campo '${fieldName}' debe ser de tipo 'Boolean', es '${typeof field}'.`);
                    break;
                case 'index':
                case 'previous':
                case 'next':
                    if (typeof field != 'number')
                    throw new TypeError(`El campo '${fieldName}' debe ser de tipo 'Number', es '${typeof field}'.`);
                    break;
                case 'title':
                case 'description':
                case 'details':
                case 'link':
                    if (typeof field != 'string')
                    throw new TypeError(`El campo '${fieldName}' debe ser de tipo 'String', es '${typeof field}'.`);
                    break;
                case 'related':
                    if (typeof field != 'array')
                    throw new TypeError(`El campo '${fieldName}' debe ser de tipo 'Array', es '${typeof field}'.`);
                    break;            
                default: throw new Error('Campo no reconocido.');
            }
        });
    }
}

export default validator;
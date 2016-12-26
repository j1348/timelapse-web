/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
/* eslint-disable no-param-reassign*/
import 'whatwg-fetch';
import { convertToRaw } from 'draft-js';

function updateTodo(headers, todo, raw) {
    return fetch(`/todo/${todo._id}`, {
        headers,
        method: 'PUT',
        body: JSON.stringify({
            name: todo.name,
            raw,
        }),
    }).then(response => response.json());
}

function save(headers, todo, raw) {
    return fetch('/todo', {
        headers,
        method: 'POST',
        body: JSON.stringify({
            name: todo.name,
            raw,
        }),
    }).then(response => response.json());
}

export default {
    get: token => fetch('/todo', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json()),
    delete: (token, todo) => fetch(`/todo/${todo._id}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then(response => response.json()),
    createOrUpdateTodo: (token, todo) => {
        const raw = JSON.stringify(convertToRaw(todo.editorState.getCurrentContent()));
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };

        if (todo._id) {
            updateTodo(headers, todo, raw);
            return;
        }

        save(headers, todo, raw)
            .then((newTodo) => {
                todo = newTodo;
            });
    },
};

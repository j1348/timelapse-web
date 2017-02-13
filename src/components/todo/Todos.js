import React from 'react';
import { createEditorState, Editor } from 'medium-draft';
import todoService from './todoService';
import debounce from '../../utils/debounce';

const saveOrUpdate = debounce(todoService.createOrUpdateTodo, 500);

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: [] };

        this.onChange = (editorState, i) => {
            const todo = this.state.todos[i];
            todo.editorState = editorState;
            this.setState({ todos: this.state.todos });

            saveOrUpdate(this.props.token, todo);
        };
    }

    componentWillMount() {
        todoService.get(this.props.token)
            .then((tmp) => {
                const todos = [{
                    name: 'new todo',
                    editorState: createEditorState()
                }].concat(tmp.map((todo) => {
                    const data = todo.raw ? JSON.parse(todo.raw) : undefined;
                    const newTodo = todo;
                    newTodo.editorState = createEditorState(data);
                    return newTodo;
                }).reverse());

                this.setState({ todos });
            });
    }

    delete(todo, i) {
        this.state.todos.splice(i, 1);
        this.setState({ todos: this.state.todos });

        todoService.delete(this.props.token, todo);
    }

    render() {
        return (<div className="todos">
          { this.state.todos.map((todo, i) => (<div className="todo" key={i}>
            <svg className="icon-close" onClick={() => { this.delete(todo, i); }}>
              <use xlinkHref="#icon-close" />
            </svg>
            <Editor
              editorState={todo.editorState}
              placeholder="..."
              onChange={(editorState) => { this.onChange(editorState, i); }}
            />
          </div>)) }
        </div>);
    }
}

Todos.propTypes = {
    token: React.PropTypes.string.isRequired
};

export default Todos;

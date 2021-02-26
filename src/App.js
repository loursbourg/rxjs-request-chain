import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { from, of } from 'rxjs';
import {
  catchError,
  concatMap,
  delay,
  map,
  mergeMap,
  take,
} from 'rxjs/operators';
import axios from 'axios';
import { Spinner } from './components/Spinner';

const App = () => {
  const [state, setState] = useState({
    todos: [],
    isLoading: false,
  });

  const loadTodos = () => {
    setState({ ...state, isLoading: true });
    axios.get('https://jsonplaceholder.typicode.com/todos').then((response) => {
      setState({
        ...state,
        isLoading: false,
        todos: response.data,
      });
    });
  };

  useEffect(() => {
    loadTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isSyncing, setIsSyncing] = useState(false);

  const deletetodo = (todo) => {
    setState((_s) => {
      return {
        ..._s,
        todos: _s.todos.filter((x) => x.id !== todo.id),
      };
    });
  };

  const startSynchronization = () => {
    setIsSyncing(true);
    from(state.todos)
      .pipe(
        // taks 10 todos
        take(10),
        concatMap((todo) =>
          of(todo).pipe(
            // insert a small delay between requests
            // to not upset the server
            delay(200),
            mergeMap((t) =>
              axios.post('https://jsonplaceholder.typicode.com/todos', {
                title: t.title,
                completed: true,
              })
            ),
            map((response) => ({
              response,
              todo,
              is_successfull: true,
            })),
            catchError((response) =>
              of({
                response,
                todo,
                is_successfull: false,
              })
            )
          )
        )
      )
      .subscribe(
        (result) => onSynchronizationResult(result),
        (error) => console.log('This actually will never be reached!'),
        () => onSynchronizationFinished()
      );
  };

  const onSynchronizationResult = (result) => {
    let { response, todo } = result;
    if (result.is_successfull) {
      deletetodo(todo);
    } else {
      // handle error
      console.log(response);
    }
  };

  const onSynchronizationFinished = () => {
    setIsSyncing(false);
  };

  return (
    <div className="App">
      <div className="uk-container uk-container-center uk-margin-top uk-margin-large-bottom">
        <Navbar />
        <div className="uk-grid">
          <div className="uk-width-1-1 uk-text-center uk-row-first">
            <h1 className="uk-heading-small">Chain HTTP Requests with RxJS</h1>
            <p className="uk-text-large">
              A small example to demonstrate how to chain multiple http
              requests.
            </p>
          </div>
        </div>
        <hr className="uk-grid-divider " />

        {/* Sync button */}
        <div className="uk-text-center uk-margin-small-bottom">
          <button
            disabled={isSyncing}
            onClick={startSynchronization}
            className="uk-button uk-button-primary"
          >
            Sync 10 Todos!
          </button>
        </div>

        <div className="uk-grid-medium uk-child-width-expand@s uk-text-center">
          <div>
            <div className="uk-card uk-card-default uk-card-body">
              <div>{state.isLoading && <Spinner />}</div>
              <table className="uk-table">
                <caption>List of Todos</caption>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {state.todos.map((t) => (
                    <tr key={t.id}>
                      <td>{t.id}</td>
                      <td>{t.title}</td>
                      <td>{t.completed ? 'COMPLETED' : 'PENDING'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

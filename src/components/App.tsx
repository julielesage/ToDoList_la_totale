import * as React from "react";

export default class App extends React.Component<{}, IState> {
  // ts : <any, any> any pour les props, any pour le state
  constructor(props: {}) {
    super(props);

    this.state = {
      currentTask: "",
      tasks: [],
    };
  }

  // dans Typescript les fonctions doivent etre typées publiques, protégées ou privées : public si ca affiche quelque chose, each is public by default
  // on doit aussi spécifier ce qu'une fonction doit rendre avec typescript:
  private _timeInMilliseconds(): number {
    const date: Date = new Date();
    return date.getTime();
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.setState({
      currentTask: "",
      tasks: [
        ...this.state.tasks,
        {
          id: this._timeInMilliseconds(),
          value: this.state.currentTask,
          completed: false,
        },
      ],
    });
  }

  public deleteTask(id: number): void {
    const filteredTasks: Array<ITask> = this.state.tasks.filter(
      (task: ITask) => task.id !== id
    );
    this.setState({ tasks: filteredTasks });
  }

  public toggleDone(i: number): void {
    let task: ITask[] = this.state.tasks.splice(i, 1);
    // modifie tasks et task = [la fameuse task supprimée]
    task[0].completed = !task[0].completed;
    const tasks: ITask[] = [...this.state.tasks, ...task];
    // concaténation de 2 [], pour mettre les done en fin de tableau
    this.setState({ tasks });
  }

  public renderTasks(): JSX.Element[] {
    return this.state.tasks.map((task: ITask, index: number) => {
      return (
        <div key={task.id} className="tdl-task">
          <span className={task.completed ? "is-completed" : ""}>
            {task.value}
          </span>
          <button onClick={() => this.deleteTask(task.id)}>Delete</button>
          <button onClick={() => this.toggleDone(index)}>
            {task.completed ? "Undo" : "Done"}
          </button>
        </div>
      );
    });
  }

  public render(): JSX.Element {
    console.log(this.state);
    let tab = [1, 2, 3, 4].splice(2, 1);
    console.log(tab);
    return (
      <div>
        <h1>React Typescript Todo List</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            className="tdl-input"
            placeholder="what to do ?"
            onChange={(e) => this.setState({ currentTask: e.target.value })}
            value={this.state.currentTask}
          />
          <button type="submit">Add Task</button>
        </form>
        <section>{this.renderTasks()}</section>
      </div>
    );
  }
}

interface IState {
  currentTask: string;
  tasks: Array<ITask>;
}

interface ITask {
  id: number;
  value: string;
  completed: boolean;
}

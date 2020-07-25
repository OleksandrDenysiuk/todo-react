import React, {Component} from "react";
import './app.css';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

export default class App extends Component{

    maxId = 100;

    state = {
        data: [
            {label: 'Drink Coffee', important: false, id: 1},
            {label: 'Make Awesome App', important: true, id: 2},
            {label: 'Have a lunch', important: false, id: 3}
        ]
    }

    addItem = (text) => {
        this.setState(({data}) => {
            const newItem = {label: text, important: false, id: this.maxId++};
            const newData = [...data, newItem];
            return {
                data: newData
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const idx = data.findIndex((el) => el.id === id);
            const without = [
                ...data.slice(0,idx),
                ...data.slice(idx + 1)
            ];
            return {
                data: without
            };
        })
    }

    render() {
        const {data} = this.state;
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList todos={data}
                onDelete={this.deleteItem}/>
                <ItemAddForm onItemAdd={this.addItem}/>
            </div>
        );
    }
}
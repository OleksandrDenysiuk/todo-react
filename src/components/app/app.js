import React, {Component} from "react";
import './app.css';
import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

export default class App extends Component {

    maxId = 100;

    state = {
        data: [
            this.createItem('Drink Coffee'),
            this.createItem('Make Awesome App'),
            this.createItem('Have a lunch')

        ],
        searchFilter: '',
        filter: 'active'
    }

    createItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    }

    addItem = (text) => {
        this.setState(({data}) => {
            const newData = [...data, this.createItem(text)];
            return {
                data: newData
            }
        })
    };

    search = (items, term) => {
        if(term.length === 0){
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    filter(items, filter){
        switch (filter) {
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            case 'all':
                return items;
            default:
                return items;
        }
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};
        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    }

    setImportantItem = (id) => {
        this.setState(({data}) => {
            return {
                data: this.toggleProperty(data, id, 'important')
            }
        })
    };

    setDoneItem = (id) => {
        this.setState(({data}) => {
            return {
                data: this.toggleProperty(data, id, 'done')
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const idx = data.findIndex((el) => el.id === id);
            const without = [
                ...data.slice(0, idx),
                ...data.slice(idx + 1)
            ];
            return {
                data: without
            };
        })
    }

    onSearchUpdate = (searchFilter) => {
        this.setState({searchFilter});
    }

    onFilterUpdate = (filter) => {
        console.log('change');
        this.setState({filter});
    }

    render() {
        const {data, searchFilter, filter} = this.state;
        const doneAmount = data.filter((el) => el.done).length;
        const todoAmount = data.length - doneAmount;
        const posts = this.filter(this.search(data, searchFilter), filter);
        return (
            <div className="todo-app">
                <AppHeader
                    toDo={todoAmount}
                    done={doneAmount}
                />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchUpdate={this.onSearchUpdate}/>
                    <ItemStatusFilter
                        filter={filter}
                    onFilterUpdate={this.onFilterUpdate}/>
                </div>

                <TodoList todos={posts}
                          onDelete={this.deleteItem}
                          onToggleImportant={this.setImportantItem}
                          onToggleDone={this.setDoneItem}
                />
                <ItemAddForm onItemAdd={this.addItem}/>
            </div>
        );
    }
}
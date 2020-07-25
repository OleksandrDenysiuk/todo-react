import React, {Component} from "react";
import './search-panel.css';

export default class SearchPanel extends Component {
    state = {
        searchValue: ''
    }

    onUpdateSearch = (e) => {
        const newValue = e.target.value;
        this.setState({searchValue: newValue});
        this.props.onSearchUpdate(newValue);
    }

    render() {
        return (
            <input type="text"
                   className="form-control search-input"
                   onChange={this.onUpdateSearch}
                   placeholder="type to search"
                   value={this.state.searchValue}/>
        );
    }
}
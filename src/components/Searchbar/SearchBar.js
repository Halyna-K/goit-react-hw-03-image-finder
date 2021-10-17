import s from "./SearchBar.module.css";
import { Component } from "react";

export class SearchBar extends Component {
  state = {
    searchValue: "",
    perPage: 12,
  };
  handleSearchChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("BEFORE FETCH", this.state.searchValue, this.state.perPage);
    // this.setState({ searchValue: '' });
    this.props.getSearchValues(this.state.searchValue, this.state.perPage);
    this.setState({ searchValue: "", perPage: 12 });
  };
  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSearchSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={s.SearchFormInput}
            type="text"
            name="searchValue"
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

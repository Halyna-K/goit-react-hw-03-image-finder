import axios from "axios";

export class FetchObject {
  constructor(base_url, api_key) {
    this.base_url = base_url;
    this.api_key = api_key;
    this._query = "";
    this._page = 1;
    this._perPage = 12;
    this.endPoint = "";
  }
  get searchQuery() {
    return this._query;
  }
  set searchQuery(value) {
    return (this._query = value);
  }
  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page += value);
  }
  resetPage() {
    return (this._page = 1);
    // ((this._perPage = 12));
  }
  get perPage() {
    return this._perPage;
  }
  set perPage(value) {
    return (this._perPage = value);
  }

  async searchPhotos() {
    axios.defaults.baseURL = this.base_url;

    let params = `?key=${this.api_key}&q=${this.query}&page=${this.page}&per_page=${this.perPage}`;
    let url = this.endPoint + params;

    try {
      const result = await axios.get(url);
      const data = result.data.hits;
      return data;
    } catch (err) {
      return err.message;
    }
  }
}

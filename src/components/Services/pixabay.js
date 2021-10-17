import axios from "axios";

export class PixabayFetchObject {
  constructor(base_url, api_key) {
    this.base_url = base_url;
    this.api_key = api_key;
    this._searchQuery = "";
    this._page = 1;
    this._perPage = 12;
    this.endPoint = "";
  }
  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }
  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page += value);
  }
  resetPage() {
    return (this._page = 1)((this._perPage = 12));
  }
  get perPage() {
    return this._perPage;
  }
  set perPage(value) {
    return (this._perPage = value);
  }

  async searchPhotos() {
    axios.defaults.baseURL = this.base_url;
    axios.defaults.headers.common.Authorization = this.api_key;

    this.endPoint = "search";
    // console.log(
    //   "searchQuery:",
    //   this.searchQuery,
    //   "page:",
    //   this.page,
    //   "perPage:",
    //   this.perPage
    // );
    let params = `?q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}`;
    let url = this.endPoint + params;

    try {
      const result = await axios.get(url);
      const data = result.data.photos;
      return data;
    } catch (err) {
      return err.message;
    }
    // return axios
    //   .get(url)
    //   .then(result => {
    //     // console.log(result);
    //     return result.data;
    //   })
    //   .then(data => {
    //     // console.log(data);
    //     return data.photos;
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }
}

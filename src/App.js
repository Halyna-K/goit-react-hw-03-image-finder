import "./App.css";
import { Component } from "react";
import { SearchBar } from "./components/Searchbar/SearchBar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
// import ImageGalleryItem from "./components/ImageGalleryItem/ImageGalleryItem";
// import { Modal } from './components/Modal/Modal';

// let searchQuery = 'banana';
// let searchPage = 1;
// let searchPerPage = 5;
// let endPoint = 'search';
// let params = `?query=${searchQuery}&page=${searchPage}&per_page=${searchPerPage}`;
// let url = endPoint + params;

class App extends Component {
  state = {
    counter: 0,
    isOpen: false,

    images: [],
    showModal: false,
    searchValue: "",
    perPage: 12,
  };
  componentDidMount() {
    // console.log(`MOUNT`);
    const localProducts = localStorage.getItem("products");
    const parseProducts = JSON.parse(localProducts);
    if (parseProducts) {
      this.setState({ images: parseProducts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(`UPDATE`);
    if (prevState.images !== this.state.images) {
      localStorage.setItem("products", JSON.stringify(this.state.images));
    }
    // if (prevState.searchValue !== this.state.searchValue) {
    //   console.log(`dd`);
    // }
  }

  componentWillUnmount() {
    // console.log(`UNMOUNT`);
  }

  addNewImage = (obj) =>
    this.setState((prevState) => ({
      images: [...prevState.images, obj],
    }));

  deleteImage = (id) =>
    this.setState((prev) => ({
      images: prev.images.filter((prod) => prod.id !== id),
    }));
  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  getSearchValues = (searchValue, perPage) =>
    this.setState({ searchValue, perPage });

  render() {
    // console.log(`RENDER method`);
    const { searchValue, perPage } = this.state;
    return (
      <div className="App">
        <SearchBar getSearchValues={this.getSearchValues} />
        <ImageGallery searchValue={searchValue} perPage={perPage} />

        {/* {this.state.showModal && (
          <Modal toggleModal={this.toggleModal}>
            <Form addNewImage={this.addNewImage} />
          </Modal>
        )}
        <h1>FE-35 Product</h1>
        <button type="button" onClick={this.toggleModal}>
          Add Product
        </button>
        {/* === РЕНДЕР КОМПОНЕНТА СПИСКА ПРОДУКТОВ ===
        <ProductList
          products={this.state.images}
          onDeleteProduct={this.deleteProduct}
        /> */}
      </div>
    );
  }
}
export default App;

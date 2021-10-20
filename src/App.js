import "./App.css";
import { Component } from "react";
import { SearchBar } from "./components/Searchbar/SearchBar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Modal } from "./components/Modal/Modal";
import LoaderSpinner from "./components/Loader/Loader";

class App extends Component {
  state = {
    images: [],
    searchValue: "",
    perPage: 12,
    showModal: false,
    largeImage: "",
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.images !== this.state.images) {
      this.setState(this.state.images);
      this.setState({ isLoading: true });
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  onImageClick = (largeImageURL) => {
    this.setState({ largeImage: largeImageURL });
    this.toggleModal();
  };

  getSearchValues = (searchValue, perPage) =>
    this.setState({ searchValue, perPage });

  render() {
    const { searchValue, perPage, showModal, largeImage, isLoading } =
      this.state;

    return (
      <div className="App">
        <SearchBar getSearchValues={this.getSearchValues} />

        <ImageGallery
          searchValue={searchValue}
          perPage={perPage}
          onImageClick={this.onImageClick}
        />
        {isLoading && <LoaderSpinner />}

        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <img src={largeImage} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}
export default App;

import "./App.css";
import { Component } from "react";
import { SearchBar } from "./components/Searchbar/SearchBar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./components/ImageGalleryItem/ImageGalleryItem";
import { Button } from "./components/Button/Button";
import { Modal } from "./components/Modal/Modal";
import LoaderSpinner from "./components/Loader/Loader";

class App extends Component {
  state = {
    images: [],
    searchValue: "",
    perPage: 12,
    showModal: false,
    largeImage: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.images !== this.state.images) {
      this.setState(this.state.images);
    }
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  onImageClick = (e) => {
    // if (e.currentTarget === e.target) {
    this.toggleModal();
    // this.setState({ largeImage: e.largeImageURL });
    // }
  };

  getSearchValues = (searchValue, perPage) =>
    this.setState({ searchValue, perPage });

  render() {
    const { images, searchValue, perPage, showModal } = this.state;
    console.log(this.state);
    return (
      <div className="App">
        <SearchBar getSearchValues={this.getSearchValues} />
        {/* <LoaderSpinner> */}
        <ImageGallery searchValue={searchValue} perPage={perPage} />
        {/* </LoaderSpinner> */}

        {showModal && (
          <Modal toggleModal={this.toggleModal}>
            <ImageGalleryItem
              image={this.props.image}
              // src={this.state.largeImage}
              onClick={this.toggleModal}
            />
            {/* <ImageGalleryItem
              src={images.largeImageURL}
              // onClick={() => {
              //   this.toggleModal();
              // }}
            /> */}
          </Modal>
        )}
      </div>
    );
  }
}
export default App;

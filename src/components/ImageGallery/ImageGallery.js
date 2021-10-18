import s from "./ImageGallery.module.css";
import { Component } from "react";
import { PixabayFetchObject } from "../Services/pixabay";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Button } from "..//Button/Button";

const base_url = `https://pixabay.com/api/`;
const api_key = `23194515-4229c06a71e7a36cb0b196559`;
const newPixabayFetchObject = new PixabayFetchObject(base_url, api_key);

export class ImageGallery extends Component {
  state = {
    searchResults: [],
  };
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevProps.perPage !== this.props.perPage
    ) {
      newPixabayFetchObject.resetPage();
      newPixabayFetchObject.query = this.props.searchValue;
      newPixabayFetchObject.perPage = this.props.perPage;
      newPixabayFetchObject
        .searchPhotos()
        .then((searchResults) => {
          this.setState({ searchResults });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.scrollToBottom();
  }

  handleClick = () => {
    newPixabayFetchObject.page = 1;
    newPixabayFetchObject
      .searchPhotos()
      .then((searchResults) => {
        this.setState((prev) => ({
          searchResults: [...prev.searchResults, ...searchResults],
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  render() {
    const { searchResults } = this.state;
    return (
      <>
        <ul className={s.ImageGallery}>
          {searchResults.map((el) => (
            <ImageGalleryItem
              key={el.id}
              image={el}
              src={el.largeImageURL}
              onClick={() => {
                this.toggleModal(el);
              }}
            />
          ))}

          {searchResults.length >= 12 && <Button onClick={this.handleClick} />}
        </ul>
      </>
    );
  }
}

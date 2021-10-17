import s from "./ImageGallery.module.css";
import { Component } from "react";
import { PixabayFetchObject } from "../Services/pixabay";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

const base_url = `https://pixabay.com/api/`;
const api_key = `23194515-4229c06a71e7a36cb0b196559`;
const newPixabayFetchObject = new PixabayFetchObject(base_url, api_key);
// console.log(newPixabayFetchObject);

export class ImageGallery extends Component {
  state = {
    searchResults: [],
    status: "init",
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.searchValue !== this.props.searchValue ||
      prevProps.perPage !== this.props.perPage
    ) {
      console.log(`get fetch`);
      this.setState({ status: "pending" });
      newPixabayFetchObject.resetPage();
      newPixabayFetchObject.searchQuery = this.props.searchValue;
      newPixabayFetchObject.perPage = this.props.perPage;
      newPixabayFetchObject
        .searchPhotos()
        .then((searchResults) => {
          console.log(searchResults);
          this.setState({ searchResults, status: "success" });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ status: "error" });
        });
    }
  }

  handleClick = () => {
    newPixabayFetchObject.page = 1;
    console.log(newPixabayFetchObject.page);
    newPixabayFetchObject
      .searchPhotos()
      .then((searchResults) => {
        console.log(searchResults);
        this.setState((prev) => ({
          searchResults: [...prev.searchResults, ...searchResults],
          status: "success",
        }));
      })
      .catch((err) => {
        console.log(err);
        this.setState({ status: "error" });
      });
  };

  render() {
    // if (this.state.status === "init") {
    //   return <h1>Hello! Search something</h1>;
    // }
    // if (this.state.status === "pending") {
    //   return <h1>Wait please!</h1>;
    // }
    // if (this.state.status === "success") {
    return (
      <>
        <ul className={s.ImageGallery}>
          {this.state.searchResults.map((el) => (
            <ImageGalleryItem key={el.id} />
            // <li key={el.id}>
            //   <img src={el.src.tiny} alt={el.photographer} />
            // </li>
          ))}
        </ul>
        <button type="button" onClick={this.handleClick}>
          load more
        </button>
      </>
    );
    // }
    // if (this.state.status === "error") {
    //   return <h1>ALARMA!!!</h1>;
    // }
  }
}

// const ImageGallery = ({ images }) => {
//   return (
//     <ul className={s.ImageGallery}>
//       {images.map((el) => (
//         <ImageGalleryItem
//         // key={el.id}
//         // isOnline={el.isOnline}
//         // avatar={el.avatar}
//         // name={el.name}
//         />
//       ))}
//     </ul>
//   );
// };

// export default ImageGallery;

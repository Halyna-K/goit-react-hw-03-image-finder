import s from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <li key={image.id} className={s.ImageGalleryItem} onClick={onClick}>
      <img
        src={image.webformatURL}
        alt={image.tags}
        className={s.ImageGalleryItemImage}
      />
    </li>
  );
};

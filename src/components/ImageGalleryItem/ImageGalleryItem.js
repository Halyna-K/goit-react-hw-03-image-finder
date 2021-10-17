import s from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ el }) => {
  return (
    console.log(el.hits),
    (
      <li key={el.id} className={s.ImageGalleryItem}>
        <img
          src={el.hits}
          alt={el.photographer}
          className={s.ImageGalleryItemImage}
        />
      </li>
    )
  );
};

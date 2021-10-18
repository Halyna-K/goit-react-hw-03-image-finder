import s from "./Button.module.css";

export const Button = ({ onClick }) => {
  return (
    <div className='container'>
      <button type="button" className={s.Button} onClick={onClick}>
        load more
      </button>
    </div>
  );
};

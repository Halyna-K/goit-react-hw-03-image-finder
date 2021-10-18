import s from "./Modal.module.css";
import { Component } from "react";
import { createPortal } from "react-dom";

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleEscape);
  }
  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscape);
  }

  handleEscape = (e) => {
    if (e.code === "Escape") {
      this.props.toggleModal();
    }
  };
  handleClose = (e) => {
    if (e.currentTarget === e.target) {
      this.props.toggleModal();
    }
  };
  render() {
    const { children } = this.props;
    return createPortal(
      <div className={s.Overlay} onClick={this.handleClose}>
        <div className={s.Modal}>{children}</div>
      </div>,
      document.getElementById("modalRoot")
    );
  }
}

import Loader from "react-loader-spinner";
import { Component } from "react";

export default class LoaderSpinner extends Component {
  // intervalId = null;
  // componentWillUnmount() {
  //   clearInterval(this.intervalId);
  // }
  render() {
    return (
      <Loader
        className="container"
        type="Grid"
        color="#3f51b5"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }
}

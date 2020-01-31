import React, { Component } from "react";
import tachyons from "tachyons";
import "./css/main.css";
import Stream from "./components/Stream";
import Nav from "./components/Nav";
import Logo from "./components/Logo";
import Spin from "./components/Spin";
import Play from "./components/Play";
import Pause from "./components/Pause";
import PlayWhite from "./components/PlayWhite";
import PauseWhite from "./components/PauseWhite";
import Home from "./components/Home";
import Volunteer from "./components/Volunteer";
import Djs from "./components/Djs";
import Archive from "./components/Archive";
import ReactPlayer from "react-player";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const liveStream = "http://curiaradio.ddns.net:8000/stream?type=.mp3";
const bootingUp = "yourURLorIMPORTtoYOURmp3";

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}

class App extends React.Component {
  state = {
    selectedTrack: null,
    player: "stopped",
    currentTime: null,
    duration: null,
    classes: "",
    readyToPlay: false,
    dj: "Muneca Bruja",
    location: "Auk Market"
  };

  componentDidMount() {
    this.player.addEventListener("timeupdate", e => {
      this.setState({
        currentTime: e.target.currentTime,
        duration: e.target.duration,
        readyToPlay: true
      });
    });
  }

  componentWillUnmount() {
    this.player.removeEventListener("timeupdate", () => {});
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedTrack !== prevState.selectedTrack) {
      let track;
      switch (this.state.selectedTrack) {
        case "Live Stream":
          track = liveStream;
          break;
        case "Booting Up":
          track = bootingUp;
          break;
        default:
          break;
      }
      if (track) {
        this.player.src = track;
        this.player.play();
        this.setState({ player: "playing", duration: this.player.duration });
      }
    }
    if (this.state.player !== prevState.player) {
      if (this.state.player === "paused") {
        this.player.pause();
      } else if (this.state.player === "stopped") {
        this.player.pause();
        this.player.currentTime = 0;
        this.setState({ selectedTrack: null });
      } else if (
        this.state.player === "playing" &&
        prevState.player === "paused"
      ) {
        this.player.play();
      }
    }
  }

  render() {
    const list = [{ id: 1, title: "Live Stream" }].map(item => {
      return (
        <li className="list pa3" key={item.id}>
          <Spin />
        </li>
      );
    });
    const {
      isPlaying,
      classes,
      readyToPlay,
      selectedTrack,
      dj,
      location
    } = this.state;

    return (
      <Router>
        <audio ref={ref => (this.player = ref)} />
        <div className="">
          <div className="main flex flex-wrap nowrap-ns vh-100 relative">
            <div className="player-frame w-100 w-40-ns ba bw2 b--black">
              <a href="./">
                <Logo />
              </a>
              <div className="marquee">
                <span className=" w-100 f3 bt bb bw2 b--black"></span>
              </div>
              <div className=" flex justify-center items-center controls ">
                <div className="relative">
                  <ul className={`easing ${classes}`}>{list}</ul>
                </div>
                <div className="absolute">
                  {this.state.player === "stopped" && (
                    <div
                      className=""
                      onClick={() =>
                        this.setState({
                          player: "playing",
                          classes: "spin",
                          selectedTrack: "Live Stream"
                        })
                      }
                    >
                      <Play />
                    </div>
                  )}
                  {this.state.player === "paused" && (
                    <div
                      className=""
                      onClick={() =>
                        this.setState({ player: "playing", classes: "spin" })
                      }
                    >
                      <Play />
                    </div>
                  )}

                  {this.state.player === "playing" && (
                    <div
                      onClick={() =>
                        this.setState({ player: "paused", classes: "return" })
                      }
                    >
                      <Pause />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="info-frame w-100 w-60-ns bt br bb bw2 b--black">
              <Nav />
              <Switch>
                <Route path="/volunteer">
                  <Volunteer />
                </Route>
                <Route path="/archive">
                  <Archive />
                </Route>
                <Route path="/djs">
                  <Djs />
                </Route>
                <Route
                  exact
                  path="/"
                  component={() => <Home {...this.state} {...this.actions} />}
                ></Route>
              </Switch>
            </div>
            <div className="playerInfo bottom-0 w-100 bg-black white pa3 fixed">
              <div className="mh3">
                {this.state.player === "stopped" && (
                  <div
                    className="flex space-between"
                    onClick={() =>
                      this.setState({
                        player: "playing",
                        classes: "spin",
                        selectedTrack: "Live Stream"
                      })
                    }
                  >
                    <div>
                      <PlayWhite />
                    </div>
                    <div>
                      <p className="white">Press play to start stream.</p>
                    </div>
                  </div>
                )}
                {this.state.player === "paused" && (
                  <div
                    className="flex space-between"
                    onClick={() =>
                      this.setState({ player: "playing", classes: "spin" })
                    }
                  >
                    <div>
                      <PlayWhite />
                    </div>
                    <div>
                      <p className="white">
                        {selectedTrack} – {dj} @ {location}
                      </p>
                    </div>
                  </div>
                )}

                {this.state.player === "playing" && (
                  <div
                    className="flex space-between"
                    onClick={() =>
                      this.setState({ player: "paused", classes: "return" })
                    }
                  >
                    <div>
                      <PauseWhite />
                    </div>
                    <div>
                      <p className="white">
                        {selectedTrack} – {dj} @ {location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

import React from "react";
import { shallow } from "enzyme";
import NowPlayingArea from "./NowPlayingArea";
import AppBar from "@material-ui/core/AppBar";

describe("<NowPlayingArea />", () => {
  it("renders an empty div if nowPlaying.title is falsy", () => {
    const wrapper = shallow(<NowPlayingArea />);
    expect(wrapper.find("div")).toHaveLength(1);
  });

  it("renders the Youtube component if nowPlaying.title is truthy", () => {
    const wrapper = shallow(<NowPlayingArea nowPlaying={{ title: "Hello Test" }} />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });
});

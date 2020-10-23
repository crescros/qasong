import React from "react";
import { shallow } from "enzyme";
import PlayArea from "./PlayArea";
import AppBar from "@material-ui/core/AppBar";

describe("<PlayArea />", () => {
  it("renders an empty div if nowPlaying.title is falsy", () => {
    const wrapper = shallow(<PlayArea />);
    expect(wrapper.find("div")).toHaveLength(1);
  });

  it("renders the Youtube component if nowPlaying.title is truthy", () => {
    const wrapper = shallow(<PlayArea nowPlaying={{ title: "Hello Test" }} />);
    expect(wrapper.find(AppBar)).toHaveLength(1);
  });
});

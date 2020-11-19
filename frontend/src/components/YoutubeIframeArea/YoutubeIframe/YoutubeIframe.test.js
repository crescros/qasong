import React from "react";
import { shallow } from "enzyme";
import YouTube from "react-youtube";

import YoutubeIframe from "./YoutubeIframe";

describe("<YoutubeIframe />", () => {
  it("renders an empty div if id is falsy", () => {
    const wrapper = shallow(<YoutubeIframe />);
    expect(wrapper.find("#empty-div")).toHaveLength(1);
  });

  it("renders the Youtube component if id is truthy", () => {
    const wrapper = shallow(<YoutubeIframe id="1" />);
    expect(wrapper.find(YouTube)).toHaveLength(1);
  });
});

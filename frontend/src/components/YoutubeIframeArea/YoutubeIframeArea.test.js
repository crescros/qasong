import React from "react";
import { shallow } from "enzyme";
import YoutubeIframeArea from "./YoutubeIframeArea";
import YoutubeIframe from "./YoutubeIframe/YoutubeIframe";

describe("<YoutubeIframeArea />", () => {
  it("renders an empty div if id is falsy", () => {
    const wrapper = shallow(<YoutubeIframeArea />);
    expect(wrapper.find("div")).toHaveLength(1);
  });

  it("renders the Youtube component if id is truthy", () => {
    const wrapper = shallow(<YoutubeIframeArea nowPlaying={{ videoId: "ABC" }} />);
    expect(wrapper.find(YoutubeIframe)).toHaveLength(1);
  });
});

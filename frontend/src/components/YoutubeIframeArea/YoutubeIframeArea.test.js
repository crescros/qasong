import React from "react";
import { shallow } from "enzyme";
import VideoArea from "./VideoArea";
import Video from "./Video/YoutubeIframe";

describe("<VideoArea />", () => {
  it("renders an empty div if id is falsy", () => {
    const wrapper = shallow(<VideoArea />);
    expect(wrapper.find("div")).toHaveLength(1);
  });

  it("renders the Youtube component if id is truthy", () => {
    const wrapper = shallow(<VideoArea nowPlaying={{ videoId: "ABC" }} />);
    expect(wrapper.find(Video)).toHaveLength(1);
  });
});

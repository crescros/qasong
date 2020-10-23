import React from "react";
import { shallow } from "enzyme";
import VideoGrid from "./VideoGrid";

describe("<VideoGrid />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<VideoGrid />);
    expect(wrapper.find("div")).toHaveLength(1);
  });
});

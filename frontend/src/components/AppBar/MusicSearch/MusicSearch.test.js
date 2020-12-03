import React from "react";
import { shallow } from "enzyme";
import MusicSearch from "./MusicSearch";

describe("<MusicSearch />", () => {
  it("renders a form", () => {
    const wrapper = shallow(<MusicSearch />);
    expect(wrapper.find("form")).toHaveLength(1);
  });
});

import React from "react";
import { shallow } from "enzyme";
import Playlist from "./Playlist";

describe("<Playlist />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<Playlist queue={[]} playlist={{ id: "3", queue: [] }} />);
    expect(wrapper.find(<div />)).toHaveLength(0);
  });
});

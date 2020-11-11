import React from "react";
import { shallow } from "enzyme";
import Playlist from "./Playlist";

describe("<Playlist />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<Playlist playlist={{id:"3"}} />);
    expect(wrapper.find(<div/>)).toHaveLength(0);
  });
});

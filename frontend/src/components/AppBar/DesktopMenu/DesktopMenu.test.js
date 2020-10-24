import React from "react";
import { shallow } from "enzyme";
import DesktopMenu from "./DesktopMenu";

describe("<DesktopMenu />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<DesktopMenu queue={[]} />);
    expect(wrapper.find("#desktop-menu")).toHaveLength(1);
  });
});

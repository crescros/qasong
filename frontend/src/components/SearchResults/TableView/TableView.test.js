import React from "react";
import { shallow } from "enzyme";
import TableView from "./TableView";

describe("<TableView />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<TableView />);
    expect(wrapper.find("div")).toHaveLength(1);
  });
});

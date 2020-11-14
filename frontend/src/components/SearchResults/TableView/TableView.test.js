import React from "react";
import { shallow } from "enzyme";
import VideoTable from "./TableView";

describe("<VideoTable />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<VideoTable />);
    expect(wrapper.find("div")).toHaveLength(1);
  });
});

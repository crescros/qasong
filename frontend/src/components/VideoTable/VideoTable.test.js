import React from "react";
import { shallow } from "enzyme";
import VideoTable from "./VideoTable";

describe("<VideoTable />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<VideoTable />);
    expect(wrapper.find("div")).toHaveLength(1);
  });
});

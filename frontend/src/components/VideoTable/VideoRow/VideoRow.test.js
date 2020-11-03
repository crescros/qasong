import React from "react";
import { shallow } from "enzyme";
import VideoRow from "./VideoRow";
import Table from "@material-ui/core/Table";

describe("<VideoCard />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<VideoRow video={{author:{}}} />);
    expect(wrapper.find(Table)).toHaveLength(1);
  });
});

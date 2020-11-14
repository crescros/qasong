import React from "react";
import { shallow } from "enzyme";
import VideoRow from "./ResultRow";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

describe("<VideoCard />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<VideoRow video={{ author: {} }} />);
    expect(wrapper.find(PlayArrowIcon)).toHaveLength(1);
  });
});

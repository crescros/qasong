import React from "react";
import { shallow } from "enzyme";
import ResultCard from "./ResultCard";
import Card from "@material-ui/core/Card";

describe("<ResultCard />", () => {
  it("renders a div", () => {
    const wrapper = shallow(<ResultCard video={{ author: {} }} />);
    expect(wrapper.find(Card)).toHaveLength(1);
  });
});

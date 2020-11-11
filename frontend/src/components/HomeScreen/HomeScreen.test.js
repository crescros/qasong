import React from "react";
import { shallow } from "enzyme";
import HomeScreen from "./HomeScreen";
import Box from "@material-ui/core/Box";

beforeAll(() => {
  process.env = Object.assign(process.env, { REACT_APP_NAME: "Hello Test" });
});

describe("<HomeScreen />", () => {
  it("renders an empty div if id is falsy", () => {
    const wrapper = shallow(<HomeScreen />);
    expect(wrapper.find("#empty-div")).toHaveLength(1);
  });

  it("renders the Youtube component if id is truthy", () => {
    const wrapper = shallow(<HomeScreen showHomeScreen={true} />);
    expect(wrapper.find(Box)).toHaveLength(2);
  });
});

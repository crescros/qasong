import { DndProvider } from "react-dnd";
import React from "react";
import { shallow } from "enzyme";
import QueueSection from "./QueueSection";

describe("<QueueSection />", () => {
  it("renders an empty div if id is falsy", () => {
    const wrapper = shallow(<QueueSection />);
    expect(wrapper.find("div")).toHaveLength(1);
  });

  it("renders the Youtube component if id is truthy", () => {
    const wrapper = shallow(<QueueSection showQueue={true} queue={[{}]} />);
    expect(wrapper.find(DndProvider)).toHaveLength(1);
  });
});

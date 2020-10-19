import React from "react";
import { shallow } from "enzyme";
import AppBar from "./AppBar";

describe("<AppBar />", () => {
    it("renders a div", () => {
        const wrapper = shallow(<AppBar />);
        expect(wrapper.find("div")).toHaveLength(2);
    });   
});

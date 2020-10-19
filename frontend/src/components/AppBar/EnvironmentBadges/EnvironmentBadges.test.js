import React from "react";
import { shallow } from "enzyme";
import EnvironmentBadges from "./EnvironmentBadges";

describe("<EnvironmentBadges />", () => {
    it("renders a div", () => {
        const wrapper = shallow(<EnvironmentBadges />);
        expect(wrapper.find("div")).toHaveLength(1);
    });   
});

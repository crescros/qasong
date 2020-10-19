import React from "react";
import { shallow } from "enzyme";
import MobileMenu from "./MobileMenu";

describe("<MobileMenu />", () => {
    it("renders a div", () => {
        const wrapper = shallow(<MobileMenu queue={[]} />);
        expect(wrapper.find("div")).toHaveLength(1);
    });   
});

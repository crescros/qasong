import React from "react";
import { shallow } from "enzyme";
import DesktopMenu from "./DesktopMenu";
import ShareButton from "./ShareButton/ShareButton"

describe("<DesktopMenu />", () => {
    it("renders a div", () => {
        const wrapper = shallow(<DesktopMenu queue={[]} />);
        expect(wrapper.find(ShareButton)).toHaveLength(1);
    });   
});

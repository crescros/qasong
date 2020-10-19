import React from "react";
import { shallow } from "enzyme";
import ShareButton from "./ShareButton";
import IconButton from "@material-ui/core/IconButton"

describe("<ShareButton />", () => {
    it("renders a div", () => {
        const wrapper = shallow(<ShareButton />);
        expect(wrapper.find(IconButton)).toHaveLength(1);
    });   
});

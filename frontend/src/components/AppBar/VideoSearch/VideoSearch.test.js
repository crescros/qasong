import React from "react";
import { shallow } from "enzyme";
import VideoSearch from "./VideoSearch";

describe("<VideoSearch />", () => {
    it("renders a form", () => {
        const wrapper = shallow(<VideoSearch />);
        expect(wrapper.find("form")).toHaveLength(1);
    });   
});

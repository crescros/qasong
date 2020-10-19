import React from "react";
import { shallow } from "enzyme";
import VideoCard from "./VideoCard";
import Card from "@material-ui/core/Card"

describe("<VideoCard />", () => {
    it("renders a div", () => {
        const wrapper = shallow(<VideoCard title="Hello Test" />);
        expect(wrapper.find(Card)).toHaveLength(1);
    });   
});

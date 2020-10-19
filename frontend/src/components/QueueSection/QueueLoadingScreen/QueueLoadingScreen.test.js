import React from "react";
import { shallow } from "enzyme";
import QueueLoadingScreen from "./QueueLoadingScreen";
import CircularProgress from "@material-ui/core/CircularProgress"



describe("<QueueLoadingScreen />", () => {
    it("renders an empty div if id is falsy", () => {
        const wrapper = shallow(<QueueLoadingScreen />);
        expect(wrapper.find("div")).toHaveLength(1);
    });

    it("renders the Youtube component if id is truthy", () => {
        const wrapper = shallow(<QueueLoadingScreen isLoadingQueue={true} />);
        expect(wrapper.find(CircularProgress)).toHaveLength(1);
    });
});

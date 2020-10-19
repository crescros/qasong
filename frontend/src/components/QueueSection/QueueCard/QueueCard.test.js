import React from "react";
import { shallow } from "enzyme";
import QueueCard from "./QueueCard";
import Box from "@material-ui/core/Box"
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

describe("<QueueCard />", () => {
    it("renders a div", () => {
        const wrapper = shallow(<DndProvider backend={HTML5Backend}>
            <QueueCard title={'Hello Test'} />
        </DndProvider>
        );
        expect(wrapper)
    });
});

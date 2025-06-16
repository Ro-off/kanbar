import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import { TaskRow } from "@components";
import { BrowserRouter } from "react-router-dom";
import React from "react";

import { Provider } from "@/provider";
import { TaskRowProps } from "@/types";

const taskRowTestProps: TaskRowProps = {
  columnId: "todo",
};

it("Check taskRow snapshot", () => {
  const { asFragment } = render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider>
          <TaskRow {...taskRowTestProps} />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );

  expect(asFragment()).toMatchSnapshot();
});

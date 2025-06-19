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

it("it should match a snapshot of the index page", () => {
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

import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import { TaskRow } from "@components";
import { Provider } from "react-redux";

import { TaskRowProps } from "@/types";
import { store } from "@/store";

const taskRowTestProps: TaskRowProps = {
  columnId: "todo",
};

it("Check taskRow snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <TaskRow {...taskRowTestProps} />
    </Provider>,
  );

  expect(asFragment()).toMatchSnapshot();
});

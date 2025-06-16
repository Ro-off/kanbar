import { expect, it } from "vitest";
import { render } from "@testing-library/react";
import { TaskCard } from "@components";

import { TaskCardProps } from "@/types";

const taskCardTestProps: TaskCardProps = {
  id: "1234-1234-1234-1234",
  columnId: "todo",
  description: "This is a test task card",
  newField: false,
  index: 0,
};

it("Check taskCard snapshot", () => {
  const { asFragment } = render(<TaskCard {...taskCardTestProps} />);

  expect(asFragment()).toMatchSnapshot();
});

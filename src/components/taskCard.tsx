import { Card, CardFooter, CardBody } from "@heroui/card";

export const TaskCard = ({ description }: { description: string }) => (
  <Card className="mx-4 my-2">
    <CardBody>
      <p>{description}</p>
    </CardBody>
    <CardFooter className="flex justify-end">
      <button className="btn btn-primary">Edit</button>
    </CardFooter>
  </Card>
);

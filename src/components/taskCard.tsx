import { Card, CardFooter, CardBody } from "@heroui/card";

export function TaskCard({ description }: { description: string }) {
  return (
    <Card className="mx-4 my-2">
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <CardFooter className="flex justify-end">
        <button className="btn btn-primary">Edit</button>
      </CardFooter>
    </Card>
  );
}

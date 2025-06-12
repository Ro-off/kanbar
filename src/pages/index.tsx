import { TaskRow } from "@/components/taskRow";

export default function IndexPage() {
  return (
    <div className="h-screen flex flex-col">
      <section className="flex flex-col items-center justify-center py-8 px-4 md:py-10">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
      </section>
      <section className="flex flex-row  justify-center gap-4 py-8 px-4 md:py-10  h-full overflow-x-auto">
        <TaskRow columnId="todo" />
        <TaskRow columnId="inProgress" />
        <TaskRow columnId="done" />
      </section>
    </div>
  );
}

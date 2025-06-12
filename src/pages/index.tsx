import { DndContext, DragEndEvent } from "@dnd-kit/core";

import { TaskRow, ColumnIds } from "@/components/taskRow";
import { updateTask } from "@/actions/tasksActions";

export default function IndexPage() {
  // interface DragEndEvent {
  //   over: { id: ColumnIds };
  //   active: { id: string };
  // }

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over !== null) {
      updateTask(String(active.id), {
        columnId: over.id as ColumnIds,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <section className="flex flex-col items-center justify-center py-8 px-4 md:py-10">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
      </section>
      <DndContext onDragEnd={handleDragEnd}>
        <section className="flex flex-row  justify-center gap-4 py-8 px-4 md:py-10  h-full overflow-x-auto">
          <TaskRow columnId="todo" />
          <TaskRow columnId="inProgress" />
          <TaskRow columnId="done" />
        </section>
      </DndContext>
    </div>
  );
}

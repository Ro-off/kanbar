import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import { useSelector } from "react-redux";

import { TaskRow, ColumnIds } from "@/components/taskRow";
import { updateTask } from "@/actions/tasksActions";
import { TaskCard } from "@/components/taskCard";
import { Task, TasksState } from "@/types";

export default function IndexPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeDragTask = useSelector(
    (state: TasksState) =>
      activeId && state.tasks.find((task) => task.id === activeId),
  ) as Task;

  const handleDragStart = (event: DragEndEvent) =>
    setActiveId(event.active.id as string);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over !== null) {
      updateTask(String(active.id), {
        columnId: over.id as ColumnIds,
        index: active.data.index,
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <section className="flex flex-col items-center justify-center py-8 px-4 md:py-10">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
      </section>
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <section className="flex flex-row  justify-center gap-4 py-8 px-4 md:py-10  h-full overflow-x-auto">
          <TaskRow columnId="todo" />
          <TaskRow columnId="inProgress" />
          <TaskRow columnId="done" />
        </section>
        <DragOverlay>
          {activeDragTask && (
            <TaskCard
              key={activeDragTask.id}
              columnId={activeDragTask.columnId}
              description={activeDragTask.description}
              id={activeDragTask.id}
              newField={activeDragTask.newField}
            />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

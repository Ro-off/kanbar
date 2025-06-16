import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ScrollShadow } from "@heroui/scroll-shadow";

import { ColumnIds, TaskRow } from "@/components/taskRow";
import { updateTask } from "@/actions/tasksActions";
import { TaskCard } from "@/components/taskCard";
import { Task, TasksState } from "@/types";

const IndexPage = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeDragTask = useSelector(
    (state: TasksState) =>
      activeId && state.tasks.find((task) => task.id === activeId),
  ) as Task;

  const handleDragStart = (event: DragEndEvent) =>
    setActiveId(event.active.id as string);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over && over.data.current?.sortable) {
      updateTask(String(active.id), {
        columnId: over.data.current.sortable.containerId,
        index: over.data.current?.index,
      });
    } else if (over && over.id) {
      updateTask(String(active.id), {
        columnId: over.id as ColumnIds,
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="h-screen flex flex-col">
        <section className="flex flex-col items-center justify-center py-8 px-4 md:py-10">
          <h1 className="text-3xl font-bold text-center">Kanban Board</h1>{" "}
        </section>
        <ScrollShadow className="max-w-screen h-full" orientation="horizontal">
          <section className="flex flex-row  justify-center gap-4 py-8 px-4 md:py-10 h-full w-max py-auto mx-auto">
            <TaskRow columnId="todo" />
            <TaskRow columnId="inProgress" />
            <TaskRow columnId="done" />
          </section>
        </ScrollShadow>
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
      </div>
    </DndContext>
  );
};

export default IndexPage;

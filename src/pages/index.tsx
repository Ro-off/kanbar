import { TaskRow } from "@/components/taskRow";
// import DefaultLayout from "@/layouts/default";

const taskList = [
  { description: "Task 1: Complete the project documentation." },
  { description: "Task 2: Implement the user authentication feature." },
  { description: "Task 3: Fix the bugs reported in the last sprint." },
  { description: "Task 4: Review the code for the new feature." },
  { description: "Task 5: Prepare for the upcoming team meeting." },
  { description: "Task 6: Update the project roadmap." },
  { description: "Task 7: Conduct a performance review of the application." },
  { description: "Task 8: Refactor the legacy codebase." },
  { description: "Task 9: Write unit tests for the new components." },
  { description: "Task 10: Deploy the latest version to production." },
];

export default function IndexPage() {
  return (
    // <DefaultLayout>
    <div className="h-screen flex flex-col">
      <section className="flex flex-col items-center justify-center py-8 px-4 md:py-10">
        <h1 className="text-3xl font-bold">Kanban Board</h1>
      </section>
      <section className="flex flex-row  justify-center gap-4 py-8 px-4 md:py-10  h-full overflow-x-auto">
        <TaskRow title="To Do" headerColor="bg-cyan-100" taskList={taskList} />
        <TaskRow title="In Progress" headerColor="bg-yellow-100" />
        <TaskRow title="Done" headerColor="bg-green-100" />
      </section>
      {/* // </DefaultLayout> */}
    </div>
  );
}

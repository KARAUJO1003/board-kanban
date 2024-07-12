"use client";;
import { Button } from "@/components/ui/button";
import { filterTasksByStatus, ITask, tasks } from "@/data/dataTasks";
import { Kanban, Plus, Table } from "lucide-react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DataTableView } from "@/components/data-table-view/table-view";
import { Column } from "@/components/kanban-view/kanban-collum";

export default function Home() {
  const [taskList, setTaskList] = useState(tasks);
  const [viewMode, setViewMode] = useState("kanban");
  

  const handleDropTask = (taskId: string, newStatus: string) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === Number(taskId) ? { ...task, status: newStatus } : task
      )
    );
  };

  const onCreateTask = (status?: string) => {
    // const title = prompt("Task Title");
    // if (title) {
      const newTask: ITask = {
        id: Math.random(),
        title: 'Empty',
        description: "Description",
        status: status ? status : "todo",
        createdAt: new Date().toISOString(),
        completed: false,
      };
      setTaskList(prevTasks => [...prevTasks, newTask]);
    // }
  }

  const handleUpdateTask = (updatedTask: ITask) => {
    setTaskList(prevTasks =>
      prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    console.log('EIDTAOU',taskList);
  };

  const getUniqueStatuses = (tasks: ITask[]): string[] => {
    const statuses = tasks.map((task) => task.status);
    return Array.from(new Set(statuses)); // Converte Set em array
  };

  const uniqueStatuses = getUniqueStatuses(taskList);

  

  return (
    <main className='flex min-h-screen flex-col items-center py-6 px-14'>
      <section className='w-full flex flex-col gap-4 p-4  rounded-xl '>
        <div className='flex  items-center gap-4 border-b pb-4  w-full justify-between  h-fit'>
          <div className='flex items-center gap-2 lg:max-w-6xl '>
            <ToggleGroup
              onValueChange={(event) => setViewMode(event)}
              type='single'
              defaultValue='kanban'
              value={viewMode}
            >
              <ToggleGroupItem value='kanban' aria-label='Toggle kanban'>
                <Kanban className='size-5' />
              </ToggleGroupItem>
              <ToggleGroupItem value='table' aria-label='Toggle table'>
                <Table className='size-5' />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Button onClick={() => onCreateTask()} className='bg-emerald-400 hover:bg-emerald-300 items-center gap-2'>
            <Plus className='size-5' />
            <span className='font-bold'>Add Task</span>
          </Button>
        </div>
        {viewMode === "kanban" && (
          <section className='flex gap-4 rounded-lg w-full pb-4 overflow-x-auto'>
            {uniqueStatuses.map((status) => {
              const filteredTasks = filterTasksByStatus(taskList, status);
              return (
                <Column
                  key={status}
                  status={status}
                  tasks={filteredTasks}
                  onDropTask={handleDropTask}
                  onUpdateTask={handleUpdateTask}
                  onCreateTask={onCreateTask}
                />
              );
            })}
          </section>
        )}
        {viewMode === "table" && (
          <section className='flex gap-4 rounded-lg w-full justify-center'>
            <DataTableView data={taskList} />
          </section>
        )}
      </section>
    </main>
  );
}

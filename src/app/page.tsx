"use client";
import { useState } from "react";
import { colors, filterTasksByStatus, ITask, tasks } from "@/data/dataTasks";
import { Kanban, PlusCircleIcon, Table } from "lucide-react";
import { DataTableView } from "@/components/data-table-view/table-view";
import { Column } from "@/components/kanban-view/kanban-collum";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useStatuses } from "@/hooks/use-statuses";

export default function Home() {
  const [taskList, setTaskList] = useState(tasks);
  const { statuses, createStatus } = useStatuses();
  const [currentTabActive, setCurrentTabActive] = useState("kanban");

  const handleDropTask = (taskId: number, newStatusId: number) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, statusId: newStatusId } : task
      )
    );
  };

  const onCreateTask = (statusId?: number) => {
    const newTask: ITask = {
      id: Math.random(),
      title: "Empty",
      description: "Description empty",
      statusId: statusId ? statusId : 1, // Default to 'todo' status id
      createdAt: new Date().toISOString(),
      completed: false,
    };
    setTaskList((prevTasks) => [...prevTasks, newTask]);
  };

  const handleUpdateTask = (updatedTask: ITask) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const onCreateStatus = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newStatusName = formData.get("nome") as string;
    const selectedColorName = formData.get("cor") as string;
    createStatus(newStatusName, selectedColorName);
  };

  return (
    <main className='flex flex-col items-center py-8 w-full'>
      <section className='w-full flex flex-col gap-4 p-2 rounded-xl px-10 mx-auto'>
        <Tabs
          defaultValue='kanban'
          onValueChange={(e) => setCurrentTabActive(e)}
        >
          <div className='flex items-center justify-between w-full'>
            <TabsList className='flex p-0 self-start w-fit'>
              <TabsTrigger
                value='kanban'
                className={buttonVariants({
                  variant: `${
                    currentTabActive === "kanban" ? "default" : "secondary"
                  }`,
                  size: "icon",
                })}
              >
                <Kanban className='size-4' />
              </TabsTrigger>
              <TabsTrigger
                value='table'
                className={buttonVariants({
                  variant: `${
                    currentTabActive === "table" ? "default" : "secondary"
                  }`,
                  size: "icon",
                })}
              >
                <Table className='size-4' />
              </TabsTrigger>
            </TabsList>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='default' className='gap-2'>
                    <PlusCircleIcon className='size-4' />
                    Coluna
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                  <form onSubmit={onCreateStatus}>
                    <DialogHeader>
                      <DialogTitle>Crie um status</DialogTitle>
                      <DialogDescription>
                        Adicione um nome para o novo status e escolha uma das
                        cores abaixo.
                      </DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='nome' className='text-right text-sm'>
                          Nome
                        </Label>
                        <Input
                          id='nome'
                          name='nome'
                          defaultValue='A Fazer'
                          className='col-span-3'
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='cor' className='text-right'>
                          Cor
                        </Label>
                        <Select name='cor' defaultValue={colors[0].name}>
                          <SelectTrigger className='w-[180px] text-xs'>
                            <SelectValue placeholder='Selecione uma cor abaixo' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Cores</SelectLabel>
                              {colors.map((color) => (
                                <SelectItem
                                  key={color.name}
                                  value={color.name}
                                  className='flex gap-2 items-center text-xs'
                                >
                                  <span
                                    style={{ backgroundColor: color.hex }}
                                    className='size-3 rounded inline-block mr-2'
                                  />
                                  {color.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type='submit'>Criar status</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <TabsContent value='kanban'>
            <ScrollArea className='pb-4 focus:outline-none'>
              <div className='flex gap-2'>
                {statuses.map((status) => {
                  const filteredTasks = filterTasksByStatus(
                    taskList,
                    status.id
                  );
                  return (
                    <Column
                      key={status.id}
                      status={status.name}
                      tasks={filteredTasks}
                      onDropTask={(taskId) =>
                        handleDropTask(parseInt(taskId), status.id)
                      }
                      onUpdateTask={handleUpdateTask}
                      onCreateTask={() => onCreateTask(status.id)}
                    />
                  );
                })}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </TabsContent>
          <TabsContent value='table'>
            <section className='flex gap-4 rounded-lg w-full justify-center'>
              <DataTableView data={taskList} />
            </section>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

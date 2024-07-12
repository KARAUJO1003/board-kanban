'use client'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { ItemTypes } from "./types";
import { ITask } from "@/data/dataTasks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";

export const TaskCard = ({ task, onUpdateTask }: { task: ITask, onUpdateTask: (updatedTask: ITask) => void }) => {
  const [editMode, setEditMode] = useState<{ title: boolean; description: boolean }>({
    title: false,
    description: false,
  });
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: { id: task.id, status: task.status },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleTitleDoubleClick = () => {
    setEditMode({ ...editMode, title: true });
  };

  const handleDescriptionDoubleClick = () => {
    setEditMode({ ...editMode, description: true });
  };

  const handleTitleBlur = () => {
    setEditMode({ ...editMode, title: false });
    onUpdateTask({ ...task, title });
  };

  const handleDescriptionBlur = () => {
    setEditMode({ ...editMode, description: false });
    onUpdateTask({ ...task, description });
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  const handleDescriptionKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      handleDescriptionBlur();
    }
  };

  return (
    <Card
      ref={drag as any}
      className={`w-full dark:bg-zinc-950/80 backdrop-blur-sm  ${
        isDragging
          ? "opacity-90 ring-4  ring-zinc-200 dark:ring-zinc-900 cursor-grabbing"
          : "cursor-grab"
      }`}
    >
      <CardHeader>
        {editMode.title ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyPress={handleTitleKeyPress}
            className="h-auto p-0 select-none outline-none ring-0 focus-visible:ring-0 border-none bg-transparent text-md font-bold"
            autoFocus
          />
        ) : (
          <input
            onDoubleClick={handleTitleDoubleClick}
            value={title}
            readOnly
            className={`h-auto p-0 select-none outline-none ring-0 focus-visible:ring-0 border-none bg-transparent text-md font-bold ${
              task.status === "done" && "line-through text-muted-foreground"
            }`}
          />
        )}
        {editMode.description ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={handleDescriptionBlur}
            onKeyPress={handleDescriptionKeyPress}
            className="h-auto overflow-hidden flex flex-wrap p-0 outline-none ring-0 focus-visible:ring-0 border-none bg-transparent text-sm text-muted-foreground"
            autoFocus
          />
        ) : (
          <textarea
            onDoubleClick={handleDescriptionDoubleClick}
            value={description}
            readOnly
            className="h-auto overflow-hidden flex flex-wrap p-0 outline-none ring-0 focus-visible:ring-0 border-none bg-transparent text-sm text-muted-foreground"
          />
        )}
        <TooltipProvider>
          <Tooltip delayDuration={5} >
            <TooltipTrigger asChild>
              <span className="text-sm text-muted-foreground">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </TooltipTrigger>
            <TooltipContent align="start" className="bg-muted text-foreground">
              Data de criação: {new Date(task.createdAt).toLocaleDateString()}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Badge
          variant='secondary' 
          className={`w-fit ${
            task.status === "todo" &&
            "bg-zinc-200/50 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-900/50"
          } ${
            task.status === "pending" &&
            "bg-amber-200/50 text-amber-800 dark:text-amber-200 dark:bg-amber-950/50"
          } ${
            task.status === "done" &&
            "bg-emerald-200/50 text-emerald-800 dark:text-emerald-200 dark:bg-emerald-950/50"
          }`}
        >
          {task.status}
        </Badge>
      </CardContent>
    </Card>
  );
};

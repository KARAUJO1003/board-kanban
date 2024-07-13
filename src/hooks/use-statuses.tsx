import { useState } from "react";
import { colors, statuses as initialStatuses, IStatus } from "@/data/dataTasks";

export const useStatuses = () => {
  const [statuses, setStatuses] = useState<IStatus[]>(initialStatuses);

  const createStatus = (newStatusName: string, selectedColorName: string) => {
    const selectedColor = colors.find(
      (color) => color.name === selectedColorName
    )?.hex;

    if (newStatusName && selectedColor) {
      const newStatusId = statuses.length
        ? Math.max(...statuses.map((status) => status.id)) + 1
        : 1;
      const newStatus = {
        id: newStatusId,
        name: newStatusName,
        color: selectedColor,
      };
      setStatuses((prevStatuses) => [...prevStatuses, newStatus]);
    }
  };

  return { statuses, createStatus };
};

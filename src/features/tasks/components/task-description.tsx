import { useState } from 'react';
import { PencilIcon, XIcon } from 'lucide-react';

import { Task } from '../types';
import { useUpdateTask } from '../api/use-update-task';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { DottedSeparator } from '@/components/dotted-sepator';

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(task.description || '');
  const { mutate, isPending } = useUpdateTask();

  const handleSave = async () => {
    mutate(
      {
        param: { taskId: task.$id },
        json: { description: value },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="p-5 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Descripción General</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          size="sm"
          variant="secondary"
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? 'Cancelar' : 'Editar'}
        </Button>
      </div>
      <DottedSeparator className="my-4" />

      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Agregar Descripción..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            size="sm"
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">No hay descripción</span>
          )}
        </div>
      )}
    </div>
  );
};
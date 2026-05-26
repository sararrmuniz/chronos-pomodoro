import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import type { TaskModel } from '../../models/TaskModel';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);

  //ciclos
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();

    if (!taskName) {
      alert('Por favor, adicione um nome para a tarefa.');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };

    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining, // Conferir
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handleInterruptTask() {
      setState(prevState => {
        return {
          ...prevState,
          activeTask: null,
          secondsRemaining: 0,
          formattedSecondsRemaining: '00:00',
          tasks: prevState.tasks.map(task => {
            if (prevState.activeTask && prevState.activeTask.id === task.id) {
              return {
                ...task,
                interruptDate: Date.now(),
              };
            }
            return task;
          }),
        };
      });
    }

  return (
    <form onSubmit={handleCreateNewTask} className='form' action=''>
      <div className='formRow'>
        <DefaultInput
          labelText='task'
          id='meuInput'
          type='text'
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
        />
      </div>

      <div className='formRow'>
        <p>O próximo ciclo será de 25 minutos.</p>
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles/>
        </div>
      )}

      <div className='formRow'>
        {!state.activeTask ? (
          <DefaultButton 
          aria-label='Iniciar nova tarefa' 
          title='Iniciar nova tarefa' 
          type='submit' 
          icon={<PlayCircleIcon />} 
          color='green'
          key='botao_submit' />
        ) : (
          <DefaultButton 
          onClick={handleInterruptTask} 
          aria-label='Interromper tarefa em andmento' 
          title='Interromper tarefa em andamento' 
          type='button' icon={<StopCircleIcon />} 
          color='red' 
          key='botao_button' />
        )}
      </div>
    </form>
  );
}

import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  //Tips
  const tipsForWhenActiveTask = {
    workTime: <span>Foque por {state.config.workTime} minutos.</span>,
    shortBreakTime: (
      <span>Descanse por {state.config.shortBreakTime} minutos.</span>
    ),
    longBreakTime: <span>Descanso longo.</span>,
  };

  const tipsForNoActiveTask = {
    workTime: (
      <span>O próximo ciclo será de {state.config.workTime} minutos.</span>
    ),
    shortBreakTime: (
      <span>
        O próximo descanso será de {state.config.shortBreakTime} minutos.
      </span>
    ),
    longBreakTime: <span>O próximo descanso será longo.</span>,
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  );
}

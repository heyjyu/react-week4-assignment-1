import reducer from './reducer';

import {
  updateTaskTitle,
  addTask,
  deleteTask,
} from './actions';

describe('reducer', () => {
  describe('initialState', () => {
    it('초깃값 확인', () => {
      const state = reducer(undefined, { type: 'initState_test' });

      expect(state).not.toBeUndefined();
    });
  });

  describe('updateTaskTitle', () => {
    it('changes', () => {
      const state = reducer({
        taskTitle: '',
      }, updateTaskTitle('New Task'));

      expect(state.taskTitle).toBe('New Task');
    });
  });

  describe('addTask', () => {
    function reduceAddTask(taskTitle) {
      return reducer({
        newId: 100,
        taskTitle,
        tasks: [],
      }, addTask());
    }

    context('with task title', () => {
      it('adds', () => {
        const state = reduceAddTask('New Task');

        expect(state.tasks).toHaveLength(1);
        expect(state.tasks[0].id).not.toBeUndefined();
        expect(state.tasks[0].title).toBe('New Task');
      });
    });

    context('without task title', () => {
      it('doesnt work', () => {
        const state = reduceAddTask('');

        expect(state.tasks).toHaveLength(0);
      });
    });
  });

  describe('deleteTask', () => {
    function reduceDeleteTask(id) {
      return reducer({
        tasks: [
          { id: 1, title: 'Task' },
        ],
      }, deleteTask(id));
    }

    context('with existed task ID', () => {
      it('clears', () => {
        const state = reduceDeleteTask(1);

        expect(state.tasks).toHaveLength(0);
      });
    });

    context('without existed task ID', () => {
      it('doesnt work', () => {
        const state = reduceDeleteTask(100);

        expect(state.tasks).toHaveLength(1);
      });
    });
  });
});

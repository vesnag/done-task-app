const {
  sortTasksByNextScheduledTime,
} = require('../utils/scheduleUtils'); // Adjust the path as necessary

describe('sortTasksByNextScheduledTime', () => {
  // Mock current date as Monday, October 2, 2023
  const mockCurrentDate = new Date('2023-10-02T09:00:00Z');

  test('sorts tasks correctly based on scheduled day relative to Monday', () => {
    const tasks = [
      {
        id: 'task1',
        description: 'Task 1',
        schedule: {
          day: 'Monday',
        },
      },
      {
        id: 'task2',
        description: 'Task 2',
        schedule: {
          day: 'Friday',
        },
      },
      {
        id: 'task3',
        description: 'Task 3',
        schedule: {
          day: 'Wednesday',
        },
      },
    ];

    const sortedTasks = sortTasksByNextScheduledTime(tasks, mockCurrentDate);

    expect(sortedTasks.map(task => task.id)).toEqual(['task1', 'task3', 'task2']);
  });

  test('handles tasks scheduled on the same day correctly', () => {
    const tasks = [
      {
        id: 'task1',
        description: 'Task 1',
        schedule: {
          day: 'Monday',
        },
      },
      {
        id: 'task2',
        description: 'Task 2',
        schedule: {
          day: 'Monday',
        },
      },
      {
        id: 'task3',
        description: 'Task 3',
        schedule: {
          day: 'Wednesday',
        },
      },
    ];

    const sortedTasks = sortTasksByNextScheduledTime(tasks, mockCurrentDate);

    // Tasks on the same day retain their original order
    expect(sortedTasks.map(task => task.id)).toEqual(['task1', 'task2', 'task3']);
  });

  test('sorts tasks correctly when current day is Sunday', () => {
    const mockSunday = new Date('2023-10-01T09:00:00Z'); // Sunday

    const tasks = [
      {
        id: 'task1',
        description: 'Task 1',
        schedule: {
          day: 'Monday',
        },
      },
      {
        id: 'task2',
        description: 'Task 2',
        schedule: {
          day: 'Friday',
        },
      },
      {
        id: 'task3',
        description: 'Task 3',
        schedule: {
          day: 'Wednesday',
        },
      },
    ];

    const sortedTasks = sortTasksByNextScheduledTime(tasks, mockSunday);

    // From Sunday, Monday is 1 day away, Wednesday 3, Friday 5
    expect(sortedTasks.map(task => task.id)).toEqual(['task1', 'task3', 'task2']);
  });

  test('sorts tasks correctly when current day is Saturday', () => {
    const mockSaturday = new Date('2023-09-30T09:00:00Z'); // Saturday

    const tasks = [
      {
        id: 'task1',
        description: 'Task 1',
        schedule: {
          day: 'Sunday',
        },
      },
      {
        id: 'task2',
        description: 'Task 2',
        schedule: {
          day: 'Friday',
        },
      },
      {
        id: 'task3',
        description: 'Task 3',
        schedule: {
          day: 'Wednesday',
        },
      },
    ];

    const sortedTasks = sortTasksByNextScheduledTime(tasks, mockSaturday);

    // From Saturday, Sunday is 1 day away, Wednesday 4, Friday 6
    expect(sortedTasks.map(task => task.id)).toEqual(['task1', 'task3', 'task2']);
  });
});

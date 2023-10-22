export const completedWorkout = {
  duration: 52,
  volume: 6000,
  records: 3,
  exercises: [
    {
      base: {
        id: 1,
        name: "Lat Pulldown (Machine)",
      },
      notes: "",
      restTimer: "",
      sets: [
        {
          type: "normal",
          weight: "120",
          reps: "48",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
      ],
    },
    {
      base: {
        id: 2,
        name: "Seated Row (Machine)",
      },
      notes: "",
      restTimer: "",
      sets: [
        {
          type: "normal",
          weight: "120",
          reps: "12",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
      ],
    },
    {
      base: {
        id: 2,
        name: "Seated Row (Machine)",
      },
      notes: "",
      restTimer: "",
      sets: [
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
      ],
    },
    {
      base: {
        id: 3,
        name: "Shrug (Dumbbell)",
      },
      notes: "",
      restTimer: "",
      sets: [
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
        {
          type: "normal",
          weight: "",
          reps: "",
          isDone: true,
        },
      ],
    },
  ],
};

const randomize = (workout) => ({
  ...workout,
  duration: Math.floor(workout.duration * Math.random() * 100),
  volume: Math.floor(workout.volume * Math.random()),
  records: Math.floor(workout.records * Math.random() + 1),
});

export const homeFeedWorkouts = [
  randomize(completedWorkout),
  randomize(completedWorkout),
  randomize(completedWorkout),
  randomize(completedWorkout),
  randomize(completedWorkout),
];

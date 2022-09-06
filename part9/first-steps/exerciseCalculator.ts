interface V {
  target: number;
  dailyExerciseHours: Array<number>;
}

const parseArgs = (args: Array<string>): V => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 40) throw new Error('Too many arguments');

  const [, , value1, ...values] = args;
  const target = Number(value1);
  const dailyExerciseHours = values.map(Number);
  const areNumbersArguments =
    !isNaN(target) && dailyExerciseHours.every((hours) => !isNaN(hours));
  if (areNumbersArguments) {
    return {
      target,
      dailyExerciseHours,
    };
  } else {
    throw new Error('Provided values are not numbers');
  }
};

type RatingDescription =
  | 'come on, you can do better'
  | 'not too bad but could be better'
  | 'good';

interface Rating {
  rating: 1 | 2 | 3;
  ratingDescription: RatingDescription;
}

interface TrainingSummary extends Rating {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  target: number;
  average: number;
}

const rateExercise = (
  averageExerciseHours: number,
  targetAmountHours: number
): Rating => {
  if (averageExerciseHours < targetAmountHours - 1.0) {
    return {
      rating: 1,
      ratingDescription: 'come on, you can do better',
    };
  } else if (averageExerciseHours < targetAmountHours) {
    return {
      rating: 2,
      ratingDescription: 'not too bad but could be better',
    };
  } else {
    return {
      rating: 3,
      ratingDescription: 'good',
    };
  }
};

const isSuccessful = (rating: Rating): boolean => {
  return rating.rating >= 3;
};

export const exerciseCalculator = (
  dailyExerciseHours: Array<number>,
  targetAmountHours: number
): TrainingSummary => {
  const averageExerciseHours =
    dailyExerciseHours.reduce((sum, value) => sum + value) /
    dailyExerciseHours.length;
  const rating = rateExercise(averageExerciseHours, targetAmountHours);
  const success = isSuccessful(rating);

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter((value) => value > 0).length,
    target: targetAmountHours,
    average: averageExerciseHours,
    ...rating,
    success,
  };
};

const calculator = (
  target: number,
  dailyExerciseHours: Array<number>
): void => {
  const trainingSummary = exerciseCalculator(dailyExerciseHours, target);
  console.log(trainingSummary);
};

const main2 = (): void => {
  try {
    const { dailyExerciseHours, target } = parseArgs(process.argv);
    calculator(target, dailyExerciseHours);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
      errorMessage += '\nError: ' + error.message;
    }
    console.error(errorMessage);
  }
};

main2();

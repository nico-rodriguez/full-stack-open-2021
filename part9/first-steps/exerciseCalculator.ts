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

const exerciseCalculator = (
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));

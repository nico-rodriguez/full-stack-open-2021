interface Values {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Values => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const [_1, _2, value1, value2] = args;
  const height = Number(value1);
  const weight = Number(value2);
  const areNumbersArguments = !isNaN(height) && !isNaN(weight);
  if (areNumbersArguments) {
    return {
      height,
      weight,
    };
  } else {
    throw new Error('Provided values are not numbers');
  }
};

type BMIRange =
  | 'Underweight (Severe thinness)'
  | 'Underweight (Moderate thinness)'
  | 'Underweight (Mild thinness)'
  | 'Normal (healthy weight)'
  | 'Overweight (Pre-obese)'
  | 'Obese (Class I)'
  | 'Obese (Class II)'
  | 'Obese (Class III)';

export const calculateBmi = (height: number, weight: number): BMIRange => {
  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;

  if (bmi < 16.0) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 16.9) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.4) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi < 29.9) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 34.9) {
    return 'Obese (Class I)';
  } else if (bmi < 39.9) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

const bmiCalculator = (height: number, weight: number): void => {
  const bmi = calculateBmi(height, weight);
  console.log(bmi);
};

const main = (): void => {
  try {
    const { height, weight } = parseArguments(process.argv);
    bmiCalculator(height, weight);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened';
    if (error instanceof Error) {
      errorMessage += '\nError: ' + error.message;
    }
    console.error(errorMessage);
  }
};

main();

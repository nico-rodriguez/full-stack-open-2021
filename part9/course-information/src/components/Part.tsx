import { CoursePart } from '../types';
import { assertNever } from '../utils';

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <br />
          <em>{coursePart.description}</em>
        </p>
      );
    case 'submission':
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <br />
          <em>{coursePart.description}</em>
          <br />
          {`submit to ${coursePart.exerciseSubmissionLink}`}
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <br />
          {`project exercises ${coursePart.groupProjectCount}`}
        </p>
      );
    case 'special':
      return (
        <p>
          <strong>
            {coursePart.name} {coursePart.exerciseCount}
          </strong>
          <br />
          <em>{coursePart.description}</em>
          <br />
          {`required skills: ${coursePart.requirements.join(', ')}`}
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;

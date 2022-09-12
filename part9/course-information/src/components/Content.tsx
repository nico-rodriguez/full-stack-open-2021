import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentProps) => (
  <>
    {courses.map((course) => (
      <Part coursePart={course} key={course.name} />
    ))}
  </>
);

export default Content;

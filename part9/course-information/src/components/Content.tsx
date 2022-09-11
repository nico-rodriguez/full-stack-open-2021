type Course = {
  name: string;
  exerciseCount: number;
};

interface ContentProps {
  courses: Course[];
}

const Content = ({ courses }: ContentProps) => (
  <>
    {courses.map((course) => (
      <p key={course.name}>
        {course.name} {course.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;

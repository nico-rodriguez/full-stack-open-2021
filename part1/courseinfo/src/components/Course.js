const Header = ({ course }) => <h2>{course.name}</h2>;

const Part = ({ name, exercise }) => <p>{name} {exercise}</p>;

const Content = ({ parts }) =>
  <div>
    {parts.map(({name, exercises}) => <Part key={name} name={name} exercise={exercises} />)}
  </div>

const Total = ({ parts }) => <p><b>total of {parts.reduce((sum, { exercises }) => sum + exercises, 0)} exercises</b></p>;


const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
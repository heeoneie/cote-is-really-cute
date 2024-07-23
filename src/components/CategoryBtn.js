import { CATEGORIES } from '../utils/categories';
import { getAlgorithmCourse } from '../axios/openai';

const CategoryBtn = () => {
  const getCourse = (category) => {
    getAlgorithmCourse(category).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      {CATEGORIES.map((category, idx) => {
        return (
          <button key={idx} onClick={() => getCourse(category)}>
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryBtn;

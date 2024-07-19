import { CATEGORIES } from '../utils/categories';

const CategoryBtn = () => {
  return (
    <div>
      {CATEGORIES.map((category, idx) => {
        return <button key={idx}>{category}</button>;
      })}
    </div>
  );
};

export default CategoryBtn;

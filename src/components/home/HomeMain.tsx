import SearchBar from './SearchBar';
import CategoryBtn from '../category/CategoryBtn';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <SearchBar />
      <div className="grid grid-cols-2 gap-4">
        <CategoryBtn />
      </div>
    </div>
  );
}

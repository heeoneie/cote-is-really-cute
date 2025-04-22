import SearchBar from './SearchBar';
import PetStatus from './PetStatus';
import CategoryBtn from '../category/CategoryBtn';
import LoginStreak from './LoginStreak';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6">
      <SearchBar />
      <div className="grid grid-cols-2 gap-4">
        <CategoryBtn />
        <LoginStreak />
      </div>
      <PetStatus />
    </div>
  );
}

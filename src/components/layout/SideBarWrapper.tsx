'use client';
import useHasMounted from '@hooks/useHasMounted';
import useAuthStore from '@stores/authStore';
import Sidebar from '@components/sidebar/SideBar';

const SideBarWrapper = () => {
  const hasMounted = useHasMounted();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!hasMounted) return null;
  return isLoggedIn ? <Sidebar /> : null;
};

export default SideBarWrapper;

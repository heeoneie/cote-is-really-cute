'use client';

import useAuthStore from '@stores/authStore';
import SideBar from '../sidebar/SideBar';

const SideBarWrapper = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return isLoggedIn ? <SideBar /> : null;
};

export default SideBarWrapper;

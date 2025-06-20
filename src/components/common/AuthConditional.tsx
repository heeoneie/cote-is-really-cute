'use client';

import { ReactNode } from 'react';
import useHasMounted from '@hooks/useHasMounted';
import useAuthStore from '@stores/authStore';

interface Props {
  children: ReactNode;
}

const AuthConditional = ({ children }: Props) => {
  const hasMounted = useHasMounted();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!hasMounted || !isLoggedIn) return null;
  return <>{children}</>;
};

export default AuthConditional;

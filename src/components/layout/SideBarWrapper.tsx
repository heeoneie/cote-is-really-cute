import Sidebar from '@components/sidebar/SideBar';
import AuthConditional from '@components/common/AuthConditional';

const SideBarWrapper = () => (
  <AuthConditional>
    <Sidebar />
  </AuthConditional>
);

export default SideBarWrapper;

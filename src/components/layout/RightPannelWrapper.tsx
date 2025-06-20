import RightPanel from './RightPanel';
import AuthConditional from '../common/AuthConditional';

const RightPanelWrapper = () => (
  <AuthConditional>
    <RightPanel />
  </AuthConditional>
);

export default RightPanelWrapper;

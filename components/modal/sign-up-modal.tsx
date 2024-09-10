import { useUsage } from '@/context/usage';

const SignUpModal = () => {
  const { openModal } = useUsage();

  return <div>{openModal ? 'Sign Up Modal' : 'No Modal'}</div>;
};

export default SignUpModal;

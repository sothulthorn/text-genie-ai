import { useUsage } from '@/context/usage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import Link from 'next/link';

const SignUpModal = () => {
  const { openModal, setOpenModal } = useUsage();

  return (
    <Dialog
      open={openModal}
      onOpenChange={() =>
        openModal ? setOpenModal(!openModal) : setOpenModal(openModal)
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🚀 Unlock unlimited AI-Powered content!</DialogTitle>
          <DialogDescription>
            <br />
            <p>
              🎉 Congrates! You have generated 10,000 words with our AI tools.
              That's amazing!
            </p>
            <p>
              🔓 Ready to take your content creation to the next level? Upgrade
              to a paid plan and enjoy.
            </p>
            <ul className="m-5">
              <li>🌟 Unlimited word generation</li>
              <li>🧠 Advanced AI features</li>
              <li>⚡️ Faster processing times</li>
              <li>🛠️ Priority customer support</li>
            </ul>
            <p>
              💡 Don't let your creativity hit a wall. Upgrade now and keep the
              ideas flowing!
            </p>

            <div className="m-5 text-center">
              <Link href="/membership">
                <Button>Join Membersip</Button>
              </Link>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;

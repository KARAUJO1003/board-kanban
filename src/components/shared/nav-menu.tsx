import { Icon } from "lucide-react";
import { beachBall } from "@lucide/lab";
import { ModeToggle } from "./toggle-theme";
import Link from "next/link";

export const NavMenu = () => {
  return (
    <header className='min-h-14 sticky w-full max-w-6xl rounded-full mx-auto z-10 top-4 shadow-md bg-zinc-300/20 flex dark:bg-zinc-900/60 backdrop-blur-sm border-b px-10 items-center justify-between gap-4'>
      <div className='flex items-center gap-4'>
        <Icon iconNode={beachBall} className='size-5' />
        <h1 className='text-xl font-bold'>Board!</h1>
      </div>
      <nav className='flex gap-4 items-center'>
        <ul className='hidden sm:flex items-center gap-4 text-sm '>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/tasks'>Tasks</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
        </ul>
        <ModeToggle />
      </nav>
    </header>
  );
};

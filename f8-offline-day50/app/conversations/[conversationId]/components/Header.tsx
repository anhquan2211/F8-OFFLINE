"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import { IoVideocam } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import ProfileDrawer from "./ProfileDrawer";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} thành viên`;
    }

    return "Đang hoạt động";
  }, [conversation]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          <Avatar user={otherUser} />
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-center ">
          <FaPhone
            size={20}
            className="cursor-pointer text-blue-600 transition hover:opacity-75"
          />

          <IoVideocam
            size={26}
            className="cursor-pointer text-blue-600 transition hover:opacity-75"
          />

          <HiEllipsisHorizontal
            size={22}
            onClick={() => setDrawerOpen(true)}
            className="text-white cursor-pointer bg-blue-600 transition rounded-full hover:opacity-75"
          />
        </div>
      </div>
    </>
  );
};

export default Header;

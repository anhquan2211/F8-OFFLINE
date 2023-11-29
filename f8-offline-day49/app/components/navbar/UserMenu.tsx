"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);
  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    //Open Rent Modal
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer text-white hover:text-black"
        >
          Cho thuê chỗ ở qua Booking
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition text-white"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="Danh sách phòng đã đặt"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="Danh sách yêu thích"
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="Danh sách phòng đang đặt chỗ"
                />
                <MenuItem onClick={() => {}} label="Tài sản của tôi" />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label="Bạn muốn cho thuê phòng?"
                />
                <hr />
                <MenuItem onClick={() => signOut()} label="Đăng xuất" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Đăng nhập" />
                <MenuItem onClick={registerModal.onOpen} label="Đăng ký" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

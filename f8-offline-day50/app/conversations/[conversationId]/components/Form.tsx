"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import { AiFillLike } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { PiStickerFill } from "react-icons/pi";
import { BiSolidFileGif } from "react-icons/bi";

import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    //Post Messages
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <IoIosAddCircle
        size={30}
        className="text-blue-500 cursor-pointer hover:text-blue-600 transition"
      />

      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="wr5is5ez"
      >
        <HiPhoto
          size={30}
          className="text-blue-500 cursor-pointer hover:text-blue-600 transition"
        />
      </CldUploadButton>

      <PiStickerFill
        size={30}
        className="text-blue-500 cursor-pointer hover:text-blue-600 transition"
      />
      <BiSolidFileGif
        size={30}
        className="text-blue-500 cursor-pointer hover:text-blue-600 transition"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Aa"
        />
        {/* <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        ></button> */}
        <div className="cursor-pointer ">
          <AiFillLike
            size={26}
            className="text-blue-500 hover:text-blue-600 transition"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;

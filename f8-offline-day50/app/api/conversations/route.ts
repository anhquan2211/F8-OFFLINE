import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { userId, isGroup, members, name } = body;

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Xác thực không thành công!", { status: 401 });

    if (isGroup && (!members || members.length < 2 || !name))
      return new NextResponse("Dữ liệu không hợp lệ!", { status: 400 });

    //Một người có thể có nhiều nhóm trò chuyện với nhiều người có thể giống nhau
    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value,
              })),
              {
                id: currentUser.id,
              },
            ],
          },
        },
        include: {
          users: true,
        },
      });

      return NextResponse.json(newConversation);
    }

    //Kiểm tra xem người đó đã có cuộc trò chuyện với mình hay chưa?
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId],
            },
          },
          {
            userIds: {
              equals: [userId, currentUser.id],
            },
          },
        ],
      },
    });

    const singleConversation = existingConversations[0];

    //Nếu như có cuộc trò chuyện với người khác rồi thì chỉ trả về cuộc trò chuyện hiện tại đã có
    if (singleConversation) return NextResponse.json(singleConversation);

    //Còn nếu chưa có thì sẽ tạo một cuộc trò chuyện mới.
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(newConversation);
  } catch (error: any) {
    return new NextResponse("Lỗi server!", { status: 500 });
  }
}

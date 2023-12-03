import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/ultis/AuthOptions";

export default async function getSession() {
  return await getServerSession(authOptions);
}

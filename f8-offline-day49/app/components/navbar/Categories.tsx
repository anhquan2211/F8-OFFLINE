"use client";

import Container from "../Container";

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "Phòng này nằm gần bãi biển!",
    labelVn: "Bãi biển",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "Khu vực này có cối xay gió!",
    labelVn: "Cối xay gió",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "Khách sạn hiện đại!",
    labelVn: "Khách sạn",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "Phòng trên núi!",
    labelVn: "Phòng trên núi",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "Phòng có hồ bơi!",
    labelVn: "Phòng có hồ",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "Phòng ở trên đảo!",
    labelVn: "Phòng ở đảo",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "Phòng ở gần hồ!",
    labelVn: "Phòng ở gần hồ",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "Phòng ở gần khu trượt tuyết!",
    labelVn: "Phòng có khu trượt tuyết",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "Phòng ở trong lâu đài!",
    labelVn: "Phòng ở trong lâu đài",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "Phòng có hoạt động cắm trại!",
    labelVn: "Phòng cắm trại",
  },
  {
    label: "Arctic",
    icon: BsSnow,
    description: "Phòng ở Bắc Cực!",
    labelVn: "Phòng Bắc Cực",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "Phòng gần hang động!",
    labelVn: "Phòng gần hang động",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "Phòng gần sa mạc!",
    labelVn: "Phòng gần sa mạc",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "Phòng gần trang trại!",
    labelVn: "Phòng gần trang trại",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "Phòng hạng sang!",
    labelVn: "Phòng luxury",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto text-white">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
            labelVn={item.labelVn}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

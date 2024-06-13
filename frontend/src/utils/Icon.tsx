import { TbBeach } from "react-icons/tb";
import { IoDesktopSharp, IoFastFoodOutline } from "react-icons/io5";
import { BsFillHouseDoorFill, BsGraphUpArrow } from "react-icons/bs";
import { BiDonateHeart, BiMoviePlay } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa6";
import { IoIosAirplane } from "react-icons/io";
import { GiClothes, GiHealthNormal, GiTakeMyMoney } from "react-icons/gi";
import { FaBook, FaExclamation, FaQuestion } from "react-icons/fa";

const iconMap = {
  alimentacao: IoFastFoodOutline,
  doacao: BiDonateHeart,
  educacao: FaBook,
  entretenimento: BiMoviePlay,
  imposto: GiTakeMyMoney,
  investimentos: BsGraphUpArrow,
  lazer: TbBeach,
  moradia: BsFillHouseDoorFill,
  nao_previsto: FaExclamation,
  outros: FaQuestion,
  saude: GiHealthNormal,
  tecnologia: IoDesktopSharp,
  transporte: FaCarSide,
  vestuario: GiClothes,
  viagens: IoIosAirplane,
};

const Icon = ({ name }: { name: string }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <FaQuestion color="#FFA8A8" size={20} />
  }

  return <IconComponent color="#FFA8A8" size={20} />
}

export default Icon
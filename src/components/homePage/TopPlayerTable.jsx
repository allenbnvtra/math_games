import Image from "next/image";
import Crown from "@/assets/LeaderboardPlaceCrown.webp";
import Star from "@/assets/topLeader.webp";

const TopPlayerTable = ({ title }) => {
  return (
    <div>
      <div className="flex flex-col bg-white">
        <h1 className="flex gap-1 py-4 pl-3 text-slate-600 text-lg font-medium">
          <Image src={Star} width={25} alt="" /> {title}
        </h1>
        <table>
          <tbody>
            <tr>
              <td className="py-3 px-6 text-left flex gap-2 text-slate-700">
                <Image src={Crown} width={25} alt="" />
                barss23
              </td>
              <td className="py-3 px-14 text-left text-red-600">1</td>
            </tr>

            <tr>
              <td className="py-3 px-14 text-left text-slate-700">marvsss</td>
              <td className="py-3 px-14 text-left text-red-600">2</td>
            </tr>

            <tr>
              <td className="py-3 px-14 text-left text-slate-700">badong</td>
              <td className="py-3 px-14 text-left text-red-600">3</td>
            </tr>

            <tr>
              <td className="py-3 px-14 text-left text-slate-700">lomers</td>
              <td className="py-3 px-14 text-left text-red-600">4</td>
            </tr>

            <tr>
              <td className="py-3 px-14 text-left text-slate-700">arkadia</td>
              <td className="py-3 px-14 text-left text-red-600">5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPlayerTable;

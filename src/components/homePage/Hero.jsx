import Image from "next/image";
import HeroPicture from "@/assets/homeBanner.webp";

const Hero = () => {
  return (
    <div className="relative">
      <Image src={HeroPicture} height={1000} alt="" />
      <div
        className="absolute top-28 px-16 text-white"
        style={{
          textShadow:
            "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
        }}
      >
        <h1 className="text-5xl font-semibold">Mathemathinks</h1>
        <h4 className="text-lg">
          Learn math facts quickly and boost student <br /> engagement with our
          free skill-building math games!
        </h4>
      </div>
    </div>
  );
};

export default Hero;

"use client";

const Hero = () => {
  return (
    <div>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto inset-0 object-cover z-0"
      >
        <source src="logo_web.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Hero;

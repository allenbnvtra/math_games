import Image from "next/image";
import React from "react";
import Picture from "@/assets/about.png";

const AboutUsPage = () => {
  return (
    <div className="px-20 pb-20 pt-4">
      <h1 className="text-center text-5xl font-bold text-slate-700 mb-10">
        About us
      </h1>
      <div className="flex gap-12">
        <div
          className="flex justify-center rounded-full bg-orange-200 shadow-2xl border w-[120rem] overflow-hidden"
          style={{
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
          }}
        >
          <Image src={Picture} alt="" height={90} width={390} />
        </div>
        <h1 className="px-5 text-slate-900 text-sm font-light">
          We are{" "}
          <span className="font-bold text-md">
            Kyla Mae C. Mañaco and Maricella Mae I. Dela Cruz
          </span>
          , both third-year students at Marian College of Baliuag Inc. Our
          academic journey is deeply rooted in our passion for mathematics and
          our commitment to enhancing the mathematical skills of learners.{" "}
          <br />
          <br /> Our primary objective is to enrich the mathematical skills of
          learners through our study. Mathematics is not merely a subject
          confined within the walls of a classroom; it is a fundamental skill
          that permeates various aspects of our daily lives. With this
          understanding, we aspire to develop innovative and effective methods
          to make mathematics more accessible, engaging, and comprehensible to
          learners.
          <br />
          <br />
          Ultimately, our goal is to empower learners to not only grasp
          mathematical concepts but also to develop critical thinking,
          mathematical skills, and analytical skills essential for success in
          various academic and professional endeavors.
          <br />
          <br />
          We believe that by fostering a positive and supportive learning
          environment, we can inspire a lifelong appreciation for mathematics
          and equip students with the confidence and competence to excel in this
          important subject. Join us on this journey as we strive to make
          mathematics a subject that ignites curiosity, sparks creativity, and
          unlocks endless possibilities for growth and achievement. Together,
          let's enrich mathematical skills and pave the way for a brighter
          future.
        </h1>
      </div>
    </div>
  );
};

export default AboutUsPage;

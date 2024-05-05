import Image from "next/image";
import React from "react";
import Picture from "@/assets/file.png";

const AboutUsPage = () => {
  return (
    <div className="px-5 md:px-20 pb-20 pt-4">
      <h1 className="text-center text-5xl font-bold text-slate-700 mb-10">
        About us
      </h1>
      <div className="flex">
        <div className="justify-center items-center w-[120rem] overflow-hidden hidden lg:block">
          <Image src={Picture} alt="" height={90} width={390} />
        </div>
        <h1 className="px-5 text-slate-900 text-sm font-light">
          <span className="pl-8">We are </span>
          <span className="font-bold text-md">
            Kyla Mae C. Mañaco and Maricella Mae I. Dela Cruz
          </span>
          , both third-year students at Marian College of Baliuag Inc. Our
          academic journey is deeply rooted in our passion for mathematics and
          our commitment to enhancing the mathematical skills of learners.{" "}
          <br />
          <br /> <span className="pl-8">Our</span> primary objective is to
          enrich the mathematical skills of learners through our study.
          Mathematics is not merely a subject confined within the walls of a
          classroom; it is a fundamental skill that permeates various aspects of
          our daily lives. With this understanding, we aspire to develop
          innovative and effective methods to make mathematics more accessible,
          engaging, and comprehensible to learners.
          <br />
          <br />
          <span className="pl-8">Ultimately</span>, our goal is to empower
          learners to not only grasp mathematical concepts but also to develop
          critical thinking, mathematical skills, and analytical skills
          essential for success in various academic and professional endeavors.
          <br />
          <br />
          <span className="pl-8">We</span> believe that by fostering a positive
          and supportive learning environment, we can inspire a lifelong
          appreciation for mathematics and equip students with the confidence
          and competence to excel in this important subject.
          <br />
          <br />
          <span className="pl-8">Join</span> us on this journey as we strive to
          make mathematics a subject that ignites curiosity, sparks creativity,
          and unlocks endless possibilities for growth and achievement.
          Together, let's enrich mathematical skills and pave the way for a
          brighter future.
        </h1>
      </div>
    </div>
  );
};

export default AboutUsPage;

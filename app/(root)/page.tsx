import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import HeroSvg from "../../public/svgs/undraw_freelancer_re_irh4.svg";
import undraw_software_engineer from "../../public/svgs/undraw_software_engineer_re_tnjc.svg";
import { Facebook, Twitter, Youtube } from "lucide-react";
import Profile from "@/components/profile/Profile";
export default function Home() {
  return (
    <div className="w-full relative ">
      <div className=" absolute top-0 left-0 w-full px-10 flex justify-between space-x-3 mt-5 items-center">
        <div className="flex justify-center items-center space-x-2">
          <Image
            src={"/images/Hmawbi-logo.png"}
            alt={""}
            width={35}
            height={35}
          ></Image>
          <h1 className="text-primary font-bold text-2xl">UCMS</h1>
        </div>
        {/* <div className="flex justify-center items-center space-x-4">
          <Link
            href={"#"}
            className="text-sm hover:text-primary transition-all"
          >
            CONTACT
          </Link>
          <Link
            href={"#"}
            className="text-sm hover:text-primary transition-all"
          >
            ABOUT US
          </Link>
        </div> */}
        <Profile></Profile>
      </div>
      <div className="h-screen w-full bg-background flex flex-col md:flex-row justify-center items-center px-10">
        <div className="flex md:flex-1 flex-col space-y-5 justify-center items-start">
          <h1 className="font-bold text-4xl">
            Welcome To Our University Campus Management System
          </h1>
          <div className="text-neutral-500 dark:text-neutral-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, unde
            eum veniam alias suscipit, ipsam distinctio placeat magni quam
            mollitia facere, quis aspernatur optio soluta rerum nobis eaque
            officiis assumenda.
          </div>
          <Link href={"/dashboard"}>
            <Button>Start</Button>
          </Link>
        </div>
        <div className="md:flex-1 pt-3 md:pt-0">
          <Image
            src={HeroSvg}
            alt={""}
            // width={60}
            // height={60}
            className=" "
          ></Image>
        </div>
      </div>
      <div className="flex space flex-col-reverse md:flex-row justify-center items-center space-x-10 px-10 h-screen">
        <div className="md:flex-1">
          <Image src={undraw_software_engineer} alt={""} className=" "></Image>
        </div>
        <div className=" md:flex-1 flex flex-col justify-start items-center space-y-4">
          <span className="font-bold text-4xl">
            Streamline Your School Operations with Ease
          </span>
          <div className="text-neutral-500 dark:text-neutral-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, unde
            eum veniam alias suscipit, ipsam distinctio placeat magni quam
            mollitia facere, quis aspernatur optio soluta rerum nobis eaque
            officiis assumenda.
          </div>
        </div>
      </div>
      <div className="w-full bg-primary text-white px-10 py-20 flex flex-col space-y-20 justify-center items-center ">
        <div className="flex justify-around w-full ">
          <div className="flex flex-col space-y-3 justify-center items-center">
            <div className="font-bold text-xl text-center">
              About University
            </div>
            <div className="text-center">News And Announcements</div>
            <div className="text-center">Departments</div>
            <div className="text-center">Student Communities</div>
          </div>
          <div className="flex flex-col space-y-3 justify-start items-center">
            <div className="font-bold text-xl text-center">
              Online Registration
            </div>
            <div className="text-center">Programs</div>
            <div className="text-center">Events And Activities</div>
            <div className="text-center">Research</div>
          </div>
        </div>
        <div className="flex  items-center w-full">
          <div className="flex-1 flex justify-center">
            <div className="flex flex-col justify-center items-center space-y-4">
              <h1 className="font-bold text-3xl">UCMS</h1>
              <div className="flex justify-center items-center space-x-4">
                <Facebook />
                <Youtube />
                <Twitter />
              </div>
            </div>
          </div>
          <div className="flex-1 text-sm">
            Copyright @2024 From Teachers and Students
          </div>
        </div>
      </div>
    </div>
  );
}

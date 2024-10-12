import React from "react";
import Map from "../home/Map";
const ContactUs = () => {
  const contactInfos = [
    {
      country: "MYANMAR",
      location: "Hmawbi",
      phone: "+1 201 545 1133",
      email: "example@gmail.com",
    },
    {
      country: "MYANMAR",
      location: "Hmawbi",
      phone: "+1 201 545 1133",
      email: "example@gmail.com",
    },
  ];
  return (
    <div className="flex flex-col space-y-6 md:space-y-0 space-x-2 md:flex-row justify-center items-center px-10 md:px-28 h-screen ">
      <div className="md:flex-1   ">
        <div className="flex flex-col space-y-5">
          <span className=" text-5xl my-5 font-bold font-oswald">
            CONTACT US
          </span>
          <div className="flex space-x-8">
            {contactInfos.map((info, index) => {
              return (
                <div className="flex flex-col space-y-4">
                  <div>
                    <div className=" text-2xl">{info.country}</div>
                    <div className=" font-poppins  text-sm text-gray-400">
                      {info.location}
                    </div>
                  </div>
                  <div>
                    <div className=" text-2xl">RING US</div>
                    <div className=" font-poppins  text-sm text-gray-400">
                      {info.phone}
                    </div>
                  </div>
                  <div>
                    <div className=" text-2xl">EMAIL US</div>
                    <div className=" font-poppins  text-sm text-gray-400">
                      {info.email}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="md:flex-1">
        <Map></Map>
      </div>
    </div>
  );
};

export default ContactUs;

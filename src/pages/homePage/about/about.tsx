import api from "@/api/api";
import { notification } from "antd";
import React, { useEffect, useState } from "react";

const About = () => {
  const [about, setAbout] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      //   const userId = localStorage.getItem("userId");
      try {
        const res = await api.get("/about-us/get-all");
        setAbout(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        notification.error({
          message: "Error",
          description: "Failed to fetch user data. Please try again.",
        });
      }
    };
    fetchUser();
  }, []);
  console.log("about", about);

  return <div>about</div>;
};

export default About;

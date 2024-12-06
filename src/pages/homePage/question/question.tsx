import api from "@/api/api";
import { notification } from "antd";
import React, { useEffect, useState } from "react";

const Question = () => {
  const [about, setAbout] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      //   const userId = localStorage.getItem("userId");
      try {
        const res = await api.get("/question/answer/get-questions");
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
  console.log("Question", about);

  return <div>Question</div>;
};

export default Question;

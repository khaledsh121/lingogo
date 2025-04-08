import axios from "axios";
import { serverURI } from "../Api/Api";
export const backendNavigation = async (navigate, whereto) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      navigate("/Login", { replace: true });
      return;
    }

    const response = await axios.get(serverURI + "/navigate/", {
      params: { whereto: whereto },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    navigate(response.data.whereto, { replace: true });
  } catch (error) {
    console.error("Navigation error:", error);

    if (error.response && error.response.status === 401) {
      console.log("Invalid or expired token, logging out...");
      localStorage.removeItem("token");
      navigate("/Login", { replace: true });
    }
  }
};

export const checkLogedIn = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const response = await axios.get(serverURI + "/auth/verify", {
      token,
    });
    return response.data.success; // Ensure the function returns a boolean
  } catch (err) {
    console.log("error: " + err);
    return false; // Return false in case of an error
  }
};

export const fetchImageFromGoogleAPI = async (searchTerm) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(serverURI + "/imgsearch/api/fetch-image", {
      params: { searchTerm },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data.imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Error fetching image");
  }
};

export const fetchTranslation = async (sentence, translateTo) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(serverURI + "/translate/", {
      params: { message: sentence, translateTo: translateTo },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data.translated;
  } catch (error) {
    console.error("Error fetching translation:", error);
    throw new Error("Error fetching translation");
  }
};

export const savePresentation = async (slides) => {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      serverURI + "/presentationRoute/save",
      { translatingFrom: "en", translatingTo: "ar", slides: slides },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error saving presentation:", error.response?.data || error);
  }
};

export const getPresentations = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(serverURI + "/presentationRoute/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching translation:", error);
    throw new Error("Error fetching translation");
  }
};

export const chatWithAiAgent = async (message, chatId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      serverURI + "/chat/",
      {
        chatId: chatId,
        userMessage: message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    console.log("error: " + err);
  }
};

export const getUserChats = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(serverURI + "/chat/getUserChats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data.chats;
};

export const getCurentChat = async (chatId) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(serverURI + "/chat/getCurrentChat", {
    params: {
      chatId,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};

export const getLevel = async (currentLevel) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(serverURI + "/getlevel/getlevels", {
      params: {
        currentLevel: currentLevel,
        targetLanguage: "arabic",
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data.level;
  } catch (err) {
    console.log("error: " + err);
  }
};

export const SubmitLevel = async (fullAnswer) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    serverURI + "/getlevel/saveLevel",
    { fullAnswer: fullAnswer },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Send JWT token
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.success;
};

export const getUserLevel = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(serverURI + "/getlevel/getuserlevel", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data.userLevel;
};

export const getUserData = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(serverURI + "/getUserData", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUserImg = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(serverURI + "/getUserData/img", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data.img
    ? `${serverURI}/${response.data.img}`
    : response.data.img;
};

export const updateUserInfo = async (userData) => {
  try {
    const response = await axios.put(
      serverURI + "/getUserData/update",
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log("User updated:", response.data.user);
  } catch (error) {
    console.error(
      "Error updating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const saveTimeUtil = async (time) => {
  const token = localStorage.getItem("token");
  await axios.post(
    serverURI + "/getUserData/saveTime",
    { timeSpent: time },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

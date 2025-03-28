import axios from "axios";

export const backendNavigation = async (navigate, whereto) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found");
      navigate("/Login", { replace: true });
      return;
    }

    const response = await axios.get("http://localhost:5000/navigate/", {
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
    const response = await axios.get("http://localhost:5000/auth/verify", {
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
    const response = await axios.get(
      "http://localhost:5000/imgsearch/api/fetch-image",
      {
        params: { searchTerm },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data.imageUrl;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Error fetching image");
  }
};

export const fetchTranslation = async (sentence) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get("http://localhost:5000/translate/", {
      params: { message: sentence, target: "ar" },
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
    const res = await axios.post(
      "http://localhost:5000/presentationRoute/save",
      { translatingFrom: "en", translatingTo: "ar", slides: slides },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Presentation saved successfully:", res.data);
  } catch (error) {
    console.error("Error saving presentation:", error.response?.data || error);
  }
};

export const getPresentations = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://localhost:5000/presentationRoute/get",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching translation:", error);
    throw new Error("Error fetching translation");
  }
};

export const chatWithAiAgent = async (message) => {
  const token = localStorage.getItem("token");

  const adjustedMessage = `translate this word into arabic and give me 10 scentnces that uses this word and thier translation the word is ${message}`;

  try {
    const response = await axios.get("http://localhost:5000/chat/", {
      params: { message: adjustedMessage },
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data.newText;
  } catch (err) {
    console.log("error: " + err);
  }
};

export const getLevel = async (currentLevel) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      "http://localhost:5000/getlevel/getlevels",
      {
        params: {
          currentLevel: currentLevel,
          targetLanguage: "arabic",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data.level;
  } catch (err) {
    console.log("error: " + err);
  }
};

export const SubmitLevel = async (fullAnswer) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    "http://localhost:5000/getlevel/saveLevel",
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
  const response = await axios.get(
    "http://localhost:5000/getlevel/getuserlevel",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data.userLevel;
};

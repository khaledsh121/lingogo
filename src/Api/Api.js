import axios from "axios";

axios
  .get("http://localhost:5000")
  .then((response) => {
    console.log(response.data);
    setData(response.data); // Update state with response data
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });

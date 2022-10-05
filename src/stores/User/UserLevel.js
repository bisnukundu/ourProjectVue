import axios from "axios";
import { ref } from "vue";
import { defineStore } from "pinia";
import { UseConfig } from "../../composable/UseConfig";

export const useUserLevelStore = () => {
  const config = UseConfig();
  const userLevel = async () => {
    const config_option = {
      headers: { Authorization: `Bearer ${config.token}` },
    };

    const response = await axios.get(
      `${config.api_base_url}/user/level`,
      config_option
    );
    console.log(response)
    return response;
  };
  return { userLevel };
};

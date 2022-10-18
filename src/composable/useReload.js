import { ref } from "vue";

export const useReload = () => {
  const reloadCheck = ref(true);
  const timerCount = ref(30); //30sec
  if (reloadCheck.value) {
    reloadCheck.value = false;

    //   const level_data = await level.userLevel();
    //   ls.set("userLevel", level_data.data);
    //   user_level.value = level_data.data;

    setTimeout(() => {
      reloadCheck.value = true;
      timerCount.value = 30;
      clearInterval(timerInterval);
    }, 30000);

    const timerInterval = setInterval(() => {
      timerCount.value--;
    }, 1000);
  }
};

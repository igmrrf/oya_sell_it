import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const prefix = "cache";
const expiredInMinutes = 5;

const ifExpired = (item) => {
  const now = dayjs();
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, "minutes") > expiredInMinutes;
};

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    AsyncStorage.setItem(prefix + key, JSON.stringify(item));
  } catch (e) {
    console.log(e);
  }
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);
    if (!item) return null;

    if (ifExpired(item)) {
      await AsyncStorage.removeItem(prefx + key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.log(error);
  }
};

export default { store };

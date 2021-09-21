import client from "./client";

const registerToken = (pushToken) =>
  client.post("/expoPushtokens", { token: pushToken });

export default { registerToken };

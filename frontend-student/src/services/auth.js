import { BACKEND } from "../constants";

async function logInUser(data) {
  const res = await fetch(`${BACKEND}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resJson = await res.json();
  return resJson;
}

async function signUpUser(data) {
  const formattedData = {
    password: data.password,
    student: {
      email: data.email,
      name: data.name,
      contactNumber: data.contactNumber,
      currentInstitution: data.currentInstitution,
      gender: data.gender,
      qualification: data.qualification,
      address: data.address,
    },
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(formattedData));
  const res = await fetch(`${BACKEND}/user/create-student`, {
    method: "POST",
    body: formData,
  });
  const resJson = await res.json();
  if (!resJson.success) {
    console.log(resJson);
    return resJson;
  }
  //return resJson;
  //WARN: for dev only
  const verifyRes = await fetch(`${BACKEND}/user/verify-user`, {
    method: "POST",
    headers: {
      Authorization: resJson.data.token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      otp: resJson.data.otp,
    }),
  });
  const verifyResJson = await verifyRes.json();
  return verifyResJson;
}

export const authService = { logInUser, signUpUser };

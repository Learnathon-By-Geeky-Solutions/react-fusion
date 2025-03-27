import { BACKEND } from "../constants";

async function logInInstructor(data) {
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

async function signUpInstructor(data) {
  const formattedData = {
    password: data.password,
    instructor: {
      email: data.email,
      name: data.name,
      contactNumber: data.contactNumber,
      experience: data.experience,
      gender: data.gender,
      qualification: data.qualification,
      currentWorkingPlace: data.currentWorkingPlace,
      designation: data.designation,
    },
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(formattedData));

  const res = await fetch(`${BACKEND}/user/create-instructor`, {
    method: "POST",
    body: formData,
  });

  const resJson = await res.json();
  if (!resJson.success) {
    console.log(resJson);
    return resJson;
  }

  // WARN: For development only - Automatically verifying OTP
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

export const instructorAuthService = { logInInstructor, signUpInstructor };

import { BACKEND } from "../constants";

async function logInUser(data) {
  /*
{
    "email":"a@s.com",
    "password":"test12"
}
*/
  console.log(data);
  return "success";
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
  console.log("res ", resJson);
  return resJson;
}

export const authService = { logInUser, signUpUser };

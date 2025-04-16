import { BACKEND } from '../constants';

export async function addModule(params) {
  console.log('params', params);
  try {
    const result = await fetch(`${BACKEND}/module/`, {
      method: 'POST',
      headers: {
        Authorization: params.instructor.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data)
    });

    const data = await result.json();
    console.log('data', data);
    return data;
  } catch (error) {
    console.error('Error adding module:', error);
    return { success: false };
  }
}

export async function updateModule(params) {
  try {
    const result = await fetch(`${BACKEND}/module/${params.data.moduleId}`, {
      method: 'PUT',
      headers: {
        Authorization: params.instructor.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error updating module:', error);
    return { success: false };
  }
}

export async function deleteModule(params) {
  try {
    const result = await fetch(`${BACKEND}/module/${params.data.moduleId}`, {
      method: 'DELETE',
      headers: {
        Authorization: params.instructor.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error delete module:', error);
    return { success: false };
  }
}

export async function checkModule(params) {
  try {
    const result = await fetch(`${BACKEND}/module/${params.moduleId}`, {
      method: 'GET',
      headers: {
        Authorization: params.instructor.token
      }
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching module data:', error);
    return { success: false };
  }
}

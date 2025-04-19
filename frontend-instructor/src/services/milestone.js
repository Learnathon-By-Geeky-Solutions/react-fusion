import { BACKEND } from '../constants';

export async function addMilestone(params) {
  try {
    const result = await fetch(`${BACKEND}/milestone/`, {
      method: 'POST',
      headers: {
        Authorization: params.instructor.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.data)
    });

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error adding milestone:', error);
    return { success: false };
  }
}

export async function updateMilestone(params) {
  try {
    const result = await fetch(
      `${BACKEND}/milestone/${params.data.milestoneId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: params.instructor.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params.data.milestone)
      }
    );

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error updating milestone:', error);
    return { success: false };
  }
}

export async function deleteMilestone(params) {
  try {
    const result = await fetch(
      `${BACKEND}/milestone/${params.data.milestoneId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: params.instructor.token
        }
      }
    );

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error delete milestone:', error);
    return { success: false };
  }
}

export async function checkMilestone(params) {
  try {
    const result = await fetch(
      `${BACKEND}/milestone/${params.data.milestoneId}`,
      {
        method: 'GET',
        headers: {
          Authorization: params.instructor.token
        }
      }
    );

    const data = await result.json();
    return data;
  } catch (error) {
    console.error('Error fetching milestone data:', error);
    return { success: false };
  }
}

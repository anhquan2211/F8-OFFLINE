/** @format */

const apiUrl = "https://ff9cn8-8080.csb.app/tasks";

//Get các task từ url
export const getTasks = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

//Post task lên url
export const postTasks = async (task) => {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

//Edit task
export const editTasks = async (id, name, done) => {
  const response = await fetch(apiUrl + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, done }),
  });
  const data = await response.json();
  return data;
};

//Delete task
export const deleteTasks = async (id) => {
  const response = await fetch(apiUrl + "/" + id, {
    method: "DELETE",
  });
  return response;
};

//Get Task Detail by ID
export const getTaskDetails = async (taskId) => {
  const response = await fetch(`${apiUrl}/${taskId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch task details for task ID ${taskId}`);
  }

  const task = await response.json();
  return task;
};

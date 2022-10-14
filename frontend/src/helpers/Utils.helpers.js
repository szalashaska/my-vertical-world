export const getContent = async (content, id) => {
  let endpoint = `/api/${content}`;
  if (id) endpoint = `/api/${content}/${id}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (response.status === 200) {
      return data;
    }
  } catch (err) {
    console.log("Unexpected error", err);
    return;
  }
};

export const getPaginatedContent = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 200) {
      return data;
    }
  } catch (err) {
    console.log("Unexpected error", err);
    return;
  }
};

import axios from "axios";

const URL = "https://639a2ded16b0fdad77567e26.mockapi.io/CRUD";

export async function getData() {
  const response = await axios.get(URL);
  return response.data;
}

export async function postData(item) {
  const response = await axios.post(URL, {
    // title: item.title,
    // text: item.text,
    // image: image.image,
    // url: item.url,
  });
  return response;
}

export async function updateData(item) {
  const response = await axios.put(`${URL}/${item.id}`, {
    // title: item.title,
    // text: item.text,
    // image: image.image,
    // url: item.url,
  });
  return response;
}

export async function deleteData(id) {
  const response = await axios.delete(`${URL}/${id}`);
  return response;
}

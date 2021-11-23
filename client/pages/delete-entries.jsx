export default function deleteEntry(type, id, getData) {
  fetch(`/api/${type}s/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(resp => {
      getData();
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

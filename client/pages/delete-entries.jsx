export default function deleteEntry(type, id, getData) {
  const currentUserJSON = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserJSON);
  const { token } = currentUser;
  fetch(`/api/${type}s/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token
    }
  })
    .then(resp => {
      getData();
    })
    .catch(error => {
      console.error('Error:', error);
    });

}

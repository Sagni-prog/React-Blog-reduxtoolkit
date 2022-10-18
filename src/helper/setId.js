const setId = (posts) => {
    let userId;
    let num;
  if(posts.length === 0) {
      userId = 1;
  }
  else{
       num = posts.length;
       userId = posts[num - 1].id + 1
  }
  return userId
}

export default setId
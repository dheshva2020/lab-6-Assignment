function simplePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise completed!');
    }, 1000);
  });
}

function fetchUserProfile(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe'
      };
      resolve(user);
    }, 1000);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts = [
        { postId: 1, userId: userId, title: 'First Post', content: 'This is the first post.' },
        { postId: 2, userId: userId, title: 'Second Post', content: 'This is the second post.' },
        { postId: 3, userId: userId, title: 'Third Post', content: 'This is the third post.' }
      ];
      resolve(posts);
    }, 1000);
  });
}
async function fetchDataSequentially(userId) {
  console.log('Starting sequential fetch...');
  const startTime = Date.now();
  
  try {
    const user = await fetchUserProfile(userId);
    const posts = await fetchUserPosts(userId);
    console.log('User profile retrieved');
    console.log('Posts retrieved');
    posts.comments =await fetchPostComments(posts.postId);
    posts.comments.forEach(comment => {
      console.log(`Comments for Post ${posts.postId} retrieved`);
    });
          
    const endTime = Date.now();
    console.log(`Sequential fetch took ${endTime - startTime}ms`);
    console.log(`sequential time: ${Date.now() - startTime}ms`);
    
    return { user, posts };
    // TODO: Return all data combined
    
  } catch (error) {
    console.error('Error in sequential fetch:', error.message);
  }
}

async function fetchDataInParallel(userId) {
  console.log('Starting parallel fetch...');
  const startTime = Date.now();
  
  try {
    const[ user, posts ]=await Promise.all([fetchUserProfile(userId),fetchUserPosts(userId)]);
    console.log('User and posts retrieved simultaneously');
    
    const commentsPromises = posts.map(post => fetchPostComments(post.postId));
    const commentsArray = await Promise.all(commentsPromises);
    fetchPostComments.forEach((comments, index) => {
      posts[index].comments = comments;
      console.log(`Comments for Post ${posts[index].postId} retrieved`);
    });
    use.post.map(post=>fetchPostComments(post.postId));
    promiseall(commentsPromises);
    console.log('All comments retrieved simultaneously');
    const endTime = Date.now();
    console.log(`Parallel fetch took ${endTime - startTime}ms`);
    return { user, posts };
        
  } catch (error) {
    console.error('Error in parallel fetch:', error.message);
  }
}
function fetchPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const comments = [
        { commentId: 1, postId: postId, content: 'Great post!' },
        { commentId: 2, postId: postId, content: 'Very informative.' },
        { commentId: 3, postId: postId, content: 'Thanks for sharing!' }
      ];
      // add random failure (30% chance of error)
      if (Math.random() < 0.3) {
        reject(new Error('Failed to fetch comments'));
        return;
      }
      
      // Your existing code here...
      resolve(comments);
    }, 2000);
  });
}
async function fetchDataWithErrorHandling(userId) {
  try {
    fetchPostComments(post.postID)
    .then(comments=>{
      post.comments=comments;
    })
    .catch(error=>{
      console.error(`Error fetching comments for Post ${post.postId}:`, error.message);
      post.comments=[];
    });

    const allData = await getUserContent(userId);
    return allData;
    
  } catch (error) {
    console.error('Error fetching user content:', error.message);
    console.log('Handling error gracefully...');
    console.log('returning partial data if available');
    console.log('Displaying user-friendly error message');

    throw error;    
  }
}
async function getUserContent(userId) {
  console.log('=== Fetching all user content ===');
  
  try {
    
    const user = await fetchUserProfile(userId);
    const post = await fetchUserPosts(userId);
    console.log('Step 1: User profile retrieved -', user.name);
    post.comments=await fetchPostComments(post.postId);
    post.comments.forEach(comment=>{
      console.log(`Comments for Post ${post.postId} retrieved`);
    });
    return { user, post };
    
    // TODO: Complete this step
    // console.log('Step 2: Posts retrieved -', post.length);
    // console.log('Step 3: Comments retrieved for all posts');
    
    // Step 4: Combine all data into one object
    const allContent = {
      // TODO: Structure your complete data
    };
    
    return allContent;
    
  } catch (error) {
    console.error('Failed to fetch user content:', error.message);
    throw error;
  }
}
document.getElementById('parallelBtn').addEventListener('click', async () => {
  const userId = 1;
  const data = await fetchDataInParallel(userId);
  displayResults(data, document.getElementById('output'));
});

document.getElementById('errorHandlingBtn').addEventListener('click', async () => {
  const userId = 1;
  const data = await fetchDataWithErrorHandling(userId);
  displayResults(data, document.getElementById('output'));
});
function displayResults(data, container) {
    function cleartheContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    }
    function createHTMLElements(data) {
    const userInfo = document.createElement('div');
    userInfo.innerHTML = `<h2>User Information</h2>
                          <p>Name: ${data.user.name}</p>
                          <p>Email: ${data.user.email}</p>
                          <p>Username: ${data.user.username}</p>`;
    container.appendChild(userInfo);
    data.posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.innerHTML = `<h3>${post.title}</h3>
                           <p>${post.content}</p>`;
      const commentsList = document.createElement('ul');
        post.comments.forEach(comment => {
        const commentItem = document.createElement('li');
        commentItem.textContent = comment.content;
        commentsList.appendChild(commentItem);
      });
      postDiv.appendChild(commentsList);
      container.appendChild(postDiv);
    });
  }
    cleartheContainer(container);
    createHTMLElements(data);
}


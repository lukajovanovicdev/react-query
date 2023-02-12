import { useMutation, useQuery } from '@tanstack/react-query';

async function fetchComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'DELETE',
  });
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'PATCH',
    data: { title: 'REACT QUERY FOREVER!!!!' },
  });
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isError, isLoading } = useQuery(['comments', post.id], () =>
    fetchComments(post.id)
  );
  const {
    mutate: deletePostMutation,
    isError: isDeletePostError,
    isLoading: isDeletePostLoading,
    isSuccess: isDeletePostSuccess,
  } = useMutation((postId) => deletePost(postId));

  const updateTitleMutation = useMutation(() => updatePost(post.id));

  if (isError) return <h3>Error</h3>;
  if (isLoading) return <h3>Loading...</h3>;

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deletePostMutation(post.id)}>Delete</button>
      {isDeletePostError && <p style={{ color: 'red' }}>Error deleting post</p>}
      {isDeletePostLoading && <p style={{ color: 'purple' }}>Deleting the post...</p>}
      {isDeletePostSuccess && <p style={{ color: 'green' }}>Success!</p>}
      <button onClick={() => updateTitleMutation.mutate()}>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}

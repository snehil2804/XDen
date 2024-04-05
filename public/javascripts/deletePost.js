//deletePost.js
function deletePost(postId) {
    // Make an AJAX request to delete the post
    fetch(`/posts/${postId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            // If the deletion was successful, remove the corresponding HTML element
            const indexPostElement = document.getElementById(`post-${postId}`);
            if (indexPostElement) {
                indexPostElement.remove();
            }
            // Dispatch a custom event upon successful deletion
            const deleteEvent = new CustomEvent('postDeleted', { detail: postId });
            document.dispatchEvent(deleteEvent);
        } else {
            console.error('Failed to delete post');
        }
    })
    .catch(error => {
        console.error('Error deleting post:', error);
    });
}

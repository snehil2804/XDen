//bookmar.js
// Function to handle liking a post
async function bookmark(postId) {
    try {
        const response = await fetch(`/bookmark/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });    
        
        // Toggle heart icon based on the response
        if (response.ok) {
            window.location.reload(); // Reload the page to update the like count //window.location.reloads returns the scroll position to the top
            // and if we want to store the scroll psition after reload we can use the following code
            // var scrollPosition = window.scrollY;
            // window.location.reload();
            // window.scroll(0, scrollPosition);
            
        }

    } catch (error) {
        console.error('Error liking post:', error);
    }
}

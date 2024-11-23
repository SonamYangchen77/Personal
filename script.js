function toggleFolder(folderId) {
    const folderContent = document.getElementById(`${folderId}-content`);
    const isVisible = folderContent.style.display === 'block';
    
    // Toggle the visibility of the folder content
    folderContent.style.display = isVisible ? 'none' : 'block';
  }
  
  function addImage(folderId) {
    const folderImages = document.getElementById(`${folderId}-images`);
  
    // Prompt user to select an image file
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = function (event) {
      const file = event.target.files[0];
      if (file) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file); // Display the selected image
        folderImages.appendChild(img);
      }
    };
    
    fileInput.click();
  }

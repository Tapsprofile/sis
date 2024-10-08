export default {
    onShowModalClick1(model) {
        // Set the modal's visibility to true to open it
        const modalKey = 'loginModal'; // Assuming the ID of the modal is 'loginModal' from the JSON
        if (modalKey && model[modalKey] !== undefined) {
          model[modalKey] = false; // Open the modal
          console.log(`Modal "${modalKey}" is now visible`);
        } else {
          console.warn(`Modal with key "${modalKey}" is not defined in the model.`);
        }
      }
};
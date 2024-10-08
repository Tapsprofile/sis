export default {
    onEmailInput(event) {
        console.log('Email input:', event.target.value);
    },
    onPasswordInput(event) {
        console.log('Password input:', event.target.value);
    },
    onLoginClick(model) {
        debugger
        // Validation logic for the login form
        if (!model.username) {
            alert("Username cannot be empty");
            return;
        }
        if (!model.password) {
            alert("Password cannot be empty");
            return;
        }

        // Proceed with login submission
        console.log('Login button clicked with model data:', model);
        // You can add your form submission logic here
    },
    onShowModalClick(model) {
        debugger
        // Set the modal's visibility to true to open it
        const modalKey = 'loginModal'; // Assuming the ID of the modal is 'loginModal' from the JSON
        if (modalKey && model[modalKey] !== undefined) {
          //model[modalKey] = false; // Open the modal
          console.log(`Modal "${modalKey}" is now visible`);
        } else {
          console.warn(`Modal with key "${modalKey}" is not defined in the model.`);
        }
      },
      closeModal(model) {
        debuuger
        const modalKey = 'loginModal'; // Assuming the ID of the modal is 'loginModal' from the JSON
        if (modalKey && model[modalKey] !== undefined) {
          model[modalKey] = false; // Open the modal
          console.log(`Modal "${modalKey}" is now not visible`);
        } else {
          console.warn(`Modal with key "${modalKey}" is not defined in the model.`);
        }
      },
    onCountryChange(event) {
        console.log('Country selected:', event.target.value);
    },
    onSubmitPaymentClick(model) {
        console.log('Submit payment clicked with model data:', model);
    },
    // Add more handlers as needed
};

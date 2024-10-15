export default {
    onCountryChange(event) {
        console.log('Country selected:', event.target.value);
    },
    onSubmitPaymentClick(model) {
        console.log('Submit payment clicked with model data:', model);
    },
    // Add more handlers as needed
};

export default function showReset(form) {
    const formInput = form.querySelector('.form__search-input'),
        formReset = form.querySelector('.form__reset');

    form.addEventListener('reset', () => {
        formReset.classList.remove('active');
    });

    formInput.addEventListener('input', () => {
        if (formInput.value !== '') {
            formReset.classList.add('active');
        }
        else {
            formReset.classList.remove('active');
        }
    })
}
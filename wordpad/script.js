let textarea = document.querySelector('#word-input');
let wordCount = document.querySelector('#word-count');
let characterCount = document.querySelector('#character-count');

textarea.addEventListener('input', (e) => {
    let textValue = e.target.value.length;
    characterCount.innerHTML = textValue;
    let wordsList = e.target.value.trim().split(' ').filter(word => {
        return word.length>0
    });
    wordCount.innerHTML = wordsList.length;
});

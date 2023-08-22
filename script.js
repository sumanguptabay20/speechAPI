const synth = window.speechSynthesis;

const textform = document.querySelector('form');
const textInput = document.querySelector('#text-area');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const ratevalue = document.querySelector('#ratevalue');
const pitch = document.querySelector('#pitch');
const pitchvalue = document.querySelector('#pitchvalue');
const body = document.querySelector('body');


let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    console.log(voices);

    //    loop through voices and create an option for each
    voices.forEach(voice => {
        // create option element
        const option = document.createElement('option');
        // fill option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')';

        // set needed option
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });

};

getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}
const speak = () => {
    if (synth.speaking) {
        console.error('Already Speaking....');
        return;
    }
    if (textInput.value !== '') {

        body.style.background = '#141414 url(images/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
    
        // get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // speakend
        speakText.onend = e => {
            console.log('Done Speaking.....');

        }
        // speak error
        speakText.onerror = e => {
            console.error('Something went wrong.....')
        }
        // selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        console.log(selectedVoice);

        // loop through voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //  speak
        synth.speak(speakText);

    }
};
// Event Listener
textform.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
    backg
});

// Rate Value change
rate.addEventListener('change', e => ratevalue.textContent = rate.value);


// pitch value change
pitch.addEventListener('change', e => pitchvalue.textContent = pitch.value);


// voice select change
voiceSelect.addEventListener('change', e => speak());

 





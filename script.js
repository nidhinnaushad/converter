const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("button"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
	for(let voice  of synth.getVoices()){
		let selected = voiice
		//creating an option tag
		let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
		voiceList.insertAdjacentHTML("beforeend", option);
	}
}

synth.addEventListener("voiceschanged", voices)

function textToSpeech(text){
	let utternance = new SpeechSynthesisUtterance(text);
	for(let voice of synth.getVoices()){
		//checking if selected voice name is available 
		if(voice.name === voiceList.value){
			utternance.voice = voice; 
		}
	}
	synth.speak(utternance);//speak
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});
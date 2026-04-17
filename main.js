const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const result = document.getElementById("result");
const errorMessage = document.getElementById("error-message");
const audioPlayer = document.getElementById("audio-player");
const saveButton = document.getElementById("save-button");
const synonymsElement = document.getElementById("synonyms");
const definitionElement = document.getElementById("definition");
const exampleElement = document.getElementById("example");
const partOfSpeechElement = document.getElementById("part-of-speech");

// Event listener for form submission to fetch and display word information
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const word = input.value.trim();

  if (!word) {
    errorMessage.textContent = "Please enter a word.";
    result.classList.add("hidden");
    return;
  }

  errorMessage.textContent = "";

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

    if (!response.ok) {
      throw new Error("Word not found.");
    }
    const data = await response.json();
    displayWord(data[0]);

  } catch (error) {
    errorMessage.textContent = error.message;
    result.classList.add("hidden");
  }
}    
);  

// Function to display the word information
function displayWord(data) {
  const word = data.word;
  const phonetic = data.phonetic || "Not applicable";

  const meaning = data.meanings[0];
  const definition = meaning.definitions[0].definition;
  const example = meaning.definitions[0].example || "No example available";
  const synonyms = meaning.definitions[0].synonyms || [];
  const partOfSpeech = meaning.partOfSpeech || "Not applicable";

  document.getElementById("word-title").textContent = word;
  document.getElementById("phonetic").textContent = "Pronunciation: " + phonetic;
  partOfSpeechElement.textContent = "Type: " + partOfSpeech;
  definitionElement.textContent = "Definition: " + definition;
  exampleElement.textContent = "Example: " + example;
  synonymsElement.textContent = synonyms.length ? "Synonyms: " + synonyms.join(", ") : "";

  if (data.phonetics && data.phonetics[0] && data.phonetics[0].audio) {
    audioPlayer.src = data.phonetics[0].audio;
    audioPlayer.classList.remove("hidden");
  } else {
    audioPlayer.classList.add("hidden");
  }
  result.classList.remove("hidden");
  saveButton.onclick = function() {
    saveWord(word);
  };

  function saveWord(word) {
    let savedWords = JSON.parse(localStorage.getItem("savedWords")) || [];
    if (!savedWords.includes(word)) {
      savedWords.push(word);
      localStorage.setItem("savedWords", JSON.stringify(savedWords));
      alert(`"${word}" has been saved to your favorites!`);
    } else {
      alert(`"${word}" is already in your favorites!`);
    }
    displaysavedWords();
  }
}

function displaysavedWords() {
  const savedWordsList = document.getElementById("saved-words-list");
  savedWordsList.innerHTML = "";
  const savedWords = JSON.parse(localStorage.getItem("savedWords")) || [];
  savedWords.forEach(word => {
    const li = document.createElement("li");
    li.textContent = word;
    savedWordsList.appendChild(li);
  });
}

window.onload = function() {
  displaysavedWords();
};





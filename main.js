const form = document.getElementById("search-form");
const input = document.getElementById("word-input");
const result = document.getElementById("result");
const errorMessage = document.getElementById("error-message");

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
});
// Function to display the word information
function displayWord(data) {
  const word = data.word;
  const phonetic = data.phonetic || "Not applicable";

  const meaning = data.meanings[0];
  const partOfSpeech = meaning.partOfSpeech;
  const definition = meaning.definitions[0].definition;
  const example = meaning.definitions[0].example || "No example available";
  
// Update the DOM with the fetched information
  document.getElementById("word-title").textContent = word;
  document.getElementById("phonetic").textContent = "Pronunciation: " + phonetic;
  document.getElementById("part-of-speech").textContent = "Type: " + partOfSpeech;
  document.getElementById("definition").textContent = "Definition: " + definition;
  document.getElementById("example").textContent = "Example: " + example;

  result.classList.remove("hidden");
}  


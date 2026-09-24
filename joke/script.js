const JOKE_API_URL = "https://v2.jokeapi.dev/joke/Any?type=twopart";

const button = document.getElementById("next-joke");
const categoryEl = document.getElementById("category");
const setupEl = document.getElementById("setup");
const deliveryEl = document.getElementById("delivery");
const statusEl = document.getElementById("status");

function clearJoke() {
  categoryEl.hidden = true;
  categoryEl.textContent = "";
  setupEl.textContent = "";
  deliveryEl.textContent = "";
}

function showStatus(message, isError) {
  clearJoke();
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
  statusEl.hidden = false;
}

function renderJoke(joke) {
  statusEl.hidden = true;
  statusEl.textContent = "";
  categoryEl.textContent = joke.category;
  categoryEl.hidden = false;
  setupEl.textContent = joke.setup;
  deliveryEl.textContent = joke.delivery;
}

async function loadNextJoke() {
  button.disabled = true;
  showStatus("Carregando...", false);

  try {
    const response = await fetch(JOKE_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.message || "Erro retornado pela API");
    }

    renderJoke(data);
  } catch (error) {
    console.warn("Falha ao buscar piada:", error);
    showStatus("Não foi possível carregar uma piada agora. Tente novamente.", true);
  } finally {
    button.disabled = false;
  }
}

button.addEventListener("click", loadNextJoke);

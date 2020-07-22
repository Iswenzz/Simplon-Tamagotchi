let mainLoop = null;
let mainLoopPaused = false;
let selectedCharacter = null; // Character selected to play/edit profile
let selectedViewport = null;
let characters = [];
let gameConsole = null;
const audio_bgm = document.getElementById("bgm");
const helpModal = document.getElementById("helpModal");

/**
 * Slider callback to change the selected char/preview color & slider formatting.
 */
const slider = new Slider('#form-color', {
	formatter: (value) => {
		if (selectedCharacter)
			selectedCharacter.color = value;
		return value.toString();
	}
});

/**
 * Initialize profile events.
 */
const initProfiles = () =>
{
	for (let p of characters)
	{
		// profile click event
		document.querySelector(`#profile-${p.id}`).addEventListener("click", selectProfile);
		// profile delete event
		document.querySelector(`#profile-${p.id} i[data-action*="delete"]`).addEventListener("click", (e) => 
		{
			e.stopPropagation();
			characters[p.id] = new Character(p.id);
			saveProfiles();
			loadProfiles();
		});
	}
}

/**
 * Load profiles from localstorage.
 */
const loadProfiles = () =>
{
	// load profiles from local storage & fill DOM elements
	let profiles = JSON.parse(localStorage.getItem("profiles"));
	characters = [];

	if (profiles)
	{
		for (let p of profiles)
		{
			characters.push(new Character(p.id, p.name, p.color, p.sleep, p.playing, p.hunting, p.isNew));

			// fill DOM elements
			const color = document.querySelector(`#profile-${p.id} img`);
			color.setAttribute("style", `filter: hue-rotate(${p.color}deg)`);
			const name = document.querySelector(`#profile-${p.id} h5`);
			name.innerText = p.name;
			const profile = document.querySelector(`#profile-${p.id} ul`);
			profile.children[0].style.width = `${p.sleep}%`;
			profile.children[0].innerText = `${p.sleep}%`;
			profile.children[1].style.width = `${p.playing}%`;
			profile.children[1].innerText = `${p.playing}%`;
			profile.children[2].style.width = `${p.hunting}%`;
			profile.children[2].innerText = `${p.hunting}%`;

			if (p.isNew) // empty new profile element
			{
				color.classList.add("d-none");
				profile.children[0].classList.add("d-none");
				profile.children[1].classList.add("d-none");
				profile.children[2].classList.add("d-none");
				name.innerText = "New Profile";
			}
		}
	}
	else // Reset localstorage
	{
		for (let i = 0; i < 3; i++)
			characters.push(new Character(i));
		saveProfiles();
		loadProfiles();
	}
}

/**
 * Save profiles to localstorage.
 */
const saveProfiles = () =>
{
	let profiles = [];
	for (let p of characters)
	{
		profiles.push({
			id: p.id,
			name: p.name,
			color: p.color,
			sleep: p.sleep,
			playing: p.playing,
			hunting: p.hunting,
			isNew: p.isNew
		});
	}
	localStorage.setItem("profiles", JSON.stringify(profiles));
}

/**
 * Select a profile to start the game or create a new profile.
 * @param {MouseEvent} e - Click event args.
 */
const selectProfile = (e) => 
	selectProfileById(parseInt(e.target.parentNode.getAttribute("data-id"), 10));

/**
 * Select a profile to start the game or create a new profile from the specified profile ID.
 * @param {number} id - The profile ID.
 */
const selectProfileById = (id) =>
{
	selectedCharacter = characters[id];
	if (!selectedCharacter)
		return;

	// remove all profile click event
	for (let i = 0; i < 3; i++)
		document.querySelector(`#profile-${i}`).removeEventListener("click", selectProfile);

	if (selectedCharacter.isNew)
	{
		selectedCharacter.isNew = false;
		newProfile();
	}
	else
		gameLoop();
}

/**
 * Create a new profile.
 */
const newProfile = () =>
{
	toggleViewport("new");
	document.getElementById("new-create").addEventListener("click", gameLoop);
	document.getElementById("form-name").addEventListener("change", 
		(e) => selectedCharacter.name = e.target.value);
}

/**
 * The main game loop.
 */
const gameLoop = () =>
{
	toggleViewport("game");
	// create profile listener
	document.getElementById("new-create").removeEventListener("click", gameLoop);

	// gameplay button listeners
	document.getElementById("btn-sleep")
		.addEventListener("click", selectedCharacter.onSleep.bind(selectedCharacter));
	document.getElementById("btn-playing")
		.addEventListener("click", selectedCharacter.onPlay.bind(selectedCharacter));
	document.getElementById("btn-hunting")
		.addEventListener("click", selectedCharacter.onHunt.bind(selectedCharacter));

	// game console listeners
	gameConsole = new GameConsole(selectedCharacter,
		document.getElementById("game-console-input"),
		document.getElementById("game-console-textarea"));
	document.getElementById("game-console-input")
		.addEventListener("keydown", gameConsole.onKeyDown.bind(gameConsole));

	selectedCharacter.initialize();

	mainLoop = setInterval(() => mainLoopPaused ? null : selectedCharacter.frame(), 10000);
}

/**
 * Callback when the game is over.
 */
const gameOver = () =>
{
	clearInterval(mainLoop);
	toggleViewport("gameover");

	// delete profile
	const index = characters.indexOf(selectedCharacter);
	characters[index] = new Character(index);
	saveProfiles();
}


/**
 * Start the game audio & switch to game profiles.
 */
const startGame = () =>
{
	toggleViewport("profile");
	audio_bgm.play();
}

/**
 * Entry point of the game.
 */
const loadGame = () =>
{
	loadProfiles();
	initProfiles();
	toggleViewport("start");
}
loadGame();
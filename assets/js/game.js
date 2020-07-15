let mainLoop = null;
let selectedCharacter = null; // Character selected to play/edit profile
const characters = [];
const audio_bgm = document.getElementById("bgm");

/**
 * Load profiles from localstorage.
 */
const loadProfiles = () =>
{
	// load profiles from local storage & fill DOM elements
	let profiles = JSON.parse(localStorage.getItem("profiles"));
	if (profiles)
	{
		for (let p of profiles)
		{
			characters.push(new Character(p.id, p.name, p.color, p.sleep, p.playing, p.hunting, p.isNew));

			// profile click event
			document.querySelector(`#profile-${p.id}`).addEventListener("click", selectProfile);

			// fill DOM elements
			const color = document.querySelector(`#profile-${p.id} img`);
			color.setAttribute("style", `filter: hue-rotate(${p.color}deg)`);
			const name = document.querySelector(`#profile-${p.id} h5`);
			name.innerText = p.name;
			const profile = document.querySelector(`#profile-${p.id} ul`);
			profile.children[0].style.width = `${p.sleep}%`;
			profile.children[1].style.width = `${p.playing}%`;
			profile.children[2].style.width = `${p.hunting}%`;
		}
	}
	else // Reset localstorage
	{
		for (let i = 0; i < 3; i++)
			characters.push(new Character(i));
		saveProfiles();
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
{
	const profileId = parseInt(e.target.parentNode.getAttribute("data-id"), 10);
	selectedCharacter = characters[profileId];

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
	document.getElementById("new-create").removeEventListener("click", gameLoop);
	selectedCharacter.initialize();

	mainLoop = setInterval(() => selectedCharacter.frame(), 1000);
}

/**
 * Callback when the game is over.
 */
const gameOver = () =>
{
	clearInterval(mainLoop);
}

/**
 * Slider callback to change the selected char/preview color & slider formatting.
 */
const slider = new Slider('#form-color', {
	formatter: (value) => {
		if (selectedCharacter)
			selectedCharacter.setColor(value);
		return value.toString();
	}
});

loadProfiles();
toggleViewport("profile");
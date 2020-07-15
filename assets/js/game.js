const viewports = [
	{
		name: "game",
		in: "animate__backInDown",
		out: "animate__backOutUp"
	},
	{
		name: "new",
		in: "animate__fadeIn",
		out: "animate__backOutUp"
	},
	{
		name: "profile",
		in: "animate__backInDown",
		out: "animate__backOutUp"
	}
];
for (let v of viewports) // hide all viewports by default
	document.getElementById(v.name).classList.add("d-none");

let mainLoop = null;
const characters = [];
const audio_bgm = document.getElementById("bgm");

// Character selected to play/edit profile
let selectedCharacter = null;

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

/**
 * Toggle a specific DOM viewport and in/out animations.
 * @param {string} viewportName - The viewport name.
 */
const toggleViewport = (viewportName) =>
{
	for (let v of viewports)
	{
		const elem = document.getElementById(v.name);
		if (v.name == viewportName)
		{
			elem.classList.remove("d-none");
			elem.classList.remove(v.out);
			elem.classList.add(v.in);
			const showHandler = () => {
				elem.removeEventListener("animationend", showHandler);
				elem.classList.remove(v.in);
				elem.classList.remove("d-none");
			};
			elem.addEventListener("animationend", showHandler);
			continue;
		} 

		elem.classList.remove(v.in);
		elem.classList.add(v.out);
		const hideHandler = () => {
			elem.removeEventListener("animationend", hideHandler);
			elem.classList.remove(v.out);
			elem.classList.add("d-none");
		};
		elem.addEventListener("animationend", hideHandler);
	}
}

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

loadProfiles();
toggleViewport("profile");
const viewports = ["game", "new", "profile"];
const characters = [];
const audio_bgm = document.getElementById("bgm");

/**
 * Toggle a specific DOM viewport.
 * @param {string} viewportName - The viewport name.
 */
const toggleViewport = (viewportName) =>
{
	for (let v of viewports)
		document.getElementById(v).style.display = "none";
	document.getElementById(viewportName).style.display = "block";
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
			const char = new Character(p.id, p.name, p.color, p.sleep, p.playing, p.hunting, p.isNew);
			characters.push(char);

			// profile click event
			document.querySelector(`#profile-${char.id}`).addEventListener("click", selectProfile);

			// fill DOM elements
			const color = document.querySelector(`#profile-${char.id} img`);
			color.setAttribute("style", `filter: hue-rotate(${p.color}deg)`);
			const name = document.querySelector(`#profile-${char.id} h5`);
			name.innerText = p.name;
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
	console.log(e.target.parentNode);
	const profileId = parseInt(e.target.parentNode.getAttribute("data-id"), 10);
	const profile = characters[profileId];

	// remove all profile click event
	for (let i = 0; i < 3; i++)
		document.querySelector(`#profile-${i}`).removeEventListener("click", selectProfile);

	if (profile.isNew)
		toggleViewport("new");
	else
	{
		toggleViewport("game");
		gameLoop();
	}
}

/**
 * The main game loop.
 */
const gameLoop = () =>
{
	console.log("started game");
}

loadProfiles();
toggleViewport("profile");
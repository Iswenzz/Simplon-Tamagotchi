/**
 * Represent a playable character.
 */
class Character
{
	frameCount = 0;
	previewElem = document.querySelector("#char-preview[data-target*=\"game\"]");

	_colorVal = 0;
	_sleepVal = 0;
	_playingVal = 0;
	_huntingVal = 0;

	/**
	 * Initialize a new Character instance.
	 * @param {number} id - Profile index.
	 * @param {string} name - Profile name.
	 * @param {number} color - Character color.
	 * @param {number} sleep - Character sleep stat.
	 * @param {number} playing - Character playing stat.
	 * @param {number} hunting - Character hunting stat.
	 * @param {boolean} isNew - Is it a new profile?
	 */
	constructor(id, name, color, sleep, playing, hunting, isNew)
	{
		this.id = id;
		this.name = name ?? "Spyro";
		this._colorVal = color ?? 0;
		this._sleepVal = sleep ?? 100;
		this._playingVal = playing ?? 100;
		this._huntingVal = hunting ?? 100;
		this.isNew = isNew ?? true;

		this.bars = [this.sleep, this.playing, this.hunting];
	}

	/**
	 * Initialize character stats & color.
	 */
	initialize()
	{
		this.color = this._colorVal;
		this.sleep = this._sleepVal;
		this.playing = this._playingVal;
		this.hunting = this._huntingVal;
	}

	/**
	 * Set the character hue color.
	 * @param {number} degree - Hue color degree.
	 */
	set color(degree)
	{
		this._colorVal = degree;
		
		document.querySelector("#char-preview[data-target*='game']")
			.setAttribute("style", `filter: hue-rotate(${degree}deg)`);
		document.querySelector("#char-preview[data-target*='preview']")
			.setAttribute("style", `filter: hue-rotate(${degree}deg)`);
	}

	/**
	 * Get the color degree.
	 */
	get color()
	{
		return this._colorVal;
	}

	/**
	 * Set the character sleep stat.
	 * @param {number} val - Sleep stat value.
	 */
	set sleep(val)
	{
		if (val < 0) val = 0;
		this._sleepVal = val;

		let elem = document.querySelector(".bar-sleep[data-target*='game']");
		elem.setAttribute("style", `width: ${val}%`);
		elem.innerHTML = `${val}%`;
	}

	/**
	 * Get the character sleep stat
	 */
	get sleep()
	{
		return this._sleepVal;
	}

	/**
	 * Set the character playing stat.
	 * @param {number} val - Playing stat value.
	 */
	set playing(val)
	{
		if (val < 0) val = 0;
		this._playingVal = val;
		
		let elem = document.querySelector(".bar-playing[data-target*='game']");
		elem.setAttribute("style", `width: ${val}%`);
		elem.innerHTML = `${val}%`;
	}

	/**
	 * Get the character playing stat.
	 */
	get playing()
	{
		return this._playingVal;
	}

	/**
	 * Set the character hunting stat.
	 * @param {number} val - Hunting stat value.
	 */
	set hunting(val)
	{
		if (val < 0) val = 0;
		this._huntingVal = val;
		
		let elem = document.querySelector(".bar-hunting[data-target*='game']");
		elem.setAttribute("style", `width: ${val}%`);
		elem.innerHTML = `${val}%`;
	}

	/**
	 * Get the character hunting stat.
	 */
	get hunting()
	{
		return this._huntingVal;
	}

	/**
	 * Sleep button callback.
	 */
	onSleep()
	{
		if (!this.previewElem.src.includes("assets/images/spyro-sleep.gif"))
			this.previewElem.src = "assets/images/spyro-sleep.gif";

		this.sleep = (this.sleep + 10) >= 100 ? 100 : this.sleep + 10;
	}

	/**
	 * Playing button callback.
	 */
	onPlay()
	{
		if (!this.previewElem.src.includes("assets/images/spyro-play.gif"))
			this.previewElem.src = "assets/images/spyro-play.gif";

		this.playing = (this.playing + 10) >= 100 ? 100 : this.playing + 10;
	}

	/**
	 * Hunting button callback.
	 */
	onHunt()
	{
		if (!this.previewElem.src.includes("assets/images/spyro-hunt.gif"))
			this.previewElem.src = "assets/images/spyro-hunt.gif";

		this.hunting = (this.hunting + 10) >= 100 ? 100 : this.hunting + 10;
	}

	/**
	 * Kill the character.
	 */
	kill()
	{
		this.sleep = 0;
		this.playing = 0;
		this.hunting = 0;
	}

	/**
	 * Render frame callback.
	 */
	frame()
	{
		// pick a random bar that isn't empty
		const validBars = this.bars.map((item, i) => item > 0 ? i : null).filter(u => u !== null);
		const rndBarPick = Math.floor(Math.random() * validBars.length); 
		const rndDecrease = Math.floor(Math.random() * 6) + 1;

		switch (validBars[rndBarPick])
		{
			case 0: 	this.sleep -= rndDecrease; 		break;
			case 1: 	this.playing -= rndDecrease; 	break;
			case 2: 	this.hunting -= rndDecrease;	break;
		}
		if (this.sleep <= 0 && this.playing <= 0 && this.hunting <= 0)
			gameOver();

		saveProfiles();
		this.frameCount++;
	}
}

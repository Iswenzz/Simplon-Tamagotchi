/**
 * Represent a playable character.
 */
class Character
{
	frameCount = 0;

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
		this.sleep = sleep ?? 100;
		this.playing = playing ?? 100;
		this.hunting = hunting ?? 100;
		this.color = color ?? 0;
		this.isNew = isNew ?? true;	
	}

	/**
	 * Initialize character stats & color.
	 */
	initialize()
	{
		this.setColor(this.color);
		this.setSleep(this.sleep);
		this.setPlaying(this.playing);
		this.setHunting(this.hunting);
	}

	/**
	 * Set the character hue color.
	 * @param {number} color - Hue color degree.
	 */
	setColor(color)
	{
		this.color = color;
		
		document.querySelector("#char-preview[data-target*='game']")
			.setAttribute("style", `filter: hue-rotate(${color}deg)`);
		document.querySelector("#char-preview[data-target*='preview']")
			.setAttribute("style", `filter: hue-rotate(${color}deg)`);
	}

	/**
	 * Set the character sleep stat.
	 * @param {number} val - Sleep stat value.
	 */
	setSleep(val)
	{
		if (val < 0) val = 0;
		this.sleep = val;

		let elem = document.querySelector(".bar-sleep[data-target*='game']");
		elem.setAttribute("style", `width: ${val}%`);
		elem.innerHTML = `${val}%`;
	}

	/**
	 * Set the character playing stat.
	 * @param {number} val - Playing stat value.
	 */
	setPlaying(val)
	{
		if (val < 0) val = 0;
		this.playing = val;
		
		let elem = document.querySelector(".bar-playing[data-target*='game']");
		elem.setAttribute("style", `width: ${val}%`);
		elem.innerHTML = `${val}%`;
	}

	/**
	 * Set the character hunting stat.
	 * @param {number} val - Hunting stat value.
	 */
	setHunting(val)
	{
		if (val < 0) val = 0;
		this.hunting = val;
		
		let elem = document.querySelector(".bar-hunting[data-target*='game']");
		elem.setAttribute("style", `width: ${val}%`);
		elem.innerHTML = `${val}%`;
	}

	sleep()
	{
		
	}

	play()
	{

	}

	hunt()
	{
		
	}

	/**
	 * Render frame callback.
	 */
	frame()
	{
		const rnd = Math.floor(Math.random() * 6) + 1;
		switch (Math.floor(Math.random() * 3))
		{
			case 0: 
				this.setSleep(this.sleep - rnd);
				break;
			case 1: 
				this.setPlaying(this.playing - rnd);
				break;
			case 2: 
				this.setHunting(this.hunting - rnd);
				break;
		}

		if (this.frameCount % 4)
			saveProfiles();
		if (this.sleep <= 0 && this.playing <= 0 && this.hunting <= 0)
			gameOver();
		this.frameCount++;
	}
}

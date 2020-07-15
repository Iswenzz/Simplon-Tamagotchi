class Character
{
	frameCount = 0;

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

	initialize()
	{
		this.setColor(this.color);
		this.setSleep(this.sleep);
		this.setPlaying(this.playing);
		this.setHunting(this.hunting);
	}

	setColor(color)
	{
		this.color = color;
		
		document.querySelector("#char-preview[data-target*='game']")
			.setAttribute("style", `filter: hue-rotate(${color}deg)`);
		document.querySelector("#char-preview[data-target*='preview']")
			.setAttribute("style", `filter: hue-rotate(${color}deg)`);
	}

	setSleep(val)
	{
		if (val < 0) val = 0;
		this.sleep = val;

		document.querySelector(".bar-sleep[data-target*='game']")
			.setAttribute("style", `width: ${val}%`);
	}

	setPlaying(val)
	{
		if (val < 0) val = 0;
		this.playing = val;
		
		document.querySelector(".bar-playing[data-target*='game']")
			.setAttribute("style", `width: ${val}%`);
	}

	setHunting(val)
	{
		if (val < 0) val = 0;
		this.hunting = val;
		
		document.querySelector(".bar-hunting[data-target*='game']")
			.setAttribute("style", `width: ${val}%`);
	}

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

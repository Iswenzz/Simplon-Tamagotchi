class Character
{
	constructor(id, name, color, sleep, playing, hunting, isNew)
	{
		this.id = id;
		this.name = name ?? "Spyro";
		this.sleep = sleep ?? 100;
		this.playing = playing ?? 100;
		this.hunting = hunting ?? 100;
		this.isNew = isNew ?? true;
		this.setColor(color ?? 0);
		this.updateVisuals();
	}

	updateVisuals()
	{
		
	}

	setColor(color)
	{
		this.color = color;
		for (let p of document.querySelectorAll("#char-preview"))
			p.setAttribute("style", `filter: hue-rotate(${color}deg)`);
	}

	setSleep(val)
	{
		if (val < 0) val = 0;
		this.sleep = val;
		for (let p of document.querySelectorAll(".bar-sleep"))
			p.setAttribute("style", `width: ${val}%`);
	}

	setHunting(val)
	{
		if (val < 0) val = 0;
		this.hunting = val;
		for (let p of document.querySelectorAll(".bar-hunting"))
			p.setAttribute("style", `width: ${val}%`);
	}

	setPlaying(val)
	{
		if (val < 0) val = 0;
		this.playing = val;
		for (let p of document.querySelectorAll(".bar-playing"))
			p.setAttribute("style", `width: ${val}%`);
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
				this.setHunting(this.hunting - rnd);
				break;
			case 2: 
				this.setPlaying(this.playing - rnd);
				break;
		}
		saveProfiles();
		if (this.sleep <= 0 && this.playing <= 0 && this.hunting <= 0)
			gameOver();
	}
}

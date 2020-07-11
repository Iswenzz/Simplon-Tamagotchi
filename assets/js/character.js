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
	}

	setColor(color)
	{
		this.color = color;
		for (let p of document.querySelectorAll("#char-preview"))
			p.setAttribute("style", `filter: hue-rotate(${color}deg)`);
	}

	frame()
	{
		
	}
}

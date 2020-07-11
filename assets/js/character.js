class Character
{
	constructor(id, name, color, sleep, playing, hunting, isNew)
	{
		this.id = id;
		this.name = name ?? "Spyro";
		this.color = color ?? 0;
		this.sleep = sleep ?? 100;
		this.playing = playing ?? 100;
		this.hunting = hunting ?? 100;
		this.isNew = isNew ?? true;
	}

	frame()
	{
		
	}
}

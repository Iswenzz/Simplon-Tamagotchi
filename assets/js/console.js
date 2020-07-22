/**
 * Game console IO.
 */
class GameConsole
{
	stack = [];
	prevStack = [];
	nextStack = [];

	buffer = [];
	cmd = {
		sleep: {
			msg: "Your character is now sleeping.",
			callback: () => this.character.onSleep()
		},
		play: {
			msg: "Your character is now playing.",
			callback: () => this.character.onPlay()
		},
		hunt: {
			msg: "Your character is now hunting.",
			callback: () => this.character.onHunt()
		},
		rainbow: {
			msg: "Rainbow Spyro !!!",
			callback: () => this.character.previewElem.classList.add("rainbow-effect")
		},
		kill: {
			msg: "You killed your character ! >:(",
			callback: () => this.character.kill()
		},
		clear: {
			msg: null,
			callback: () => this.clear()
		},
		help: {
			msg: "Available commands: help, sleep, play, hunt, clear.",
			callback: null
		}
	};

	/**
	 * Initialize a new GameConsole object with the specified input / output element.
	 * @param {HTMLInputElement} input - The console input element.
	 * @param {HTMLTextAreaElement} output - The console output element.
	 */
	constructor(character, input, output) 
	{
		this.character = character;
		this.input = input;
		this.output = output;

		this.input.value = "";
		this.output.value = "";

		this.input.addEventListener("keydown", this.onKeyDown.bind(this));
	}
	
	/**
	 * Collapse the console element.
	 */
	open()
	{
		$("#collapseConsole").collapse("toggle");
		this.input.focus();
		setTimeout(() => this.input.value = "", 100);
	}

	/**
	 * On key down event callback.
	 * @param {KeyboardEvent} e - The keyboard event arg.
	 */
	onKeyDown(e)
	{
		switch (e.keyCode)
		{
			case 13: // ENTER
			{
				const val = e.target.value.toLowerCase();
				this.buffer.push(val);
				// check if the command exists
				if (Object.keys(this.cmd).some(i => val === i))
				{
					this.stack.push(val);
					this.prevStack = this.stack;
					this.nextStack = [];
					if (this.cmd[val].msg)
						this.write(this.cmd[val].msg);
					if (this.cmd[val].callback)
						this.cmd[val].callback();
					e.target.value = "";
				}
				else // unknown command
				{
					e.target.value = "";
					this.write(`Unknown command '${val}'. Type 'help' to get a list of available commands !`);
				}
				this.output.scrollTop = this.output.scrollHeight;
			}
			break;

			case 38: // UP ARROW
			{
				// get the previous command
				if (this.prevStack.length > 0)
				{
					const val = this.prevStack.pop();
					this.input.value = val;
					this.nextStack.push(val);
				}
			}
			break;

			case 40: // DOWN ARROW
			{
				// get the next command from the stack
				if (this.nextStack.length > 0)
				{
					const val = this.nextStack.pop();
					this.input.value = val;
					this.prevStack.push(val);
				}
			}
			break;
		}
	}

	/**
	 * Write a message to the output element.
	 * @param {string} msg - The message to output.
	 */
	write(msg)
	{
		this.output.value += msg + "\n";
	}

	/**
	 * Clear the console output.
	 */
	clear()
	{
		this.output.value = "";
	}
}

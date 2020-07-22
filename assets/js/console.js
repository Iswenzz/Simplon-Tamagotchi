/**
 * Game console IO.
 */
class GameConsole
{
	stack = [];
	buffer = [];
	cmd = {
		sleep: {
			msg: null,
			callback: () => this.character.onSleep()
		},
		play: {
			msg: null,
			callback: () => this.character.onPlay()
		},
		hunt: {
			msg: null,
			callback: () => this.character.onHunt()
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
				const val = e.target.value;
				this.buffer.push(val);
				// check if the command exists
				if (Object.keys(this.cmd).some(i => val === i))
				{
					this.stack.push(val);
					if (this.cmd[val].msg)
						this.write(this.cmd[val].msg);
					if (this.cmd[val].callback)
						this.cmd[val].callback();
					e.target.value = "";
				}
				else // unknown command
				{
					e.target.value = "";
					this.write("Unknown command, type 'help' to get a list of available commands !");
				}
				this.output.scrollTop = this.output.scrollHeight;
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

/**
 * 
 */
class GameConsole
{
	stack = [];
	cmd = {
		sleep: {
			msg: "Sleep",
			callback: null
		},
		play: {
			msg: "Play",
			callback: null
		},
		hunt: {
			msg: "Hunt",
			callback: null
		},
	};

	/**
	 * 
	 * @param {HTMLInputElement} input 
	 * @param {HTMLTextAreaElement} output 
	 */
	constructor(input, output) 
	{
		this.input = input;
		this.output = output;
	}

	/**
	 * On key down event callback.
	 * @param {KeyboardEvent} e - The keyboard event arg.
	 */
	onKeyDown(e)
	{
		// check if the command exists on ENTER keydown
		if (e.keyCode === 13 && Object.keys(this.cmd).some(i => e.target.value === i))
		{
			this.stack.push(e.target.value);
			this.write(this.cmd[e.target.value].msg);
			this.cmd[e.target.value].callback();
			e.target.value = "";
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
}

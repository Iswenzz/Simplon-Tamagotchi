/**
 * Represent a specific game window.
 */
class Viewport
{
	/**
	 * Initialize a new viewport with the specified name & css animations.
	 * @param {string} name - Viewport ID name.
	 * @param {string} animIn - CSS enter animation.
	 * @param {string} animOut - CSS exit animation.
	 */
	constructor(name, animIn, animOut)
	{
		this.name = name;
		this.animIn = animIn;
		this.animOut = animOut;

		// hide viewport by default
		this.element = document.getElementById(this.name);
		this.element.classList.add("d-none");
	}

	/**
	 * Show the viewport element.
	 */
	show()
	{
		this.element.classList.remove("d-none");
		this.element.classList.remove(this.animOut);
		this.element.classList.add(this.animIn);
		const showHandler = () => {
			this.element.removeEventListener("animationend", showHandler);
			this.element.classList.remove(this.animIn);
			this.element.classList.remove("d-none");
		};
		this.element.addEventListener("animationend", showHandler);
	}

	/**
	 * Hide the viewport element.
	 */
	hide()
	{
		this.element.classList.remove(this.animIn);
		this.element.classList.add(this.animOut);
		const hideHandler = () => {
			this.element.removeEventListener("animationend", hideHandler);
			this.element.classList.remove(this.animOut);
			this.element.classList.add("d-none");
		};
		this.element.addEventListener("animationend", hideHandler);
	}
}

/**
 * Game viewports.
 */
const viewports = [
	new Viewport("start", "animate__fadeInDown", "animate__fadeOutUp"),
	new Viewport("game", "animate__backInDown", "animate__backOutUp"),
	new Viewport("new", "animate__fadeIn", "animate__backOutUp"),
	new Viewport("profile", "animate__backInDown", "animate__backOutUp"),
	new Viewport("gameover", "animate__backInDown", "animate__backOutUp"),
];

/**
 * Toggle a specific DOM viewport and in/out animations.
 * @param {string} viewportName - The viewport name.
 */
const toggleViewport = (viewportName) =>
{
	for (let v of viewports)
		v.name == viewportName ? v.show() : v.hide();
}

/**
 * Game global hotkeys.
 */
const hotkeys = {
	start: {
		13: { callback: startGame }
	},
	profile: {
		49: { callback: () => selectProfileById(0) },
		50: { callback: () => selectProfileById(1) },
		51: { callback: () => selectProfileById(2) }
	},
	new: {
		13: { callback: gameLoop }
	},
	game: {
		49: { callback: () => selectedCharacter.onSleep() },
		50: { callback: () => selectedCharacter.onPlay() },
		51: { callback: () => selectedCharacter.onHunt() },
		27: { callback: () => null },
		9: { callback: () => $("#helpModal").modal("toggle") },
		222: { callback: () => gameConsole.open() }
	},
	gameover: {
		13: { callback: loadGame },
	}
};

/**
 * Global hotkeys callback.
 */
document.addEventListener("keydown", (e) =>
{
	// check if all animation are done before firing events
	if (selectedViewport && selectedViewport.isAnimInDone && selectedViewport.isAnimOutDone)
	{
		// find the right event to fire
		if (hotkeys[selectedViewport.name] && hotkeys[selectedViewport.name][e.keyCode])
			hotkeys[selectedViewport.name][e.keyCode].callback();
	}
});

/**
 * Modals callbacks to pause the game.
 */
$(document).on("shown.bs.modal", "#helpModal", () => mainLoopPaused = true);
$(document).on("hidden.bs.modal", "#helpModal", () => mainLoopPaused = false);

/**
 * Callback when clicking the gameover image.
 */
document.getElementById("gameover-img").addEventListener("click", loadGame);

/**
 * Start game button callback.
 */
document.getElementById("start-btn").addEventListener("click", startGame);
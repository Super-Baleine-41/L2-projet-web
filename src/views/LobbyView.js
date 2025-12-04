import BaseView from "@ui/BaseView.js";
import { displayDialog } from "@ui/dialog.js";
import { render } from "@ui/reactive.js"
import { div, p } from "@ui/dom.js";
import WebRTCManager from "@utils/WebRTCManager.js";

export default class LobbyView extends BaseView {
	constructor(app, appState, api, offer = null) {
		super(app);
		this.api = api
		this.appState = appState;
		this.rtc = null;
		this.offer = offer;
	}

	async #offerProvided() {
		this.rtc = new WebRTCManager(false);
		await this.rtc.init();
		const answer = await this.rtc.acceptOffer(this.offer);
		// Show a dialog with the answer ready to copy-paste OR as a QR code. Use the ShowAnswerDialog component for this.
		await displayDialog({

		})
	}

	async render() {
		render(this.app, div({ className: 'p-4' }, 'Lobby View'), p({}, `Loaded with offer: ${this.offer}`));

		if (this.offer) await this.#offerProvided();
	}

	destroy() {
		this.app.innerHTML = '';
		this.rtc.close();
	}
}
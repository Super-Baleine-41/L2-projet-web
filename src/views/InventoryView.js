import BaseView from "@ui/BaseView";

export default class LobbyView extends BaseView {
    constructor(app, appState, api) {
		super(app);
		this.api = api
		this.appState = appState;
    }

     destroy() {
		this.app.innerHTML = '';
	}
}
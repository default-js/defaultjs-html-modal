/* imports */
import { Component } from "@default-js/defaultjs-html-components";
import { define } from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper";
import { Renderer, Template } from "@default-js/defaultjs-template-language";
import { privateProperty } from "@default-js/defaultjs-common-utils/src/PrivateProperty";

import Backpanel from "./BackPanel";
import Content from "./Content";
import { NODENAME_MODAL, NODENAME_BACKPANEL, NODENAME_BODY, NODENAME_CONTENT, NODENAME_HEADER, NODENAME_FOOTER } from "./Constants";
import { EVENT_SHOW, EVENT_SHOWING, EVENT_HIDE, EVENT_HIDING } from "./Events";
import SETTING from "./Setting";
import { highestZindex } from "./Utils";

const ATTRIBUTE_OPEN = "open";
const ATTRIBUTE_CLOSABLE = "closable";
const ATTRIBUTES = [];


const render = async (modal) => {
	const root = modal.root;
	if (!(root.firstElementChild instanceof Content)) {
		const content = new Content();
		content.append(modal.childNodes);

		root.append(content);
	}

	const zindex = highestZindex({ f: (element) => element != modal }) + SETTING.zindexStep;
	modal.style.position = "fixed";
	modal.style.zIndex = Math.max(zindex, SETTING.minZindex);
};

/* logic */
class Modal extends Component {
	static get NODENAME() {
		return NODENAME_MODAL;
	}
	static get observedAttributes() {
		return ATTRIBUTES;
	}
	static get EVENTS() {
		return [EVENT_SHOW, EVENT_SHOWING, EVENT_HIDE, EVENT_HIDING];
	}

	constructor() {
		super();
	}

	async init() {
		await super.init();
		const { root, ready } = this;
		if (!ready.resolved) {
			this.on(EVENT_SHOW, ({ target }) => {
				if (target != this) this.show();
			});

			this.on(EVENT_HIDE, (event) => {
				event.preventDefault();
				event.stopPropagation();
				this.hide();
			});

			if (this.hasAttribute(ATTRIBUTE_CLOSABLE))
				this.on("click", (event) => {
					if (event.target == this) {
						event.preventDefault();
						event.stopPropagation();
						this.hide();
					}
				});
		}
	}

	async show() {
		await this.ready;
		await render(this);
		this.attr(ATTRIBUTE_OPEN, "");
	}

	async hide() {
		await this.ready;
		this.attr(ATTRIBUTE_OPEN, null);

		this.style.zindex = null;
	}
}

define(Modal);
export default Modal;

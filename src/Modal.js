/* imports */
import { Component } from "@default-js/defaultjs-html-components";
import { define } from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper";
import { Renderer, Template } from "@default-js/defaultjs-template-language";
import { privateProperty } from "@default-js/defaultjs-common-utils/src/PrivateProperty";

import Content from "./Content";
import { NODENAME_MODAL } from "./Constants";
import { EVENT_SHOW, EVENT_SHOWING, EVENT_HIDE, EVENT_HIDING } from "./Events";
import SETTING from "./Setting";
import { highestZindex } from "./Utils";

const ATTRIBUTE_OPEN = "open";
const ATTRIBUTE_HASMODAL = "has-modal";
const ATTRIBUTE_HIDE_TRIGGER = "modal-hide";
const ATTRIBUTE_CLOSABLE = "closable";
const ATTRIBUTE_TEMPLATE = "template";
const ATTRIBUTES = [];

const PRIVATE_TEMPLATE = "template";

const hideTriggers = new WeakSet();

const modalHideHandle = (event) => {
	event.preventDefault();
	event.stopPropagation();
	event.target.trigger(EVENT_HIDE);
};

const getOrCreateContent = (modal) => {
	const root = modal.root;
	if (!(root.firstElementChild instanceof Content)) {
		const content = new Content();
		content.append(modal.childNodes);

		root.append(content);
		return content;
	}

	return root.children[0];
};

const render = async (modal) => {
	getOrCreateContent(modal);
	setupHideHandles(modal);
	setStyle(modal);
};

const setStyle = (modal) => {
	const zindex =
		highestZindex({
			f: (element) => {
				if (element == modal) return false;
				if (element.style.display == "none") return false;
				if (element.style.visibility == "hidden") return false;

				return true;
			},
		}) + SETTING.zindexStep;
	modal.style.position = "fixed";
	modal.style.zIndex = Math.max(zindex, SETTING.minZindex);
};

const clearStyle = ({style}) => {
	style.position = null;
	style.zIndex = null;
};

const setupHideHandles = (modal) => {
	const root = modal.root;
	const elements = root.find(`[${ATTRIBUTE_HIDE_TRIGGER}]`);
	for (let element of elements) {
		if (!hideTriggers.has(element)) {
			element.on("click", modalHideHandle);
			hideTriggers.add(element);
		}
	}
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
				if (target == this) this.show();
			});

			this.on(EVENT_HIDE, (event) => {
				event.preventDefault();
				event.stopPropagation();
				this.hide();
			});

			root.on([EVENT_SHOWING, EVENT_HIDING], ({type, target}) => {
				if(target != this){
					if(type == EVENT_SHOWING)
						this.attr(ATTRIBUTE_HASMODAL, "");
					else
						this.attr(ATTRIBUTE_HASMODAL, null);
				}
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

	async show({ data = {}, template = null } = {}) {
		await this.ready;

		if (!template && this.hasAttribute(ATTRIBUTE_TEMPLATE)) {
			template = privateProperty(this, PRIVATE_TEMPLATE);
			if (!template) {
				template = await Template.load(new URL(this.attr(ATTRIBUTE_TEMPLATE), location));
				privateProperty(this, PRIVATE_TEMPLATE, template);
			}
		}

		if (template) await Renderer.render({ data, template: await Template.load(template), container: getOrCreateContent(this) });

		await render(this);
		this.attr(ATTRIBUTE_OPEN, "");
		this.trigger(EVENT_SHOWING);
	}

	async hide() {
		await this.ready;
		this.attr(ATTRIBUTE_OPEN, null);
		clearStyle(this);
		this.trigger(EVENT_HIDING);
	}
}

define(Modal);
export default Modal;

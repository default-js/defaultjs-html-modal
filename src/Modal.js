/* imports */
import Component from "@default-js/defaultjs-html-components";
import {define} from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper";
import {Renderer, Template} from "@default-js/defaultjs-template-language";

import {NODENAME_MODAL, NODENAME_BACKPANEL, NODENAME_BODY, NODENAME_CONTENT, NODENAME_HEADER, NODENAME_FOOTER } from "./Constants";
import {EVENT_SHOW, EVENT_SHOWING, EVENT_HIDE, EVENT_HIDING} from "./Events";

const ATTRIBUTE_CLOSABLE = "closable";
const ATTRIBUTES = [];

const TEMPLATE_BASEPATH = "/template/modal/";
const TEMPLATE = Template.load(new URL(TEMPLATE_BASEPATH + "default.tpl.html", location));

const render = async (modal) => {
	if (!modal.rendered) {
		const { root, modalContent } = modal;

		modalContent.append(root.find(":scope >" + NODENAME_HEADER));
		modalContent.append(root.find(":scope >" + NODENAME_BODY));
		modalContent.append(root.find(":scope >" + NODENAME_FOOTER));

		modal.rendered = true;
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
			await Renderer.render({
				container: root,
				data: this,
				template: await TEMPLATE,
				mode: "append"
			});
			this.container = this.parent();
			this.modalBackPanel = root.find(NODENAME_BACKPANEL).first();
			this.modalContent = root.find(NODENAME_CONTENT).first();

			if (this.hasAttribute(ATTRIBUTE_CLOSABLE))
				this.modalBackPanel.on("click", (event) => {
					if (event.target == this.modalBackPanel) {
						event.preventDefault();
						event.stopPropagation();
						this.hide();
					}
				});

			this.on(EVENT_SHOW, ({ target }) => {
				if (target != this) this.show();
			});

			root.on(EVENT_HIDE, (event) => {
				event.preventDefault();
				event.stopPropagation();
				this.hide();
			});
		}
	}

	get root() {
		return this.shadowRoot || this;
	}

	async show() {
		await this.ready;
		await render(this);
		document.body.append(this);
		this.modalBackPanel.show();
	}

	async hide() {
		await this.ready;
		this.modalBackPanel.hide();
		this.container.append(this);
	}
}

define(Modal);
return Modal;

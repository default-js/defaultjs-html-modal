/* imports */
import Component from "@default-js/defaultjs-html-components/src/Component";
import { define } from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper";

import { NODENAME_FOOTER } from "./Constants";

/* constants */

/* logic */
class Footer extends Component {
	static get NODENAME() {
		return NODENAME_FOOTER;
	}

	constructor() {
		super();
	}
};

define(Footer);
export default Footer;

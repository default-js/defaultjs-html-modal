/*imports*/
import Component from "@default-js/defaultjs-html-components/src/Component";
import { define } from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper";

import { NODENAME_CONTENT } from "./Constants";

/*constants */

/* logic */
class Content extends Component {
	static get NODENAME() {
		return NODENAME_CONTENT;
	}
	constructor() {
		super();
	}
};

define(Content);
export default Content;

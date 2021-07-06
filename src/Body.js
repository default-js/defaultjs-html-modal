/* imports */
import Component from "@default-js/defaultjs-html-components/src/Component";
import { define } from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper";

import { NODENAME_BODY } from "./Constants";

/* constants */

/* logic */
class Body extends Component {
	static get NODENAME() {
		return NODENAME_BODY;
	}

	constructor() {
		super();
	}
};

define(Body);
export default Body;

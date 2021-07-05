/* imports */
import Component from "@default-js/defaultjs-html-components";
import {define} from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper"

import { NODENAME_BACKPANEL } from "./Constants";

/*constants */

/* logic */
class Content extends Component {
	static get NODENAME() {
		return NODENAME_BACKPANEL;
	}
	constructor() {
		super();
	}
};

define(Content);
return Content;

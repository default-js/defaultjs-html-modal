/* imports */
import Component from "@default-js/defaultjs-html-components/src/Component";
import {define} from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper"

import { NODENAME_BACKPANEL } from "./Constants";

/*constants */

/* logic */
class BackPanel extends Component {
	static get NODENAME() {
		return NODENAME_BACKPANEL;
	}
	constructor() {
		super();
	}
};

define(BackPanel);
export default BackPanel;

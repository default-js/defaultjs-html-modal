/* imports */
import Component from "@default-js/defaultjs-html-components";
import { define } from "@default-js/defaultjs-html-components/src/utils/DefineComponentHelper";

import { NODENAME_HEADER } from "./Constants";

/*constants */

/* logic */
class Header extends Component {
	static get NODENAME() {
		return NODENAME_HEADER;
	}

	constructor() {
		super();
	}
};

define(Header);
export default Header;

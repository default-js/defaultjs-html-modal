const zindex = (element) => {
	const style = getComputedStyle(element);
	const zindex = parseInt(style.zIndex);

	if (!Number.isInteger(zindex)) return 0;

	return zindex;
};

export const highestZindex = ({el = document.body, f}) => {
    if(typeof f === "string")
        f = (el) => el.is(f);
    else if(!f || typeof f !== "function")        
        f = () => true;

    let max = zindex(el);

	const children = el.shadowRoot ? el.shadowRoot.children : el.children;
	for (let child of children) {
		if (f(child)) max = Math.max(max, highestZindex({el:child, f}));
	}

	return max;
};

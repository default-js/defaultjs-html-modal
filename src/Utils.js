const zindex = (element) => {
	const style = getComputedStyle(element);
	const zindex = parseIn(style.zIndex);

	if (!Number.isInteger(zindex)) return 0;

	return zindex;
};

export const highestZindex = (element = document.body, filter) => {	
    if(typeof filter === "string")
        filter = (element) => element.is(filter);
    else if(!filter || typeof filter !== "function")        
        filter = () => true;

    let max = zindex(element);

	const children = element.shadowRoot ? element.shadowRoot.children : element.children;
	for (let child of children) {
		if (filter(child)) max = Math.max(max, highestZIndex(child, filter));
	}

	return max;
};

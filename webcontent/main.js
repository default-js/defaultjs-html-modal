
const openmodal = (element) => {
    const modalId = element.attr("modal-id");

    const modal = find(`#${modalId}`).first();
    if(modalId == "modal-2")
        modal.show({data: {text: "rendered content"}, template: new URL("/template/test.tpl.html", location)});
    else
        modal.show();
};
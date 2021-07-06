
const openmodal = (element) => {
    const modalId = element.attr("modal-id");

    const modal = find(`#${modalId}`).first();
    modal.show();
};
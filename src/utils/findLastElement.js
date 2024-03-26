export function findLastElement(element) {
    if (!element.children.length) {
        return element;
    }
    const lastChild = element.children[element.children.length - 1];
    if (lastChild.nodeType === Node.ELEMENT_NODE) {
        return findLastElement(lastChild);
    }
    return element;
}

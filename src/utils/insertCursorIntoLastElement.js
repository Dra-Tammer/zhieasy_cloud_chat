import {findLastElement} from "@/utils/findLastElement";

export function insertCursorIntoLastElement(popRef) {
    const parent = popRef;
    if (!parent) return;
    let lastChild = parent.lastElementChild || parent;
    if (lastChild.tagName === 'PRE') {
        lastChild = lastChild.getElementsByClassName('hljs')[0] || lastChild;
    }
    if (lastChild.tagName === 'OL') {
        lastChild = findLastElement(lastChild);
    }
    console.log(findLastElement(parent))
    lastChild.insertAdjacentHTML('beforeend', '<span class="input-cursor"></span>');
}


export function createTypewriter(onConsume) {
    let queue = [];
    let consuming = false;
    let timer = null;

    function dynamicSpeed() {
        const speed = 2000 / queue.length;
        return speed > 200 ? 200 : speed;
    }

    function add(str) {
        if (!str) return;
        queue.push(...str.split(''));
    }

    function consume() {
        if (queue.length > 0) {
            const str = queue.shift();
            str && onConsume(str);
        }
    }

    function next() {
        consume();
        timer = setTimeout(() => {
            consume();
            if (consuming) {
                next();
            }
        }, dynamicSpeed());
    }

    function start() {
        consuming = true;
        next();
    }

    function done() {
        consuming = false;
        clearTimeout(timer);
        onConsume(queue.join(''));
        queue = [];
    }

    return {
        add,
        start,
        done
    };
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observer = void 0;
var react_1 = require("react");
// Опишіть Props
function Observer(_a) {
    var children = _a.children, onContentEndVisible = _a.onContentEndVisible;
    // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
    var endContentRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
        var options = {
            rootMargin: "0px",
            threshold: 1.0,
            root: null,
        };
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    onContentEndVisible();
                    observer.disconnect();
                }
            });
        }, options);
        if (endContentRef.current) {
            observer.observe(endContentRef.current);
        }
        return function () {
            observer.disconnect();
        };
    }, [onContentEndVisible]);
    return (<div>
      {children}
      <div ref={endContentRef}/>
    </div>);
}
exports.Observer = Observer;

import React, { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  onContentEndVisible: () => void;
};

// Опишіть Props
export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}

// *********
export function TextInputWithFocus() {
  // Тут ми вказуємо, що ref буде посилатися на елемент типу HTMLInputElement
  const inputEl = useRef<HTMLInputElement>(null);

  const onButtonClick = () => {
    // Поле current тепер має властивості, що є у елемента HTMLInputElement
    inputEl.current?.focus();
  };

  return (
    <>
      {/* Тут inputEl стане посиланням на цей input елемент */}
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Встановити фокус на поле введення</button>
    </>
  );
}

import React, { useEffect, useState } from 'react';
import Fade from '@/components/elements/Fade';
import Portal from '@/components/elements/Portal';
import copy from 'copy-to-clipboard';
import classNames from 'classnames';

const CopyOnClick: React.FC<{ text: string | number | null | undefined }> = ({ text, children }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;

        const timeout = setTimeout(() => {
            setCopied(false);
        }, 2500);

        return () => {
            clearTimeout(timeout);
        };
    }, [copied]);

    if (!React.isValidElement(children)) {
        throw new Error('传递给 <CopyOnClick/> 的组件必须是有效的 React 元素。');
    }

    const child = !text
        ? React.Children.only(children)
        : React.cloneElement(React.Children.only(children), {
              className: classNames(children.props.className || '', 'cursor-pointer'),
              onClick: (e: React.MouseEvent<HTMLElement>) => {
                  copy(String(text));
                  setCopied(true);
                  if (typeof children.props.onClick === 'function') {
                      children.props.onClick(e);
                  }
              },
          });

    return (
        <>
            {copied && (
                <Portal>
                    <Fade in appear timeout={250} key={copied ? 'visible' : 'invisible'}>
                        <div className={'fixed z-50 bottom-0 right-0 m-4'}>
                            <div className={'rounded-md py-3 px-4 text-gray-200 bg-neutral-600/95 shadow'}>
                                <p>已复制 &quot;{text}&quot; 至剪切板.</p>
                            </div>
                        </div>
                    </Fade>
                </Portal>
            )}
            {child}
        </>
    );
};

export default CopyOnClick;

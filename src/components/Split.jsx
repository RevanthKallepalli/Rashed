import React from 'react';

// Splits text children into word + character spans so headings can animate letter by letter.
// Nested elements (<em>, <span className="br">) keep their styling.
function splitNode(node, key = 'k') {
  if (typeof node === 'string') {
    return node.split(/(\s+)/).map((part, i) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return ' ';
      return (
        <span className="w" key={`${key}-${i}`}>
          {[...part].map((c, j) => (
            <span className="c" key={j}>{c}</span>
          ))}
        </span>
      );
    });
  }
  if (Array.isArray(node)) return node.map((n, i) => splitNode(n, `${key}-${i}`));
  if (React.isValidElement(node)) {
    return React.cloneElement(node, { key }, splitNode(node.props.children, key));
  }
  return node;
}

export default function Split({ as: Tag = 'span', className = '', children, ...rest }) {
  return (
    <Tag className={`split ${className}`.trim()} {...rest}>
      {splitNode(children)}
    </Tag>
  );
}

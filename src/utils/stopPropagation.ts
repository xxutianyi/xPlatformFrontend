import React from 'react';

export default function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
  e.stopPropagation();
}

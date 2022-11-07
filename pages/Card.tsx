import React from 'react';

export type ICardProps = {
  title: string,
  paragraph: string
}

export const Card = ({ title, paragraph }: ICardProps) => <aside>
  <h2>{title}</h2>
  <p>
    {paragraph}
  </p>
</aside>
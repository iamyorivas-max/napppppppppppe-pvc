export enum TableShape {
  RECTANGLE = 'Rectangle',
  ROUND = 'Round',
  OVAL = 'Oval',
  SQUARE = 'Square'
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}
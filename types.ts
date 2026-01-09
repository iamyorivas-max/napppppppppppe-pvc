import React from 'react';

export enum TableShape {
  RECTANGLE = 'Rectangle',
  ROUND = 'Ronde',
  OVAL = 'Ovale',
  SQUARE = 'Carrée'
}

export enum TableThickness {
  T15 = '1.5mm',
  T20 = '2.0mm',
  T30 = '3.0mm'
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
interface PromoProps {
  url: string;
  title?: string;
  body?: string;
}

interface CategoryProps {
  title: string;
  url?: string;
  category: string;
}

export const sliderPromo: PromoProps[] = [
  {
    url: "slider01.png",
  },
  {
    url: "slider02.png",
  },
  {
    url: "slider03.gif",
  },
];

export const sliderCategory: CategoryProps[] = [
  {
    category: "Feminino",
    title: "Sapato de mulher",
    url: '/sapato01.png'
  },
  {
    category: "Feminino",
    title: "Sapato de mulher",
    url: '/sapato02.png'
  },
  {
    category: "Feminino",
    title: "Sapato de mulher",
  },
  {
    category: "Feminino",
    title: "Sapato de mulher",
  },
  {
    category: "Feminino",
    title: "Sapato de mulher",
  },
  {
    category: "Feminino",
    title: "Sapato de mulher",
  },
  {
    category: "Feminino",
    title: "Sapato de mulher",
  },
  {
    category: "Masculino",
    title: "Sapato de Homem",
  },
  {
    category: "Masculino",
    title: "Sapato de Homem",
  },
  {
    category: "Masculino",
    title: "Sapato de Homem",
  },
];

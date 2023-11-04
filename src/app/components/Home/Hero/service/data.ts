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

